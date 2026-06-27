import AdminTopbar from "@/components/admin/Topbar";
import ListingsModerationPanel from "@/components/admin/ListingsModerationPanel";

export default function AdminListingsPage() {
  return (
    <div>
      <AdminTopbar title="Listings Moderation" />
      <div className="p-6">
        <ListingsModerationPanel />
      </div>
    </div>
  );
}
