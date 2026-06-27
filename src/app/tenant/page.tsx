import TenantTopbar from "@/components/tenant/Topbar";
import SavedHomesPanel from "@/components/tenant/SavedHomesPanel";

export default function TenantSavedHomesPage() {
  return (
    <div>
      <TenantTopbar title="Saved Homes" />
      <div className="p-6">
        <SavedHomesPanel />
      </div>
    </div>
  );
}
