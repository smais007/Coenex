/**
 * Example API Service
 *
 * This is a template for creating API service modules.
 * Services encapsulate API calls and business logic for data fetching.
 */

interface ApiResponse<T> {
  data: T;
  error?: string;
}

/**
 * Example service for user-related API calls
 */
export const exampleService = {
  /**
   * Fetches data from an API endpoint
   * @param endpoint - The API endpoint to call
   * @returns Promise with the API response
   */
  async fetchData<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        data: {} as T,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
};
