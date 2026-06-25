"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Property } from "@/lib/properties";

export default function ContactLandlordCard({ landlord }: { landlord: Property["landlord"] }) {
  const [sent, setSent] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-light text-sm font-semibold text-brand-dark">
          {landlord.initials}
        </div>
        <div>
          <p className="font-semibold text-foreground">{landlord.name}</p>
          <p className="text-xs text-foreground/50">{landlord.role}</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-foreground/50">
        Typically responds {landlord.responseTime}
      </p>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-5 w-full rounded-lg bg-brand py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/20 transition hover:bg-brand-dark"
      >
        Book an Inspection
      </motion.button>

      <motion.button
        onClick={() => setSent(true)}
        disabled={sent}
        whileHover={!sent ? { scale: 1.02 } : undefined}
        whileTap={!sent ? { scale: 0.98 } : undefined}
        className="mt-3 w-full rounded-lg border border-brand px-4 py-2.5 text-sm font-semibold text-brand-dark transition hover:bg-brand-light disabled:cursor-default disabled:border-emerald-300 disabled:text-emerald-600"
      >
        {sent ? "Message Sent ✓" : "Message Landlord"}
      </motion.button>

      <p className="mt-4 text-center text-xs text-foreground/40">
        🔒 Payments are held in escrow until you confirm move-in.
      </p>
    </motion.div>
  );
}
