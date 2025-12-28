// api-client/src/client.ts
export function createApiClient(baseUrl: string) {
  return {
    baseUrl,
  };
}

export type ApiClient = ReturnType<typeof createApiClient>;
