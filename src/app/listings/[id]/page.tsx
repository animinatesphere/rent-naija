import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import PropertyGallery from "@/components/PropertyGallery";
import ContactLandlordCard from "@/components/ContactLandlordCard";
import PropertyCard from "@/components/PropertyCard";
import FavoriteButton from "@/components/FavoriteButton";
import {
  featuredProperties,
  formatNaira,
  getPropertyById,
} from "@/lib/properties";

export async function generateStaticParams() {
  return featuredProperties.map((property) => ({ id: property.id }));
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    notFound();
  }

  const similar = featuredProperties
    .filter((p) => p.id !== property.id && p.city === property.city)
    .concat(featuredProperties.filter((p) => p.id !== property.id))
    .filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i)
    .slice(0, 3);

  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <nav className="text-sm text-foreground/50">
            <Link href="/" className="hover:text-brand">
              Home
            </Link>{" "}
            / <span className="text-foreground/70">{property.title}</span>
          </nav>

          <div className="mt-6 grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Reveal>
                <PropertyGallery
                  tone={property.tone}
                  verified={property.verified}
                  type={property.type}
                />
              </Reveal>

              <Reveal delay={0.05} className="mt-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-foreground/50">
                      {property.city}, {property.state}
                    </p>
                    <h1 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">
                      {property.title}
                    </h1>
                    <p className="mt-1 text-sm text-foreground/50">{property.address}</p>
                  </div>
                  <FavoriteButton
                    propertyId={property.id}
                    className="shrink-0 border border-black/5"
                  />
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-foreground/70">
                  <span>🛏 {property.bedrooms} Bedrooms</span>
                  <span>🛁 {property.bathrooms} Bathrooms</span>
                  <span>🏠 {property.type}</span>
                </div>

                <p className="mt-3 text-2xl font-bold text-brand-dark">
                  {formatNaira(property.pricePerYear)}
                  <span className="text-sm font-normal text-foreground/50"> /year</span>
                </p>
              </Reveal>

              <Reveal delay={0.1} className="mt-8">
                <h2 className="text-lg font-semibold text-foreground">Description</h2>
                <p className="mt-2 leading-relaxed text-foreground/70">
                  {property.description}
                </p>
              </Reveal>

              <Reveal delay={0.15} className="mt-8">
                <h2 className="text-lg font-semibold text-foreground">Amenities</h2>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {property.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 rounded-lg bg-brand-light/60 px-3 py-2 text-sm text-foreground/80"
                    >
                      <span className="text-brand">✓</span>
                      {amenity}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <ContactLandlordCard
                  landlord={property.landlord}
                  propertyId={property.id}
                  propertyTitle={property.title}
                />
              </div>
            </div>
          </div>

          {similar.length > 0 && (
            <Reveal delay={0.1} className="mt-16">
              <h2 className="text-xl font-bold text-foreground">Similar Listings</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {similar.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
