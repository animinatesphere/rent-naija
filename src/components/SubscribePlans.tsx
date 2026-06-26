"use client";

import { useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { plans, type BillingCycle } from "@/lib/plans";
import { setSubscription } from "@/lib/subscription";
import { formatNaira } from "@/lib/properties";

type Phase = "select" | "processing" | "success";

export default function SubscribePlans() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";

  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const [phase, setPhase] = useState<Phase>("select");
  const [activePlan, setActivePlan] = useState<string | null>(null);

  function handleSubscribe(planId: string) {
    setActivePlan(planId);
    setPhase("processing");
    setTimeout(() => {
      setSubscription(planId, cycle);
      setPhase("success");
      setTimeout(() => router.push(next), 1100);
    }, 1200);
  }

  if (phase !== "select") {
    return <ProcessingState phase={phase} />;
  }

  return (
    <div>
      <div className="mx-auto flex w-fit items-center gap-1 rounded-full bg-brand-light p-1 text-sm font-medium">
        <ToggleButton active={cycle === "monthly"} onClick={() => setCycle("monthly")}>
          Monthly
        </ToggleButton>
        <ToggleButton active={cycle === "yearly"} onClick={() => setCycle("yearly")}>
          Yearly
          <span className="ml-1.5 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold text-white">
            Save ~17%
          </span>
        </ToggleButton>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {plans.map((plan, i) => {
          const price = cycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`relative rounded-2xl border bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl ${
                plan.popular ? "border-brand shadow-lg shadow-brand/10" : "border-black/5"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}

              <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
              <p className="mt-1 text-sm text-foreground/60">{plan.tagline}</p>

              <p className="mt-5">
                <span className="text-3xl font-bold text-foreground">{formatNaira(price)}</span>
                <span className="text-sm text-foreground/50">
                  /{cycle === "monthly" ? "month" : "year"}
                </span>
              </p>

              <ul className="mt-6 space-y-3 text-sm text-foreground/70">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-0.5 text-brand">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSubscribe(plan.id)}
                disabled={activePlan !== null}
                className={`mt-7 w-full rounded-lg py-2.5 text-sm font-semibold transition ${
                  plan.popular
                    ? "bg-brand text-white shadow-md shadow-brand/20 hover:bg-brand-dark"
                    : "border border-brand text-brand-dark hover:bg-brand-light"
                } disabled:cursor-not-allowed disabled:opacity-50`}
              >
                Subscribe Now
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-8 text-center text-xs text-foreground/40">
        Cancel anytime from your dashboard settings. No long-term commitment.
      </p>
    </div>
  );
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center rounded-full px-4 py-2 transition ${
        active ? "bg-white text-brand-dark shadow-sm" : "text-foreground/50"
      }`}
    >
      {children}
    </button>
  );
}

function ProcessingState({ phase }: { phase: Phase }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <AnimatePresence mode="wait">
        {phase === "processing" ? (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="mx-auto h-12 w-12 rounded-full border-4 border-brand-light border-t-brand"
            />
            <p className="mt-5 font-medium text-foreground/70">Setting up your subscription...</p>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-light"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0a7d3f" strokeWidth="3">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </motion.div>
            <p className="mt-5 font-semibold text-foreground">You&apos;re subscribed!</p>
            <p className="mt-1 text-sm text-foreground/50">Redirecting to your dashboard...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
