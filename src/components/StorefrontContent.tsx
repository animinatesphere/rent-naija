"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import PropertyCard from "@/components/PropertyCard";
import { getLandlordProfile, getInitials } from "@/lib/profile";
import { getSubscription } from "@/lib/subscription";
import { getPlanById } from "@/lib/plans";
import { getKycRecord } from "@/lib/kyc";
import type { LandlordListing } from "@/lib/dashboard";

type FallbackProfile = {
  name: string;
  businessName: string;
  phone: string;
  city: string;
  bio: string;
  initials: string;
  role: string;
  memberSince: string;
};

const trustPoints = [
  {
    icon: "✅",
    title: "Verified Listings",
    description: "Every property shown here has been checked by the RentNaija team.",
  },
  {
    icon: "💬",
    title: "Direct Contact",
    description: "Reach out directly — no agent middlemen or hidden fees.",
  },
  {
    icon: "🔒",
    title: "Secure Payments",
    description: "Pay rent through escrow — funds release only after you move in.",
  },
];

export default function StorefrontContent({
  fallback,
  listings,
}: {
  fallback: FallbackProfile;
  listings: LandlordListing[];
}) {
  const [status, setStatus] = useState<"checking" | "available" | "unavailable">("checking");
  const [verified, setVerified] = useState(false);
  const [profile, setProfile] = useState(fallback);

  useEffect(() => {
    const subscription = getSubscription();
    const plan = subscription ? getPlanById(subscription.planId) : undefined;
    setStatus(plan?.hasStorefront ? "available" : "unavailable");
    setVerified(getKycRecord()?.status === "verified");

    const override = getLandlordProfile();
    if (override) {
      setProfile({
        name: override.fullName || fallback.name,
        businessName: override.businessName || fallback.businessName,
        phone: override.phone || fallback.phone,
        city: override.city || fallback.city,
        bio: override.bio || fallback.bio,
        initials: getInitials(override.fullName || fallback.name),
        role: fallback.role,
        memberSince: fallback.memberSince,
      });
    }
  }, [fallback]);

  if (status === "checking") {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-light border-t-brand" />
      </div>
    );
  }

  if (status === "unavailable") {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center px-6 text-center">
        <span className="text-4xl">🔒</span>
        <h1 className="mt-4 text-xl font-bold text-foreground">Storefront Not Available</h1>
        <p className="mt-2 max-w-sm text-sm text-foreground/60">
          This landlord&apos;s current plan doesn&apos;t include a public
          storefront page.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Back to RentNaija
        </Link>
      </div>
    );
  }

  const verifiedListings = listings.filter((l) => l.status === "Verified");

  return (
    <>
      <div className="relative">
        <div className="relative h-44 overflow-hidden bg-linear-to-br from-brand-dark via-brand to-emerald-600 sm:h-56">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute -left-16 -top-16 h-56 w-56 animate-blob rounded-full bg-emerald-300/20 blur-3xl" />
          <div className="absolute -right-10 bottom-0 h-56 w-56 animate-blob rounded-full bg-yellow-300/15 blur-3xl [animation-delay:4s]" />
        </div>

        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="relative -mt-16 rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:-mt-20 sm:p-8">
              <div className="flex flex-col items-center text-center sm:flex-row sm:items-end sm:text-left">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-white bg-brand-light text-2xl font-bold text-brand-dark shadow-md">
                  {profile.initials}
                </div>

                <div className="mt-4 flex-1 sm:ml-6 sm:mt-0">
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                    <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
                    {verified && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        Verified
                      </span>
                    )}
                  </div>
                  {profile.businessName && (
                    <p className="mt-0.5 text-sm font-medium text-brand-dark">
                      {profile.businessName}
                    </p>
                  )}
                  <p className="mt-1 flex items-center justify-center gap-1 text-sm text-foreground/50 sm:justify-start">
                    {profile.role}
                    {profile.city && (
                      <>
                        <span>·</span>
                        <span>📍 {profile.city}</span>
                      </>
                    )}
                  </p>
                </div>

                <div className="mt-5 flex gap-2 sm:mt-0">
                  {profile.phone && (
                    <a
                      href={`tel:${profile.phone}`}
                      className="rounded-lg border border-brand px-4 py-2 text-sm font-semibold text-brand-dark transition hover:bg-brand-light"
                    >
                      📞 Call
                    </a>
                  )}
                  <a
                    href="#listings"
                    className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
                  >
                    View Listings
                  </a>
                </div>
              </div>

              {profile.bio && (
                <p className="mt-6 max-w-2xl text-sm leading-relaxed text-foreground/70">
                  {profile.bio}
                </p>
              )}

              <div className="mt-6 grid max-w-md grid-cols-3 gap-4 border-t border-black/5 pt-6 text-center">
                <Stat value={String(verifiedListings.length)} label="Listings" />
                <Stat value="< 2h" label="Avg. Response" />
                <Stat value={profile.memberSince} label="Member Since" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid gap-4 sm:grid-cols-3">
          {trustPoints.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.06}>
              <div className="rounded-xl border border-black/5 bg-white px-5 py-4">
                <span className="text-xl">{point.icon}</span>
                <p className="mt-2 text-sm font-semibold text-foreground">{point.title}</p>
                <p className="mt-1 text-xs text-foreground/50">{point.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <main id="listings" className="mx-auto max-w-5xl scroll-mt-6 px-6 pb-16">
        <Reveal>
          <h2 className="text-lg font-bold text-foreground">Available Properties</h2>
          <p className="mt-1 text-sm text-foreground/50">
            {verifiedListings.length} verified listing{verifiedListings.length === 1 ? "" : "s"}{" "}
            from {profile.name}
          </p>
        </Reveal>

        {verifiedListings.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {verifiedListings.map((listing, i) => (
              <Reveal key={listing.property.id} delay={i * 0.06}>
                <PropertyCard property={listing.property} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-foreground/50">
            No active listings right now — check back soon.
          </p>
        )}
      </main>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-base font-bold text-foreground">{value}</p>
      <p className="text-[11px] text-foreground/50">{label}</p>
    </div>
  );
}
