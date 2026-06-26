"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSubscription } from "@/lib/subscription";
import { getPlanById, type Plan } from "@/lib/plans";
import { formatNaira } from "@/lib/properties";

export default function PlanSummaryCard() {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [cycle, setCycle] = useState<"monthly" | "yearly">("monthly");

  useEffect(() => {
    const subscription = getSubscription();
    if (subscription) {
      setPlan(getPlanById(subscription.planId) ?? null);
      setCycle(subscription.billingCycle);
    }
  }, []);

  if (!plan) return null;

  const price = cycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-foreground/40">
        Current Plan
      </p>
      <h2 className="mt-1 text-lg font-bold text-foreground">{plan.name}</h2>
      <p className="mt-1 text-sm text-foreground/60">
        {formatNaira(price)}/{cycle === "monthly" ? "mo" : "yr"}
      </p>

      <ul className="mt-4 space-y-2 text-xs text-foreground/60">
        {plan.features.slice(0, 3).map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <span className="text-brand">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <Link
        href="/dashboard/billing"
        className="mt-5 block rounded-lg border border-brand py-2 text-center text-xs font-semibold text-brand-dark transition hover:bg-brand-light"
      >
        Manage Plan
      </Link>
    </div>
  );
}
