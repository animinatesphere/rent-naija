import type { ReactNode } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import MobileNav from "@/components/dashboard/MobileNav";
import SubscriptionGate from "@/components/dashboard/SubscriptionGate";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SubscriptionGate>
      <div className="flex min-h-screen bg-foreground/2">
        <Sidebar />
        <div className="flex-1 pb-16 lg:pb-0">{children}</div>
        <MobileNav />
      </div>
    </SubscriptionGate>
  );
}
