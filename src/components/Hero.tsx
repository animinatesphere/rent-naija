"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import AnimatedCounter from "@/components/AnimatedCounter";
import { priceRangeOptions } from "@/lib/properties";

const propertyTypes = ["Apartment", "Duplex", "Bungalow", "Self-Contain", "Mini Flat"];

export default function Hero({
  defaultQuery = "",
  defaultType = "any",
  defaultPrice = "any",
}: {
  defaultQuery?: string;
  defaultType?: string;
  defaultPrice?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-emerald-600 text-white">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute -left-20 -top-20 h-72 w-72 animate-blob rounded-full bg-emerald-300/20 blur-3xl" />
      <div className="absolute -right-10 bottom-0 h-80 w-80 animate-blob rounded-full bg-yellow-300/15 blur-3xl [animation-delay:4s]" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 text-center sm:py-32">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium"
        >
          🇳🇬 Verified rentals across Nigeria
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl"
        >
          Find your next home, no agent stress.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-4 max-w-xl text-lg text-white/85"
        >
          Browse verified apartments, duplexes and flats in Lagos, Abuja, Port
          Harcourt and beyond — straight from landlords and trusted agents.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          action="/"
          className="mx-auto mt-10 grid max-w-3xl gap-3 rounded-2xl bg-white p-3 text-left shadow-2xl sm:grid-cols-[1.5fr_1fr_1fr_auto] sm:gap-2"
        >
          <input
            type="text"
            name="q"
            defaultValue={defaultQuery}
            placeholder="City or neighborhood, e.g. Lekki"
            className="rounded-xl px-4 py-3 text-sm text-foreground outline-none placeholder:text-foreground/40 sm:border-r sm:border-black/5"
          />
          <select
            name="type"
            defaultValue={defaultType}
            className="rounded-xl px-3 py-3 text-sm text-foreground/80 outline-none sm:border-r sm:border-black/5"
          >
            <option value="any">Any Type</option>
            {propertyTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select
            name="price"
            defaultValue={defaultPrice}
            className="rounded-xl px-3 py-3 text-sm text-foreground/80 outline-none"
          >
            {priceRangeOptions.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Search
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-white/80"
        >
          <Stat>
            <AnimatedCounter target={12400} suffix="+" /> Active listings
          </Stat>
          <Stat>
            <AnimatedCounter target={38} /> Cities covered
          </Stat>
          <Stat>
            <AnimatedCounter target={9000} suffix="+" /> Happy tenants
          </Stat>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ children }: { children: ReactNode }) {
  return <div className="flex items-baseline gap-2">{children}</div>;
}
