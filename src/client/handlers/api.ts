
export type Result<T> = [T | null, string | null];
// This function is used to handle errors in the API. If the API call is successful, the function will return the data and null. If the API call is not successful, the function will return null and the error message.
export async function withErrorHandling<T>(
  fn: () => Promise<T>
): Promise<Result<T>> {
  try {
    const result = await fn();
    return [result, null];
    } catch (error) {
      if (error instanceof Error) {
        return [null, error.message];
      }
      return [null, "An unknown error occurred"];
    }
}
