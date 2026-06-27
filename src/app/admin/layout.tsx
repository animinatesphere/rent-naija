import type { ReactNode } from "react";
import AdminSidebar from "@/components/admin/Sidebar";
import AdminMobileNav from "@/components/admin/MobileNav";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-foreground/2">
      <AdminSidebar />
      <div className="flex-1 pb-16 lg:pb-0">{children}</div>
      <AdminMobileNav />
    </div>
  );
}
