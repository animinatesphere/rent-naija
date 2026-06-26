"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { LandlordListing } from "@/lib/dashboard";

const propertyTypes = ["Apartment", "Duplex", "Bungalow", "Self-Contain", "Mini Flat"];

export default function EditListingForm({ listing }: { listing: LandlordListing }) {
  const router = useRouter();
  const { property } = listing;

  const [title, setTitle] = useState(property.title);
  const [type, setType] = useState(property.type);
  const [bedrooms, setBedrooms] = useState(String(property.bedrooms));
  const [bathrooms, setBathrooms] = useState(String(property.bathrooms));
  const [price, setPrice] = useState(String(property.pricePerYear));
  const [description, setDescription] = useState(property.description);
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => router.push("/dashboard/listings"), 1100);
  }

  if (saved) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-md rounded-2xl border border-black/5 bg-white p-10 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-light"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a7d3f" strokeWidth="3">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </motion.div>
        <p className="mt-4 font-semibold text-foreground">Listing updated!</p>
        <p className="mt-1 text-sm text-foreground/50">Redirecting to your listings...</p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl space-y-5 rounded-2xl border border-black/5 bg-white p-8"
    >
      <div className={`h-32 rounded-xl bg-linear-to-br ${property.tone}`} />

      <div>
        <label className="text-sm font-medium text-foreground/80">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-foreground/80">Property Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as typeof type)}
            className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand"
          >
            {propertyTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground/80">Price / Year (₦)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-foreground/80">Bedrooms</label>
          <input
            type="number"
            min="0"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground/80">Bathrooms</label>
          <input
            type="number"
            min="0"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground/80">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-1 w-full resize-none rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand"
        />
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-black/5 pt-5">
        <button
          type="button"
          onClick={() => router.push("/dashboard/listings")}
          className="rounded-lg px-5 py-2.5 text-sm font-semibold text-foreground/60 hover:text-foreground"
        >
          Cancel
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand-dark"
        >
          Save Changes
        </motion.button>
      </div>
    </form>
  );
}
