"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  createAdminUser,
  listAdminUsers,
  resetAdminUserPassword,
  updateAdminUserRole,
  updateAdminUserStatus,
} from "@/lib/api/services/admin-users.service";
import type { AdminUser, CreateAdminUserPayload } from "@/lib/admin-user/types";
import type { AuthRole } from "@/lib/auth/types";

const roleOptions: AuthRole[] = ["USER", "STAFF", "ADMIN"];

const initialCreateState: CreateAdminUserPayload = {
  email: "",
  password: "",
  role: "STAFF",
};

export default function AdminAccountManager() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [createForm, setCreateForm] = useState(initialCreateState);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [roleDraft, setRoleDraft] = useState<AuthRole>("STAFF");
  const [statusDraft, setStatusDraft] = useState(true);
  const [resetPasswordValue, setResetPasswordValue] = useState("");

  const selectedUser = useMemo(
    () => users.find((user) => user.id === selectedUserId) ?? null,
    [selectedUserId, users],
  );

  const handleSelectUser = (user: AdminUser) => {
    setSelectedUserId(user.id);
    setRoleDraft(user.role);
    setStatusDraft(user.active);
  };

  useEffect(() => {
    async function loadUsers() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const nextUsers = await listAdminUsers();
        setUsers(nextUsers);

        if (!selectedUserId && nextUsers.length > 0) {
          setSelectedUserId(nextUsers[0].id);
          setRoleDraft(nextUsers[0].role);
          setStatusDraft(nextUsers[0].active);
        }
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Không thể tải danh sách tài khoản.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadUsers();
  }, [selectedUserId]);

  const syncUser = (nextUser: AdminUser) => {
    setUsers((current) => current.map((user) => (user.id === nextUser.id ? nextUser : user)));
  };

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loadingId = toast.loading("Đang tạo tài khoản...");

    try {
      const nextUser = await createAdminUser(createForm);
      setUsers((current) => [nextUser, ...current]);
      handleSelectUser(nextUser);
      setCreateForm(initialCreateState);
      toast.success("Đã tạo tài khoản.", { id: loadingId });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể tạo tài khoản.", { id: loadingId });
    }
  };

  const handleRoleUpdate = async () => {
    if (!selectedUser) {
      return;
    }

    const loadingId = toast.loading("Đang cập nhật vai trò...");

    try {
      const updatedUser = await updateAdminUserRole(selectedUser.id, { role: roleDraft });
      syncUser(updatedUser);
      toast.success("Đã cập nhật vai trò.", { id: loadingId });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể cập nhật vai trò.", { id: loadingId });
    }
  };

  const handleStatusUpdate = async () => {
    if (!selectedUser) {
      return;
    }

    const loadingId = toast.loading("Đang cập nhật trạng thái...");

    try {
      const updatedUser = await updateAdminUserStatus(selectedUser.id, { active: statusDraft });
      syncUser(updatedUser);
      toast.success("Đã cập nhật trạng thái.", { id: loadingId });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể cập nhật trạng thái.", { id: loadingId });
    }
  };

  const handleResetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedUser) {
      return;
    }

    const loadingId = toast.loading("Đang đặt lại mật khẩu...");

    try {
      const updatedUser = await resetAdminUserPassword(selectedUser.id, {
        password: resetPasswordValue,
      });
      syncUser(updatedUser);
      setResetPasswordValue("");
      toast.success("Đã đặt lại mật khẩu.", { id: loadingId });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể đặt lại mật khẩu.", { id: loadingId });
    }
  };

  return (
    <AdminLayout>
      <div className="flex-1 px-4 py-6 lg:px-8 lg:py-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_360px]">
          <section className="space-y-6">
            <div className="border border-border bg-background">
              <div className="border-b border-border px-6 py-5">
                <h3 className="text-xl font-black tracking-tight">Danh sách tài khoản</h3>
              </div>

              {isLoading ? (
                <div className="px-6 py-10 text-sm text-muted-foreground">Đang tải danh sách tài khoản...</div>
              ) : errorMessage ? (
                <div className="px-6 py-10 text-sm text-destructive">{errorMessage}</div>
              ) : users.length === 0 ? (
                <div className="px-6 py-10 text-sm text-muted-foreground">Chưa có tài khoản nội bộ nào.</div>
              ) : (
                <div className="divide-y divide-border">
                  {users.map((user) => (
                    <button
                      key={user.id}
                      className={[
                        "grid w-full gap-3 px-6 py-4 text-left transition-colors md:grid-cols-[minmax(0,1fr)_120px_110px]",
                        selectedUserId === user.id ? "bg-muted/25" : "hover:bg-muted/15",
                      ].join(" ")}
                      onClick={() => handleSelectUser(user)}
                      type="button"
                    >
                      <div>
                        <p className="font-semibold">{user.fullName || user.email}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="text-sm font-semibold">{user.role}</div>
                      <div className="text-sm font-semibold">{user.active ? "Hoạt động" : "Tạm khóa"}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="border border-border bg-background">
              <div className="border-b border-border px-6 py-5">
                <h3 className="text-xl font-black tracking-tight">Tạo tài khoản mới</h3>
              </div>

              <form className="grid gap-4 px-6 py-6 md:grid-cols-2" onSubmit={handleCreate}>
                <label className="grid gap-2 text-sm">
                  <span className="font-semibold">Email</span>
                  <input
                    className="h-11 border border-border px-3 outline-none focus:border-primary"
                    onChange={(event) => setCreateForm((current) => ({ ...current, email: event.target.value }))}
                    required
                    type="email"
                    value={createForm.email}
                  />
                </label>
                <label className="grid gap-2 text-sm">
                  <span className="font-semibold">Vai trò</span>
                  <select
                    className="h-11 border border-border bg-background px-3 outline-none focus:border-primary"
                    onChange={(event) => setCreateForm((current) => ({ ...current, role: event.target.value as AuthRole }))}
                    value={createForm.role}
                  >
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm md:col-span-2">
                  <span className="font-semibold">Mật khẩu</span>
                  <input
                    className="h-11 border border-border px-3 outline-none focus:border-primary"
                    onChange={(event) => setCreateForm((current) => ({ ...current, password: event.target.value }))}
                    required
                    type="password"
                    value={createForm.password}
                  />
                </label>

                <div className="md:col-span-2">
                  <Button className="h-11 px-5 text-sm font-semibold" type="submit">
                    Tạo tài khoản
                  </Button>
                </div>
              </form>
            </div>
          </section>

          <aside className="border border-border bg-background">
            <div className="border-b border-border px-6 py-5">
              <h3 className="text-xl font-black tracking-tight">Chi tiết tài khoản</h3>
            </div>

            {!selectedUser ? (
              <div className="px-6 py-10 text-sm text-muted-foreground">Chọn một tài khoản để quản lý.</div>
            ) : (
              <div className="space-y-6 px-6 py-6">
                <div className="space-y-2">
                  <p className="text-lg font-black tracking-tight">{selectedUser.fullName || "Chưa có họ tên"}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  <p className="text-sm text-muted-foreground">
                    Đăng nhập gần nhất:{" "}
                    {selectedUser.lastLoginAt ? new Date(selectedUser.lastLoginAt).toLocaleString("vi-VN") : "Chưa có"}
                  </p>
                </div>

                <div className="space-y-4 border-t border-border pt-6">
                  <label className="grid gap-2 text-sm">
                    <span className="font-semibold">Vai trò</span>
                    <select
                      className="h-11 border border-border bg-background px-3 outline-none focus:border-primary"
                      onChange={(event) => setRoleDraft(event.target.value as AuthRole)}
                      value={roleDraft}
                    >
                      {roleOptions.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </label>
                  <Button className="h-11 w-full text-sm font-semibold" onClick={handleRoleUpdate} type="button" variant="outline">
                    Cập nhật vai trò
                  </Button>
                </div>

                <div className="space-y-4 border-t border-border pt-6">
                  <label className="grid gap-2 text-sm">
                    <span className="font-semibold">Trạng thái</span>
                    <select
                      className="h-11 border border-border bg-background px-3 outline-none focus:border-primary"
                      onChange={(event) => setStatusDraft(event.target.value === "true")}
                      value={String(statusDraft)}
                    >
                      <option value="true">Hoạt động</option>
                      <option value="false">Tạm khóa</option>
                    </select>
                  </label>
                  <Button className="h-11 w-full text-sm font-semibold" onClick={handleStatusUpdate} type="button" variant="outline">
                    Cập nhật trạng thái
                  </Button>
                </div>

                <form className="space-y-4 border-t border-border pt-6" onSubmit={handleResetPassword}>
                  <label className="grid gap-2 text-sm">
                    <span className="font-semibold">Mật khẩu mới</span>
                    <input
                      className="h-11 border border-border px-3 outline-none focus:border-primary"
                      onChange={(event) => setResetPasswordValue(event.target.value)}
                      required
                      type="password"
                      value={resetPasswordValue}
                    />
                  </label>
                  <Button className="h-11 w-full text-sm font-semibold" type="submit">
                    Đặt lại mật khẩu
                  </Button>
                </form>
              </div>
            )}
          </aside>
        </div>
      </div>
    </AdminLayout>
  );
}
