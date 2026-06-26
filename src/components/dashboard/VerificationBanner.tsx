"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getKycRecord, type KycStatus } from "@/lib/kyc";

export default function VerificationBanner() {
  const [status, setStatus] = useState<KycStatus | null>(null);

  useEffect(() => {
    setStatus(getKycRecord()?.status ?? "unverified");
  }, []);

  if (!status || status === "verified") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4"
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">🪪</span>
        <div>
          <p className="text-sm font-semibold text-amber-800">
            {status === "pending" ? "Verification under review" : "Verify your identity"}
          </p>
          <p className="text-xs text-amber-700/80">
            {status === "pending"
              ? "We're reviewing your documents — usually 24–48 hours."
              : "Verified landlords get a trust badge and rank higher in search."}
          </p>
        </div>
      </div>
      {status === "unverified" && (
        <Link
          href="/dashboard/verification"
          className="rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-amber-600"
        >
          Verify Now
        </Link>
      )}
    </motion.div>
  );
}
