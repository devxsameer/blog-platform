# API Client Testing Strategy

## Why Test the API Client?

Even though the backend has Vitest + Supertest integration tests, the API client needs its own tests because it handles:

1. **Error Transformation** - Converting backend errors to typed client errors
2. **Retry Logic** - Network resilience for idempotent requests
3. **Request/Response Handling** - Unwrapping responses correctly
4. **Type Safety** - Ensuring TypeScript types match runtime behavior

## What We Test

### ✅ High-Value Tests (Included)

1. **`unwrap.test.ts`** - Response parsing & error transformation
   - Success cases with various data types
   - Error handling (401, validation, generic)
   - Edge cases (empty responses, malformed data)

2. **`http.test.ts`** - Retry logic for network failures
   - GET/HEAD requests retry on NetworkError/TimeoutError
   - POST/PUT/DELETE don't retry (non-idempotent)
   - Retry exhaustion

3. **`errors.test.ts`** - Error class hierarchy
   - ApiClientError, ValidationError, AuthError
   - Correct inheritance and properties

### ❌ What We Don't Test (Covered by Backend)

- Actual API endpoints behavior
- Database operations
- Business logic validation
- HTTP server responses

## Running Tests

```bash
# Run tests once
pnpm --filter @blog/api-client test

# Watch mode (during development)
pnpm --filter @blog/api-client test:watch

# With UI
pnpm --filter @blog/api-client test:ui

# With coverage report
pnpm --filter @blog/api-client test:coverage
```

## Test Philosophy

**Backend Tests (Supertest):**

- Integration tests
- Test actual HTTP responses
- Test database operations
- Test business logic

**API Client Tests (Vitest):**

- Unit tests
- Test client logic in isolation
- Test error transformations
- Test retry mechanisms

This separation follows the **Testing Pyramid** - unit tests for client logic, integration tests for backend.
