"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getKycRecord, submitKyc, type KycRecord } from "@/lib/kyc";

const idTypes = ["NIN", "International Passport", "Driver's License", "Voter's Card"];

export default function KycPanel() {
  const [record, setRecord] = useState<KycRecord | null>(null);
  const [fullName, setFullName] = useState("");
  const [idType, setIdType] = useState(idTypes[0]);
  const [idNumber, setIdNumber] = useState("");
  const [idDocName, setIdDocName] = useState("");

  useEffect(() => {
    setRecord(getKycRecord());
  }, []);

  useEffect(() => {
    if (record?.status !== "pending") return;
    const interval = setInterval(() => setRecord(getKycRecord()), 2000);
    return () => clearInterval(interval);
  }, [record?.status]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submitKyc({ fullName, idType, idNumber });
    setRecord(getKycRecord());
  }

  const status = record?.status ?? "unverified";

  return (
    <div className="mx-auto max-w-2xl">
      <AnimatePresence mode="wait">
        {status === "verified" && (
          <motion.div
            key="verified"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="3">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </motion.div>
            <h2 className="mt-4 text-lg font-bold text-emerald-800">Identity Verified</h2>
            <p className="mt-1 text-sm text-emerald-700/80">
              Your account now shows a Verified badge to tenants on your listings
              and storefront.
            </p>
          </motion.div>
        )}

        {status === "pending" && (
          <motion.div
            key="pending"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              className="mx-auto h-10 w-10 rounded-full border-4 border-amber-200 border-t-amber-500"
            />
            <h2 className="mt-4 text-lg font-bold text-amber-800">Verification Under Review</h2>
            <p className="mt-1 text-sm text-amber-700/80">
              We&apos;re reviewing your documents. This usually takes 24–48 hours
              — we&apos;ll notify you by email once it&apos;s done.
            </p>
          </motion.div>
        )}

        {status === "unverified" && (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-black/5 bg-white p-8"
          >
            <div>
              <h2 className="text-lg font-bold text-foreground">Verify Your Identity</h2>
              <p className="mt-1 text-sm text-foreground/60">
                Verified landlords get a trust badge and rank higher in search.
                Takes about 2 minutes.
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground/80">Full Legal Name</label>
              <input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="As it appears on your ID"
                className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-foreground/80">ID Type</label>
                <select
                  value={idType}
                  onChange={(e) => setIdType(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand"
                >
                  {idTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground/80">ID Number</label>
                <input
                  required
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground/80">Upload ID Document</label>
              <label className="mt-1 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-black/15 bg-brand-light/30 px-6 py-8 text-center transition hover:border-brand">
                <span className="text-2xl">🪪</span>
                <span className="mt-2 text-sm font-medium text-foreground/70">
                  {idDocName || "Click to upload a clear photo or scan"}
                </span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => setIdDocName(e.target.files?.[0]?.name ?? "")}
                />
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full rounded-lg bg-brand py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/20 transition hover:bg-brand-dark"
            >
              Submit for Verification
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
