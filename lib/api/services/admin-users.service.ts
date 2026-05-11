import { authenticatedApiRequest } from "@/lib/auth/authenticated-request";
import type {
  AdminUser,
  CreateAdminUserPayload,
  ResetAdminUserPasswordPayload,
  UpdateAdminUserRolePayload,
  UpdateAdminUserStatusPayload,
} from "@/lib/admin-user/types";

export function listAdminUsers() {
  return authenticatedApiRequest<AdminUser[]>("/admin/users", {
    method: "GET",
  });
}

export function getAdminUser(id: string) {
  return authenticatedApiRequest<AdminUser>(`/admin/users/${id}`, {
    method: "GET",
  });
}

export function createAdminUser(payload: CreateAdminUserPayload) {
  return authenticatedApiRequest<AdminUser>("/admin/users", {
    body: payload,
    method: "POST",
  });
}

export function updateAdminUserRole(id: string, payload: UpdateAdminUserRolePayload) {
  return authenticatedApiRequest<AdminUser>(`/admin/users/${id}/role`, {
    body: payload,
    method: "PATCH",
  });
}

export function updateAdminUserStatus(id: string, payload: UpdateAdminUserStatusPayload) {
  return authenticatedApiRequest<AdminUser>(`/admin/users/${id}/status`, {
    body: payload,
    method: "PATCH",
  });
}

export function resetAdminUserPassword(id: string, payload: ResetAdminUserPasswordPayload) {
  return authenticatedApiRequest<AdminUser>(`/admin/users/${id}/reset-password`, {
    body: payload,
    method: "POST",
  });
}
