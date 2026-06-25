"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";

const tabs = [
  {
    id: "search",
    label: "1. Search",
    heading: "Filter thousands of listings in seconds",
    body: "Type a city, set your budget, and pick a property type. Results update instantly with verified listings only.",
    mock: (
      <div className="space-y-3">
        <div className="h-9 rounded-lg bg-white/90" />
        <div className="flex gap-2">
          <div className="h-7 w-20 rounded-full bg-brand-light" />
          <div className="h-7 w-24 rounded-full bg-brand-light" />
          <div className="h-7 w-16 rounded-full bg-brand-light" />
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg bg-white/90 p-2">
            <div className="h-10 w-14 rounded bg-gradient-to-br from-emerald-400 to-emerald-600" />
            <div className="flex-1 space-y-1">
              <div className="h-2 w-3/4 rounded bg-foreground/15" />
              <div className="h-2 w-1/2 rounded bg-foreground/10" />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "inspect",
    label: "2. Inspect",
    heading: "Book a tour or chat live with the landlord",
    body: "Schedule an in-person visit, or request a live video walkthrough straight from the listing page.",
    mock: (
      <div className="space-y-3">
        <div className="h-28 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600" />
        <div className="flex items-center justify-between rounded-lg bg-white/90 p-3">
          <div className="space-y-1">
            <div className="h-2 w-24 rounded bg-foreground/15" />
            <div className="h-2 w-16 rounded bg-foreground/10" />
          </div>
          <div className="rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white">
            Book Tour
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "pay",
    label: "3. Pay & Move In",
    heading: "Pay securely, get your agreement instantly",
    body: "Funds stay in escrow until you confirm move-in. Your tenancy agreement is generated and sent automatically.",
    mock: (
      <div className="space-y-3">
        <div className="rounded-lg bg-white/90 p-3">
          <div className="h-2 w-20 rounded bg-foreground/10" />
          <div className="mt-2 h-6 w-32 rounded bg-foreground/15" />
        </div>
        <div className="rounded-lg bg-white/90 p-3 text-center">
          <div className="mx-auto h-2 w-28 rounded bg-foreground/10" />
          <div className="mx-auto mt-3 h-9 w-full rounded-lg bg-brand" />
        </div>
      </div>
    ),
  },
];

export default function Demo() {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active)!;

  return (
    <section id="demo" className="bg-brand-light/40 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center">
          <span className="rounded-full bg-brand/10 px-4 py-1 text-sm font-medium text-brand-dark">
            Live Demo
          </span>
          <h2 className="mt-4 text-3xl font-bold text-foreground">
            See RentNaija in Action
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-foreground/60">
            A quick walkthrough of how renters search, inspect and pay — all
            without ever needing a physical agent.
          </p>
        </Reveal>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    active === tab.id
                      ? "bg-brand text-white"
                      : "bg-white text-foreground/60 hover:text-brand"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <h3 className="text-xl font-semibold text-foreground">
                  {current.heading}
                </h3>
                <p className="mt-2 text-foreground/60">{current.body}</p>
              </motion.div>
            </AnimatePresence>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div className="mx-auto max-w-sm rounded-3xl border border-black/5 bg-gradient-to-br from-brand-dark to-brand p-4 shadow-2xl">
              <div className="rounded-2xl bg-white/10 p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                  >
                    {current.mock}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
