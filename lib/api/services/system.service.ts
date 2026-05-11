import { apiProbe, ApiError } from "@/lib/api/client";
import { getApiConfig } from "@/lib/api/config";

export type BackendConnectionStatus = {
  baseUrl: string;
  checkedAt: string;
  details: string;
  endpoint: string;
  reachable: boolean;
  status: number | null;
  statusText: string;
};

const SWAGGER_PATH = "/api";

export async function getBackendConnectionStatus(): Promise<BackendConnectionStatus> {
  const { baseUrl } = getApiConfig();

  try {
    const response = await apiProbe(SWAGGER_PATH, {
      cache: "no-store",
      headers: {
        Accept: "text/html",
      },
      method: "GET",
    });

    return {
      baseUrl,
      checkedAt: new Date().toISOString(),
      details: response.ok
        ? "Frontend da ket noi duoc toi backend."
        : "Backend co phan hoi nhung tra ve ma trang thai khong thanh cong.",
      endpoint: response.url,
      reachable: response.ok,
      status: response.status,
      statusText: response.statusText || "Unknown",
    };
  } catch (error) {
    const apiError = error instanceof ApiError ? error : null;

    return {
      baseUrl,
      checkedAt: new Date().toISOString(),
      details: apiError?.message || "Khong the ket noi toi backend.",
      endpoint: `${baseUrl}${SWAGGER_PATH}`,
      reachable: false,
      status: apiError?.status ?? null,
      statusText: "Unavailable",
    };
  }
}
