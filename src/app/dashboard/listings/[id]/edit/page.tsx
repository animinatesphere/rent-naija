import { notFound } from "next/navigation";
import Topbar from "@/components/dashboard/Topbar";
import EditListingForm from "@/components/dashboard/EditListingForm";
import { getLandlordListingByPropertyId } from "@/lib/dashboard";

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = getLandlordListingByPropertyId(id);

  if (!listing) {
    notFound();
  }

  return (
    <div>
      <Topbar title="Edit Listing" />
      <div className="p-6">
        <EditListingForm listing={listing} />
      </div>
    </div>
  );
}
