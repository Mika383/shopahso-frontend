import { BarChart3, ShieldCheck, Users } from "lucide-react";

export const adminNavigation = [
  {
    icon: BarChart3,
    label: "Tổng quan",
    href: "/admin",
  },
  {
    icon: ShieldCheck,
    label: "Tài khoản",
    href: "/admin/tai-khoan",
  },
];

export const adminOverviewCards = [
  { label: "Báo giá mới", value: "18" },
  { label: "BOM xử lý", value: "07" },
  { label: "Người dùng", value: "12" },
  { label: "Cảnh báo kho", value: "24" },
];

export const adminModules = [
  { icon: ShieldCheck, title: "Tài khoản", status: "Sẵn sàng" },
  { icon: Users, title: "Nhân viên", status: "Mở cho admin" },
  { icon: BarChart3, title: "Tổng quan", status: "Đang dùng" },
];

export const adminQueues = [
  { title: "Tài khoản chờ rà soát", value: "03" },
  { title: "Phiên cần kiểm tra", value: "06" },
  { title: "Yêu cầu chờ phản hồi", value: "14" },
];

export const adminSignals = [
  { label: "Phiên", value: "Hôm nay 09:15" },
  { label: "Ưu tiên", value: "Tài khoản, phân quyền" },
  { label: "Kênh", value: "Admin nội bộ" },
];
