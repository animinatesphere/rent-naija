"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { getPlanById } from "@/lib/plans";
import { getSubscription, clearSubscription, type SubscriptionRecord } from "@/lib/subscription";
import { formatNaira } from "@/lib/properties";

export default function BillingPanel() {
  const router = useRouter();
  const [subscription, setSubscription] = useState<SubscriptionRecord | null>(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    setSubscription(getSubscription());
  }, []);

  if (!subscription) return null;

  const plan = getPlanById(subscription.planId);
  if (!plan) return null;

  const price = subscription.billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
  const subscribedDate = new Date(subscription.subscribedAt);
  const renewalDate = new Date(subscribedDate);
  renewalDate.setMonth(
    renewalDate.getMonth() + (subscription.billingCycle === "monthly" ? 1 : 12)
  );

  function handleCancel() {
    clearSubscription();
    setCancelling(false);
    router.push("/subscribe?next=/dashboard");
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-brand bg-brand-light/40 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-dark">
              Current Plan
            </p>
            <h2 className="mt-1 text-2xl font-bold text-foreground">{plan.name}</h2>
            <p className="mt-1 text-sm text-foreground/60">{plan.tagline}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">{formatNaira(price)}</p>
            <p className="text-xs text-foreground/50">
              per {subscription.billingCycle === "monthly" ? "month" : "year"}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-black/5 pt-4 text-sm">
          <p className="text-foreground/60">
            Next renewal:{" "}
            <span className="font-medium text-foreground">
              {renewalDate.toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </p>
          <div className="flex gap-3">
            <Link
              href="/subscribe?next=/dashboard/billing"
              className="rounded-lg border border-brand px-4 py-2 text-xs font-semibold text-brand-dark transition hover:bg-white"
            >
              Change Plan
            </Link>
            <button
              type="button"
              onClick={() => setCancelling(true)}
              className="rounded-lg px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
            >
              Cancel Subscription
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-black/5 bg-white p-6">
        <h3 className="font-semibold text-foreground">What&apos;s included</h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-foreground/70">
              <span className="mt-0.5 text-brand">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-black/5 bg-white p-6">
        <h3 className="font-semibold text-foreground">Billing History</h3>
        <div className="mt-4 divide-y divide-black/5 text-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 py-3">
            <div>
              <p className="font-medium text-foreground">{plan.name} Plan</p>
              <p className="text-xs text-foreground/50">
                {subscribedDate.toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Paid
            </span>
            <p className="shrink-0 font-medium text-foreground">{formatNaira(price)}</p>
          </div>
        </div>
      </div>

      {cancelling && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm rounded-2xl bg-white p-6 text-center"
          >
            <h3 className="font-bold text-foreground">Cancel your subscription?</h3>
            <p className="mt-2 text-sm text-foreground/60">
              You&apos;ll lose access to your dashboard and active listings will
              be unpublished at the end of your billing period.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setCancelling(false)}
                className="flex-1 rounded-lg border border-black/10 py-2.5 text-sm font-semibold text-foreground/70 hover:bg-black/5"
              >
                Keep Plan
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                Cancel It
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
