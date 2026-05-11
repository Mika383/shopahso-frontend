import AdminLayout from "@/components/admin/AdminLayout";
import AdminOverview from "@/components/admin/AdminOverview";

export default function AdminShell() {
  return (
    <AdminLayout>
      <AdminOverview />
    </AdminLayout>
  );
}
