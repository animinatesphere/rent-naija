import Topbar from "@/components/dashboard/Topbar";
import KycPanel from "@/components/dashboard/KycPanel";

export default function DashboardVerificationPage() {
  return (
    <div>
      <Topbar title="Verification" />
      <div className="p-6">
        <KycPanel />
      </div>
    </div>
  );
}
