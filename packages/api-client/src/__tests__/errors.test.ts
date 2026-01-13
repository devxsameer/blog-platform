import { describe, it, expect } from 'vitest';
import { ApiClientError } from '../errors/base';
import { ValidationError } from '../errors/validation';
import { AuthError } from '../errors/auth';

describe('Error classes', () => {
  describe('ApiClientError', () => {
    it('should create error with correct properties', () => {
      const error = new ApiClientError('NOT_FOUND', 404, 'Resource not found');

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(ApiClientError);
      expect(error.name).toBe('ApiClientError');
      expect(error.code).toBe('NOT_FOUND');
      expect(error.status).toBe(404);
      expect(error.message).toBe('Resource not found');
    });

    it('should have stack trace', () => {
      const error = new ApiClientError('TEST', 500, 'Test error');

      expect(error.stack).toBeDefined();
      expect(error.stack).toContain('ApiClientError');
    });
  });

  describe('ValidationError', () => {
    it('should create validation error with issues', () => {
      const issues = [
        { path: 'email', message: 'Invalid email format' },
        { path: 'password', message: 'Too short' },
      ];

      const error = new ValidationError('Validation failed', issues);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(ApiClientError);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.name).toBe('ValidationError');
      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.status).toBe(400);
      expect(error.message).toBe('Validation failed');
      expect(error.issues).toEqual(issues);
    });

    it('should handle empty issues array', () => {
      const error = new ValidationError('Validation failed', []);

      expect(error.issues).toEqual([]);
    });

    it('should preserve issue structure', () => {
      const issues = [{ path: 'user.email', message: 'Invalid' }];

      const error = new ValidationError('Failed', issues);

      expect(error.issues[0].path).toBe('user.email');
    });
  });

  describe('AuthError', () => {
    it('should create auth error with correct properties', () => {
      const error = new AuthError('Token expired');

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(ApiClientError);
      expect(error).toBeInstanceOf(AuthError);
      expect(error.name).toBe('AuthError');
      expect(error.code).toBe('UNAUTHORIZED');
      expect(error.status).toBe(401);
      expect(error.message).toBe('Token expired');
    });

    it('should handle different auth error messages', () => {
      const error1 = new AuthError('Invalid credentials');
      const error2 = new AuthError('Session expired');

      expect(error1.message).toBe('Invalid credentials');
      expect(error2.message).toBe('Session expired');
      expect(error1.code).toBe(error2.code); // Both UNAUTHORIZED
    });
  });

  describe('Error inheritance', () => {
    it('should allow catching specific error types', () => {
      const error = new ValidationError('Test', []);

      try {
        throw error;
      } catch (e) {
        if (e instanceof ValidationError) {
          expect(e.issues).toBeDefined();
        } else {
          expect.fail('Should be ValidationError');
        }
      }
    });

    it('should allow catching base ApiClientError', () => {
      const errors = [
        new ApiClientError('TEST', 500, 'Test'),
        new ValidationError('Test', []),
        new AuthError('Test'),
      ];

      errors.forEach((error) => {
        expect(error).toBeInstanceOf(ApiClientError);
        expect(error.code).toBeDefined();
        expect(error.status).toBeDefined();
      });
    });
  });
});
