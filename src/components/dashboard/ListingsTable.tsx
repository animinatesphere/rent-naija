"use client";

import { useState } from "react";
import Link from "next/link";
import type { LandlordListing, ListingStatus } from "@/lib/dashboard";
import { formatNaira } from "@/lib/properties";
import StatusBadge from "@/components/dashboard/StatusBadge";
import OccupancyBadge from "@/components/dashboard/OccupancyBadge";

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

  function toggleOccupancy(propertyId: string) {
    setRows((prev) =>
      prev.map((row) =>
        row.property.id === propertyId ? { ...row, occupied: !row.occupied } : row
      )
    );
  }

  function StatusPicker({ listing }: { listing: LandlordListing }) {
    return (
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
    );
  }

  return (
    <>
      {/* Mobile: stacked cards */}
      <div className="space-y-3 sm:hidden">
        {rows.map((listing) => (
          <div key={listing.property.id} className="rounded-2xl border border-black/5 bg-white p-4">
            <div className="flex items-center gap-3">
              <div
                className={`h-12 w-16 shrink-0 rounded-lg bg-linear-to-br ${listing.property.tone}`}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-foreground">{listing.property.title}</p>
                <p className="text-xs text-foreground/50">
                  {listing.property.city}, {listing.property.state}
                </p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <StatusPicker listing={listing} />
              <button type="button" onClick={() => toggleOccupancy(listing.property.id)}>
                <OccupancyBadge occupied={listing.occupied} />
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between text-sm text-foreground/70">
              <span className="font-semibold text-foreground">
                {formatNaira(listing.property.pricePerYear)}
              </span>
              <span className="text-xs text-foreground/50">
                {listing.views} views · {listing.inquiries} inquiries
              </span>
            </div>
            <p className="mt-1 text-xs text-foreground/40">Posted {listing.datePosted}</p>

            <div className="mt-3 flex gap-2 border-t border-black/5 pt-3">
              <Link
                href={`/dashboard/listings/${listing.property.id}`}
                className="flex-1 rounded-lg bg-brand-light py-2 text-center text-xs font-medium text-brand-dark"
              >
                View
              </Link>
              <Link
                href={`/dashboard/listings/${listing.property.id}/edit`}
                className="flex-1 rounded-lg bg-black/5 py-2 text-center text-xs font-medium text-foreground/70"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop/tablet: full table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-black/5 bg-white sm:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-black/5 bg-black/2 text-xs uppercase text-foreground/40">
            <tr>
              <th className="px-5 py-3">Property</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Occupancy</th>
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
                  <StatusPicker listing={listing} />
                </td>
                <td className="px-5 py-4">
                  <button type="button" onClick={() => toggleOccupancy(listing.property.id)}>
                    <OccupancyBadge occupied={listing.occupied} />
                  </button>
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
    </>
  );
}
