import Link from "next/link";
import { formatNaira, type Property } from "@/lib/properties";
import FavoriteButton from "@/components/FavoriteButton";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/listings/${property.id}`}>
        <div
          className={`relative flex h-44 items-end bg-linear-to-br p-4 ${property.tone}`}
        >
          <FavoriteButton propertyId={property.id} className="absolute left-3 top-3" />
          {property.verified && (
            <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-dark">
              ✓ Verified
            </span>
          )}
          <span className="rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white">
            {property.type}
          </span>
        </div>
      </Link>

      <div className="p-4">
        <p className="text-sm text-foreground/60">
          {property.city}, {property.state}
        </p>
        <h3 className="mt-1 font-semibold text-foreground">{property.title}</h3>

        <div className="mt-3 flex items-center gap-4 text-sm text-foreground/60">
          <span>🛏 {property.bedrooms} Beds</span>
          <span>🛁 {property.bathrooms} Baths</span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-4">
          <p className="font-bold text-brand-dark">
            {formatNaira(property.pricePerYear)}
            <span className="text-xs font-normal text-foreground/50"> /year</span>
          </p>
          <Link
            href={`/listings/${property.id}`}
            className="rounded-lg bg-brand-light px-3 py-1.5 text-sm font-medium text-brand-dark transition hover:bg-brand hover:text-white"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
