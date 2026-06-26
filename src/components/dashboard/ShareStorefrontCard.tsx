"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { landlordProfile } from "@/lib/dashboard";
import { getSubscription } from "@/lib/subscription";
import { getPlanById } from "@/lib/plans";

export default function ShareStorefrontCard() {
  const [copied, setCopied] = useState(false);
  const [hasStorefront, setHasStorefront] = useState<boolean | null>(null);

  useEffect(() => {
    const subscription = getSubscription();
    const plan = subscription ? getPlanById(subscription.planId) : undefined;
    setHasStorefront(Boolean(plan?.hasStorefront));
  }, []);

  const path = `/storefront/${landlordProfile.slug}`;
  const url = typeof window !== "undefined" ? `${window.location.origin}${path}` : path;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — no-op
    }
  }

  if (hasStorefront === null) return null;

  if (!hasStorefront) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-dashed border-black/15 bg-black/2 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="text-xl">🔒</span>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Storefront not included in your plan
            </p>
            <p className="text-xs text-foreground/50">
              Upgrade to Growth or Agency to get your own shareable storefront page.
            </p>
          </div>
        </div>
        <Link
          href="/subscribe?next=/dashboard"
          className="rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-dark"
        >
          Upgrade Plan
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-black/5 bg-white px-5 py-4">
      <div className="flex items-center gap-3">
        <span className="text-xl">🔗</span>
        <div>
          <p className="text-sm font-semibold text-foreground">Your public storefront</p>
          <p className="max-w-xs truncate text-xs text-foreground/50 sm:max-w-sm">{url}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCopy}
          className="rounded-lg border border-brand px-4 py-2 text-xs font-semibold text-brand-dark transition hover:bg-brand-light"
        >
          {copied ? "Copied!" : "Copy Link"}
        </motion.button>
        <a
          href={path}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-dark"
        >
          View Storefront
        </a>
      </div>
    </div>
  );
}
