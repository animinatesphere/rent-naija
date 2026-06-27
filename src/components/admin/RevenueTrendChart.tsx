"use client";

import { motion } from "framer-motion";
import { revenueTrend } from "@/lib/admin";

function formatCompactNaira(amount: number): string {
  if (amount >= 1_000_000) return `₦${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `₦${(amount / 1_000).toFixed(0)}K`;
  return `₦${amount}`;
}

export default function RevenueTrendChart() {
  const max = Math.max(...revenueTrend.map((d) => d.revenue));

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-foreground">Revenue Trend</h2>
        <span className="text-xs text-foreground/40">Last 6 months</span>
      </div>

      <div className="mt-6 flex items-end gap-1.5 sm:gap-3">
        {revenueTrend.map((d, i) => (
          <div key={d.month} className="flex flex-1 flex-col items-center gap-1.5 sm:gap-2">
            <span className="text-[9px] text-foreground/40 sm:text-[10px]">
              {formatCompactNaira(d.revenue)}
            </span>
            <div className="flex h-24 w-full items-end justify-center sm:h-32">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.revenue / max) * 100}%` }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: "easeOut" }}
                className="w-5 rounded-t-md bg-linear-to-t from-brand to-emerald-400 sm:w-8"
              />
            </div>
            <span className="text-[9px] text-foreground/40 sm:text-[10px]">{d.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
