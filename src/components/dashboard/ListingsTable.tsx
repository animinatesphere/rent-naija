"use client";

import { useState } from "react";
import Link from "next/link";
import type { LandlordListing, ListingStatus } from "@/lib/dashboard";
import { formatNaira } from "@/lib/properties";
import StatusBadge from "@/components/dashboard/StatusBadge";

const statusOptions: ListingStatus[] = ["Verified", "Pending", "Draft"];

export default function ListingsTable({ listings }: { listings: LandlordListing[] }) {
  const [rows, setRows] = useState(listings);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  function changeStatus(propertyId: string, status: ListingStatus) {
    setRows((prev) =>
      prev.map((row) => (row.property.id === propertyId ? { ...row, status } : row))
    );
    setOpenMenuId(null);
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-black/5 bg-black/2 text-xs uppercase text-foreground/40">
          <tr>
            <th className="px-5 py-3">Property</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3">Price</th>
            <th className="px-5 py-3">Views</th>
            <th className="px-5 py-3">Inquiries</th>
            <th className="px-5 py-3">Posted</th>
            <th className="px-5 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((listing) => (
            <tr
              key={listing.property.id}
              className="border-b border-black/5 last:border-0 hover:bg-black/1"
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-14 shrink-0 rounded-lg bg-linear-to-br ${listing.property.tone}`}
                  />
                  <div className="min-w-0">
                    <p className="max-w-[16rem] truncate font-medium text-foreground">
                      {listing.property.title}
                    </p>
                    <p className="text-xs text-foreground/50">
                      {listing.property.city}, {listing.property.state}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4">
                <div className="relative inline-block">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMenuId(openMenuId === listing.property.id ? null : listing.property.id)
                    }
                  >
                    <StatusBadge status={listing.status} />
                  </button>
                  {openMenuId === listing.property.id && (
                    <div className="absolute left-0 top-full z-10 mt-1 w-32 rounded-lg border border-black/5 bg-white py-1 shadow-lg">
                      {statusOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => changeStatus(listing.property.id, option)}
                          className="block w-full px-3 py-1.5 text-left text-xs text-foreground/70 hover:bg-brand-light hover:text-brand-dark"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-5 py-4 text-foreground/70">
                {formatNaira(listing.property.pricePerYear)}
              </td>
              <td className="px-5 py-4 text-foreground/70">{listing.views}</td>
              <td className="px-5 py-4 text-foreground/70">{listing.inquiries}</td>
              <td className="px-5 py-4 text-foreground/50">{listing.datePosted}</td>
              <td className="px-5 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/dashboard/listings/${listing.property.id}`}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium text-brand-dark hover:bg-brand-light"
                  >
                    View
                  </Link>
                  <Link
                    href={`/dashboard/listings/${listing.property.id}/edit`}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium text-foreground/60 hover:bg-black/5"
                  >
                    Edit
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
