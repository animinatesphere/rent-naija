import AdminTopbar from "@/components/admin/Topbar";
import VerificationsPanel from "@/components/admin/VerificationsPanel";

export default function AdminVerificationsPage() {
  return (
    <div>
      <AdminTopbar title="Verifications" />
      <div className="p-6">
        <VerificationsPanel />
      </div>
    </div>
  );
}
