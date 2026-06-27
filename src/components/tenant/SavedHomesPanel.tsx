"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import Reveal from "@/components/Reveal";
import { getFavorites } from "@/lib/tenant";
import { getPropertyById, type Property } from "@/lib/properties";

export default function SavedHomesPanel() {
  const [properties, setProperties] = useState<Property[] | null>(null);

  useEffect(() => {
    const saved = getFavorites()
      .map((id) => getPropertyById(id))
      .filter((p): p is Property => Boolean(p));
    setProperties(saved);
  }, []);

  if (properties === null) {
    return (
      <div className="flex h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-light border-t-brand" />
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-black/10 bg-white py-16 text-center">
        <p className="text-3xl">🤍</p>
        <p className="mt-3 font-semibold text-foreground">No saved homes yet</p>
        <p className="mt-1 text-sm text-foreground/60">
          Tap the heart icon on any listing to save it here for later.
        </p>
        <Link
          href="/#listings"
          className="mt-5 inline-block rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Browse Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property, i) => (
        <Reveal key={property.id} delay={i * 0.06}>
          <PropertyCard property={property} />
        </Reveal>
      ))}
    </div>
  );
}
