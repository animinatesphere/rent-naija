import Topbar from "@/components/dashboard/Topbar";
import BillingPanel from "@/components/dashboard/BillingPanel";

export default function DashboardBillingPage() {
  return (
    <div>
      <Topbar title="Billing" />
      <div className="p-6">
        <BillingPanel />
      </div>
    </div>
  );
}
