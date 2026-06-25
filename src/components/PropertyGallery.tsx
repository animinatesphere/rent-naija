"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PropertyGallery({
  tone,
  verified,
  type,
}: {
  tone: string;
  verified: boolean;
  type: string;
}) {
  const [active, setActive] = useState(0);
  const shots = [tone, "from-zinc-700 to-zinc-900", "from-amber-300 to-orange-500", tone];

  return (
    <div>
      <div className="relative h-72 overflow-hidden rounded-2xl sm:h-96">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className={`absolute inset-0 bg-linear-to-br ${shots[active]}`}
          />
        </AnimatePresence>

        {verified && (
          <span className="absolute right-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-dark">
            ✓ Verified
          </span>
        )}
        <span className="absolute left-4 top-4 z-10 rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white">
          {type}
        </span>
      </div>

      <div className="mt-3 flex gap-3">
        {shots.map((shot, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`h-16 w-20 shrink-0 rounded-lg bg-linear-to-br ${shot} ${
              active === i ? "ring-2 ring-brand ring-offset-2" : "opacity-70"
            }`}
            aria-label={`View photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
