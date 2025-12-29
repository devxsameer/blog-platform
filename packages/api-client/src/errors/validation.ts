import { ApiClientError } from './base';

export type ValidationIssue = {
  path: string;
  message: string;
};

export class ValidationError extends ApiClientError {
  constructor(
    message: string,
    public issues: ValidationIssue[],
  ) {
    super('VALIDATION_ERROR', 400, message);
    this.name = 'ValidationError';
  }
}
