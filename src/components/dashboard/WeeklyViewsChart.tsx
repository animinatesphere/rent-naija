"use client";

import { motion } from "framer-motion";

const weeklyData = [
  { day: "Mon", views: 42 },
  { day: "Tue", views: 58 },
  { day: "Wed", views: 35 },
  { day: "Thu", views: 71 },
  { day: "Fri", views: 64 },
  { day: "Sat", views: 89 },
  { day: "Sun", views: 53 },
];

export default function WeeklyViewsChart() {
  const max = Math.max(...weeklyData.map((d) => d.views));

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-foreground">Views This Week</h2>
        <span className="text-xs text-foreground/40">Last 7 days</span>
      </div>

      <div className="mt-6 flex items-end gap-2">
        {weeklyData.map((d, i) => (
          <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-28 w-full items-end justify-center">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.views / max) * 100}%` }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: "easeOut" }}
                className="w-7 rounded-t-md bg-linear-to-t from-brand to-emerald-400"
              />
            </div>
            <span className="text-[10px] text-foreground/40">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
