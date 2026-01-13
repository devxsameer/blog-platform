import { describe, it, expect } from 'vitest';
import { unwrap, unwrapWithMeta } from '../unwrap';
import { ApiClientError } from '../errors/base';
import { ValidationError } from '../errors/validation';
import { AuthError } from '../errors/auth';

describe('unwrap', () => {
  describe('successful responses', () => {
    it('should unwrap successful response with data', () => {
      const response = {
        success: true,
        data: { id: 1, name: 'Test' },
      };

      const result = unwrap(200, response);

      expect(result).toEqual({ id: 1, name: 'Test' });
    });

    it('should handle empty data object', () => {
      const response = {
        success: true,
        data: {},
      };

      const result = unwrap(200, response);

      expect(result).toEqual({});
    });

    it('should handle null data', () => {
      const response = {
        success: true,
        data: null,
      };

      const result = unwrap(200, response);

      expect(result).toBeNull();
    });
  });

  describe('error responses', () => {
    it('should throw ApiClientError for empty response body', () => {
      expect(() => unwrap(200, null)).toThrow(ApiClientError);
      expect(() => unwrap(200, null)).toThrow('Empty response body');
      expect(() => unwrap(200, undefined)).toThrow(ApiClientError);
    });

    it('should throw AuthError for 401 status', () => {
      const response = {
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Token expired',
        },
      };

      expect(() => unwrap(401, response)).toThrow(AuthError);
      expect(() => unwrap(401, response)).toThrow('Token expired');
    });

    it('should throw ValidationError for validation errors', () => {
      const response = {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          issues: [
            { path: 'email', message: 'Invalid email' },
            { path: 'password', message: 'Password too short' },
          ],
        },
      };

      try {
        unwrap(400, response);
        expect.fail('Should have thrown ValidationError');
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        expect((error as ValidationError).issues).toHaveLength(2);
        expect((error as ValidationError).issues[0]).toEqual({
          path: 'email',
          message: 'Invalid email',
        });
      }
    });

    it('should throw ApiClientError for generic errors', () => {
      const response = {
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Post not found',
        },
      };

      try {
        unwrap(404, response);
        expect.fail('Should have thrown ApiClientError');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiClientError);
        expect((error as ApiClientError).code).toBe('NOT_FOUND');
        expect((error as ApiClientError).status).toBe(404);
        expect((error as ApiClientError).message).toBe('Post not found');
      }
    });

    it('should handle error without code', () => {
      const response = {
        success: false,
        error: {
          message: 'Something went wrong',
        },
      };

      try {
        unwrap(500, response);
        expect.fail('Should have thrown ApiClientError');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiClientError);
        expect((error as ApiClientError).code).toBe('UNKNOWN_ERROR');
        expect((error as ApiClientError).status).toBe(500);
      }
    });

    it('should handle error without message', () => {
      const response = {
        success: false,
        error: {
          code: 'SERVER_ERROR',
        },
      };

      try {
        unwrap(500, response);
        expect.fail('Should have thrown ApiClientError');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiClientError);
        expect((error as ApiClientError).message).toBe(
          'An unexpected error occurred',
        );
      }
    });

    it('should handle malformed error response', () => {
      const response = {
        success: false,
      };

      try {
        unwrap(500, response);
        expect.fail('Should have thrown ApiClientError');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiClientError);
        expect((error as ApiClientError).code).toBe('UNKNOWN_ERROR');
      }
    });
  });
});

describe('unwrapWithMeta', () => {
  it('should unwrap response with data and meta', () => {
    const response = {
      success: true,
      data: [{ id: 1 }, { id: 2 }],
      meta: {
        page: 1,
        totalPages: 5,
        totalCount: 50,
      },
    };

    const result = unwrapWithMeta(200, response);

    expect(result).toEqual({
      data: [{ id: 1 }, { id: 2 }],
      meta: {
        page: 1,
        totalPages: 5,
        totalCount: 50,
      },
    });
  });

  it('should throw AuthError for 401 status', () => {
    const response = {
      success: false,
      error: {
        message: 'Unauthorized',
      },
    };

    expect(() => unwrapWithMeta(401, response)).toThrow(AuthError);
  });

  it('should throw ValidationError for validation errors', () => {
    const response = {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid input',
        issues: [{ path: 'page', message: 'Must be positive' }],
      },
    };

    expect(() => unwrapWithMeta(400, response)).toThrow(ValidationError);
  });
});
