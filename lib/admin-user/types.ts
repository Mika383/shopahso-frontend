import type { AuthRole } from "@/lib/auth/types";

export type AdminUser = {
  id: string;
  fullName: string | null;
  dateOfBirth: string | null;
  email: string;
  phoneNumber: string | null;
  role: AuthRole;
  active: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateAdminUserPayload = {
  fullName?: string;
  dateOfBirth?: string;
  email: string;
  phoneNumber?: string;
  password: string;
  role: Extract<AuthRole, "STAFF" | "ADMIN" | "USER">;
};

export type UpdateAdminUserRolePayload = {
  role: AuthRole;
};

export type UpdateAdminUserStatusPayload = {
  active: boolean;
};

export type ResetAdminUserPasswordPayload = {
  password: string;
};
