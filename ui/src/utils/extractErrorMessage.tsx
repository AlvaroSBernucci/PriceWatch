import { isAxiosError } from "axios";

export function extractErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const data = error.response?.data;
    if (!data) return "Unknown server error";

    if (typeof data === "object") {
      for (const key in data) {
        const value = data[key];
        if (Array.isArray(value) && value.length > 0) {
          return value[0];
        }
        if (typeof value === "string") {
          return value;
        }
      }
    }

    return "Unknown API error.";
  }

  if (error instanceof Error) return error.message;
  return "Unexpected error.";
}
