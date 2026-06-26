import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import Reveal from "@/components/Reveal";
import type { Property } from "@/lib/properties";

export default function FeaturedListings({
  properties,
  isFiltered,
}: {
  properties: Property[];
  isFiltered: boolean;
}) {
  return (
    <section id="listings" className="mx-auto max-w-7xl px-6 py-20">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">
            {isFiltered ? "Search Results" : "Featured Listings"}
          </h2>
          <p className="mt-2 text-foreground/60">
            {isFiltered
              ? `${properties.length} ${properties.length === 1 ? "property" : "properties"} match your search.`
              : "Hand-picked homes from verified landlords and agents."}
          </p>
        </div>
        {isFiltered && (
          <Link
            href="/"
            className="rounded-lg border border-brand px-4 py-2 text-sm font-semibold text-brand-dark hover:bg-brand-light"
          >
            Clear filters
          </Link>
        )}
      </Reveal>

      {properties.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property, i) => (
            <Reveal key={property.id} delay={i * 0.06}>
              <PropertyCard property={property} />
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal className="mt-10 rounded-2xl border border-dashed border-black/10 bg-brand-light/30 py-16 text-center">
          <p className="text-3xl">🔍</p>
          <p className="mt-3 font-semibold text-foreground">No properties match your search</p>
          <p className="mt-1 text-sm text-foreground/60">
            Try a different city or widen your price range.
          </p>
          <Link
            href="/"
            className="mt-5 inline-block rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Clear filters
          </Link>
        </Reveal>
      )}
    </section>
  );
}
