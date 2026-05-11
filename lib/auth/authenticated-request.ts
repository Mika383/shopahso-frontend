import { ApiError, apiRequest } from "@/lib/api/client";
import type { ApiRequestOptions } from "@/lib/api/types";
import { refreshAuthSession } from "@/lib/api/services/auth.service";
import { clearStoredAuthTokens, getStoredAuthTokens, setStoredAuthTokens } from "@/lib/auth/storage";

function withAccessToken(headers: HeadersInit | undefined, accessToken: string) {
  const nextHeaders = new Headers(headers);
  nextHeaders.set("Authorization", `Bearer ${accessToken}`);
  return nextHeaders;
}

export async function authenticatedApiRequest<T>(path: string, options: ApiRequestOptions = {}) {
  const storedTokens = getStoredAuthTokens();

  if (!storedTokens) {
    throw new ApiError("Phiên đăng nhập không hợp lệ", 401, path);
  }

  try {
    return await apiRequest<T>(path, {
      ...options,
      headers: withAccessToken(options.headers, storedTokens.accessToken),
    });
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 401) {
      throw error;
    }

    try {
      const refreshedSession = await refreshAuthSession(storedTokens);
      const refreshedTokens = {
        accessToken: refreshedSession.accessToken,
        refreshToken: refreshedSession.refreshToken,
      };

      setStoredAuthTokens(refreshedTokens);

      return await apiRequest<T>(path, {
        ...options,
        headers: withAccessToken(options.headers, refreshedTokens.accessToken),
      });
    } catch (refreshError) {
      clearStoredAuthTokens();
      throw refreshError;
    }
  }
}
