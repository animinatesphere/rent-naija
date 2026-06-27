"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getInquiryHistory, type InquiryRecord } from "@/lib/tenant";

export default function InquiryHistoryPanel() {
  const [records, setRecords] = useState<InquiryRecord[] | null>(null);

  useEffect(() => {
    setRecords(getInquiryHistory());
  }, []);

  if (records === null) {
    return (
      <div className="flex h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-light border-t-brand" />
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-black/10 bg-white py-16 text-center">
        <p className="text-3xl">💬</p>
        <p className="mt-3 font-semibold text-foreground">No inquiries yet</p>
        <p className="mt-1 text-sm text-foreground/60">
          Message a landlord or book an inspection from any listing — it&apos;ll show up here.
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
    <div className="overflow-hidden rounded-2xl border border-black/5 bg-white">
      <ul className="divide-y divide-black/5">
        {records.map((record) => (
          <li key={record.id} className="flex items-center gap-4 px-5 py-4">
            <span className="text-xl">{record.type === "inspection" ? "📅" : "💬"}</span>
            <div className="min-w-0 flex-1">
              <Link
                href={`/listings/${record.propertyId}`}
                className="truncate text-sm font-medium text-foreground hover:text-brand-dark"
              >
                {record.propertyTitle}
              </Link>
              <p className="text-xs text-foreground/50">
                {record.type === "inspection" ? "Inspection requested" : "Message sent"} ·{" "}
                {new Date(record.date).toLocaleDateString("en-NG", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
