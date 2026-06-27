import Link from "next/link";
import { notFound } from "next/navigation";
import Topbar from "@/components/dashboard/Topbar";
import StatusBadge from "@/components/dashboard/StatusBadge";
import OccupancyBadge from "@/components/dashboard/OccupancyBadge";
import Reveal from "@/components/Reveal";
import { getLandlordListingByPropertyId, inquiries } from "@/lib/dashboard";
import { formatNaira } from "@/lib/properties";

export default async function VendorListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = getLandlordListingByPropertyId(id);

  if (!listing) {
    notFound();
  }

  const { property } = listing;
  const relatedInquiries = inquiries.filter((i) => i.propertyTitle === property.title);

  return (
    <div>
      <Topbar title="Listing Details" />

      <div className="space-y-6 p-6">
        <Reveal className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/dashboard/listings"
            className="text-sm font-medium text-foreground/50 hover:text-foreground"
          >
            ← Back to listings
          </Link>
          <div className="flex gap-2">
            <Link
              href={`/listings/${property.id}`}
              target="_blank"
              className="rounded-lg border border-black/10 px-4 py-2 text-sm font-medium text-foreground/70 hover:bg-black/5"
            >
              View Public Page ↗
            </Link>
            <Link
              href={`/dashboard/listings/${property.id}/edit`}
              className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              Edit Listing
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Reveal>
              <div className={`h-56 rounded-2xl bg-linear-to-br ${property.tone}`} />
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-black/5 bg-white p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-foreground/50">
                      {property.city}, {property.state}
                    </p>
                    <h1 className="mt-1 text-xl font-bold text-foreground">{property.title}</h1>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <StatusBadge status={listing.status} />
                    <OccupancyBadge occupied={listing.occupied} />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-foreground/70">
                  <span>🛏 {property.bedrooms} Beds</span>
                  <span>🛁 {property.bathrooms} Baths</span>
                  <span>🏠 {property.type}</span>
                </div>

                <p className="mt-3 text-xl font-bold text-brand-dark">
                  {formatNaira(property.pricePerYear)}
                  <span className="text-sm font-normal text-foreground/50"> /year</span>
                </p>

                <p className="mt-4 text-sm leading-relaxed text-foreground/70">
                  {property.description}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-black/5 bg-white p-6">
                <h2 className="font-semibold text-foreground">
                  Inquiries about this property ({relatedInquiries.length})
                </h2>
                {relatedInquiries.length > 0 ? (
                  <div className="mt-4 space-y-4">
                    {relatedInquiries.map((inquiry) => (
                      <div key={inquiry.id} className="flex gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-light text-xs font-semibold text-brand-dark">
                          {inquiry.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {inquiry.tenantName}
                          </p>
                          <p className="text-xs text-foreground/50">{inquiry.message}</p>
                        </div>
                        {inquiry.unread && (
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand" />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-foreground/50">
                    No inquiries yet for this property.
                  </p>
                )}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="space-y-4">
              <div className="rounded-2xl border border-black/5 bg-white p-6">
                <h2 className="font-semibold text-foreground">Performance</h2>
                <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                  <div className="rounded-xl bg-brand-light/50 py-3">
                    <p className="text-lg font-bold text-foreground">{listing.views}</p>
                    <p className="text-xs text-foreground/50">Views</p>
                  </div>
                  <div className="rounded-xl bg-brand-light/50 py-3">
                    <p className="text-lg font-bold text-foreground">{listing.inquiries}</p>
                    <p className="text-xs text-foreground/50">Inquiries</p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-foreground/40">
                  Posted on{" "}
                  {new Date(listing.datePosted).toLocaleDateString("en-NG", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="rounded-2xl border border-black/5 bg-white p-6">
                <h2 className="font-semibold text-foreground">Amenities</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {property.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="rounded-full bg-brand-light/60 px-3 py-1 text-xs text-foreground/70"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
