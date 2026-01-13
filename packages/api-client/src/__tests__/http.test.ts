import { describe, it, expect, vi, beforeEach } from 'vitest';
import { http } from '../http/http';
import { NetworkError, TimeoutError } from '../http/transport-errors';

// Mock httpRaw
vi.mock('../http/http-raw', () => ({
  httpRaw: vi.fn(),
}));

import { httpRaw } from '../http/http-raw';

describe('http', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('successful requests', () => {
    it('should return response on success', async () => {
      const mockResponse = { status: 200, body: { data: 'test' } };
      vi.mocked(httpRaw).mockResolvedValueOnce(mockResponse);

      const result = await http('/api/test');

      expect(result).toEqual(mockResponse);
      expect(httpRaw).toHaveBeenCalledOnce();
      expect(httpRaw).toHaveBeenCalledWith('/api/test', {});
    });

    it('should pass init options to httpRaw', async () => {
      const mockResponse = { status: 201, body: {} };
      vi.mocked(httpRaw).mockResolvedValueOnce(mockResponse);

      const init = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{"test": true}',
      };

      await http('/api/test', init);

      expect(httpRaw).toHaveBeenCalledWith('/api/test', init);
    });
  });

  describe('retry logic', () => {
    it('should retry GET requests on NetworkError', async () => {
      const mockResponse = { status: 200, body: {} };
      vi.mocked(httpRaw)
        .mockRejectedValueOnce(new NetworkError('Network failed'))
        .mockResolvedValueOnce(mockResponse);

      const result = await http('/api/test', { method: 'GET' }, 1);

      expect(result).toEqual(mockResponse);
      expect(httpRaw).toHaveBeenCalledTimes(2);
    });

    it('should retry GET requests on TimeoutError', async () => {
      const mockResponse = { status: 200, body: {} };
      vi.mocked(httpRaw)
        .mockRejectedValueOnce(new TimeoutError('Timeout'))
        .mockResolvedValueOnce(mockResponse);

      const result = await http('/api/test', { method: 'GET' }, 1);

      expect(result).toEqual(mockResponse);
      expect(httpRaw).toHaveBeenCalledTimes(2);
    });

    it('should retry HEAD requests', async () => {
      const mockResponse = { status: 200, body: {} };
      vi.mocked(httpRaw)
        .mockRejectedValueOnce(new NetworkError('Network failed'))
        .mockResolvedValueOnce(mockResponse);

      const result = await http('/api/test', { method: 'HEAD' }, 1);

      expect(result).toEqual(mockResponse);
      expect(httpRaw).toHaveBeenCalledTimes(2);
    });

    it('should NOT retry POST requests', async () => {
      vi.mocked(httpRaw).mockRejectedValueOnce(
        new NetworkError('Network failed'),
      );

      await expect(http('/api/test', { method: 'POST' }, 1)).rejects.toThrow(
        NetworkError,
      );

      expect(httpRaw).toHaveBeenCalledOnce();
    });

    it('should NOT retry PUT requests', async () => {
      vi.mocked(httpRaw).mockRejectedValueOnce(
        new NetworkError('Network failed'),
      );

      await expect(http('/api/test', { method: 'PUT' }, 1)).rejects.toThrow(
        NetworkError,
      );

      expect(httpRaw).toHaveBeenCalledOnce();
    });

    it('should NOT retry DELETE requests', async () => {
      vi.mocked(httpRaw).mockRejectedValueOnce(
        new NetworkError('Network failed'),
      );

      await expect(http('/api/test', { method: 'DELETE' }, 1)).rejects.toThrow(
        NetworkError,
      );

      expect(httpRaw).toHaveBeenCalledOnce();
    });

    it('should NOT retry when retries = 0', async () => {
      vi.mocked(httpRaw).mockRejectedValueOnce(
        new NetworkError('Network failed'),
      );

      await expect(http('/api/test', { method: 'GET' }, 0)).rejects.toThrow(
        NetworkError,
      );

      expect(httpRaw).toHaveBeenCalledOnce();
    });

    it('should NOT retry on non-network errors', async () => {
      vi.mocked(httpRaw).mockRejectedValueOnce(new Error('Other error'));

      await expect(http('/api/test', { method: 'GET' }, 1)).rejects.toThrow(
        'Other error',
      );

      expect(httpRaw).toHaveBeenCalledOnce();
    });

    it('should exhaust all retries before throwing', async () => {
      vi.mocked(httpRaw)
        .mockRejectedValueOnce(new NetworkError('Failed'))
        .mockRejectedValueOnce(new NetworkError('Failed'))
        .mockRejectedValueOnce(new NetworkError('Failed'));

      await expect(http('/api/test', { method: 'GET' }, 2)).rejects.toThrow(
        NetworkError,
      );

      expect(httpRaw).toHaveBeenCalledTimes(3); // initial + 2 retries
    });
  });

  describe('case insensitivity', () => {
    it('should handle lowercase method names', async () => {
      const mockResponse = { status: 200, body: {} };
      vi.mocked(httpRaw)
        .mockRejectedValueOnce(new NetworkError('Failed'))
        .mockResolvedValueOnce(mockResponse);

      await http('/api/test', { method: 'get' }, 1);

      expect(httpRaw).toHaveBeenCalledTimes(2);
    });

    it('should handle mixed case method names', async () => {
      const mockResponse = { status: 200, body: {} };
      vi.mocked(httpRaw)
        .mockRejectedValueOnce(new NetworkError('Failed'))
        .mockResolvedValueOnce(mockResponse);

      await http('/api/test', { method: 'Get' as any }, 1);

      expect(httpRaw).toHaveBeenCalledTimes(2);
    });
  });
});
