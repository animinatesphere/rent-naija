import PropertyCard from "@/components/PropertyCard";
import Reveal from "@/components/Reveal";
import { featuredProperties } from "@/lib/properties";

export default function FeaturedListings() {
  return (
    <section id="listings" className="mx-auto max-w-7xl px-6 py-20">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Featured Listings</h2>
          <p className="mt-2 text-foreground/60">
            Hand-picked homes from verified landlords and agents.
          </p>
        </div>
        <a
          href="#listings"
          className="rounded-lg border border-brand px-4 py-2 text-sm font-semibold text-brand-dark hover:bg-brand-light"
        >
          View all listings
        </a>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProperties.map((property, i) => (
          <Reveal key={property.id} delay={i * 0.06}>
            <PropertyCard property={property} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
