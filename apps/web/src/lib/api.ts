import { createApiClient, createAuthApi } from '@blog/api-client';

export const apiClient = createApiClient('');
export const authApi = createAuthApi(apiClient);
