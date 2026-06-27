import TenantTopbar from "@/components/tenant/Topbar";
import TenantProfileForm from "@/components/tenant/TenantProfileForm";

export default function TenantSettingsPage() {
  return (
    <div>
      <TenantTopbar title="Settings" />
      <div className="p-6">
        <TenantProfileForm />
      </div>
    </div>
  );
}
