"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAdminListings, type AdminListing } from "@/lib/admin";
import { formatNaira } from "@/lib/properties";

export default function ListingsModerationPanel() {
  const [listings] = useState<AdminListing[]>(() => getAdminListings());
  const [decided, setDecided] = useState<Record<string, "approved" | "rejected">>({});

  function approve(id: string) {
    setDecided((prev) => ({ ...prev, [id]: "approved" }));
  }

  function reject(id: string) {
    setDecided((prev) => ({ ...prev, [id]: "rejected" }));
  }

  const pending = listings.filter((l) => !decided[l.id]);

  if (pending.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-black/10 bg-white py-16 text-center">
        <p className="text-3xl">✅</p>
        <p className="mt-3 font-semibold text-foreground">No listings awaiting review</p>
        <p className="mt-1 text-sm text-foreground/60">New submissions will appear here.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence>
        {pending.map((listing) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden rounded-2xl border border-black/5 bg-white"
          >
            <div className={`h-28 bg-linear-to-br ${listing.tone}`} />
            <div className="p-4">
              <p className="text-xs text-foreground/50">
                {listing.city}, {listing.state}
              </p>
              <p className="mt-1 font-semibold text-foreground">{listing.title}</p>
              <p className="mt-1 text-xs text-foreground/50">By {listing.landlordName}</p>
              <p className="mt-2 font-bold text-brand-dark">{formatNaira(listing.price)}/yr</p>
              <p className="mt-1 text-xs text-foreground/40">Submitted {listing.submittedDate}</p>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => reject(listing.id)}
                  className="flex-1 rounded-lg border border-red-200 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => approve(listing.id)}
                  className="flex-1 rounded-lg bg-brand py-2 text-xs font-semibold text-white transition hover:bg-brand-dark"
                >
                  Approve
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
