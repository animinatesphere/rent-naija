import type { ReactNode } from "react";
import TenantSidebar from "@/components/tenant/Sidebar";
import TenantMobileNav from "@/components/tenant/MobileNav";

export default function TenantLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-foreground/2">
      <TenantSidebar />
      <div className="flex-1 pb-16 lg:pb-0">{children}</div>
      <TenantMobileNav />
    </div>
  );
}
