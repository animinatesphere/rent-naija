"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTenantProfile, setTenantProfile } from "@/lib/tenant";
import { getInitials } from "@/lib/profile";

export default function TenantProfileForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const profile = getTenantProfile();
    if (profile) {
      setFullName(profile.fullName);
      setEmail(profile.email);
      setPhone(profile.phone);
    }
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTenantProfile({ fullName, email, phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-black/5 bg-white p-8">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-light text-lg font-semibold text-brand-dark">
          {getInitials(fullName || "Tenant")}
        </div>
        <div>
          <p className="font-semibold text-foreground">{fullName || "Your Name"}</p>
          <p className="text-sm text-foreground/50">Tenant Account</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-foreground/80">Full Name</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground/80">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground/80">Phone Number</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+234..."
            className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand"
          />
        </div>

        <div className="flex items-center justify-between rounded-lg bg-brand-light/40 px-4 py-3">
          <div>
            <p className="text-sm font-medium text-foreground">Email notifications</p>
            <p className="text-xs text-foreground/50">Get notified when a landlord replies</p>
          </div>
          <input type="checkbox" defaultChecked className="h-5 w-5 accent-brand" />
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Save Changes
          </motion.button>
          <AnimatePresence>
            {saved && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium text-emerald-600"
              >
                Saved ✓
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}
