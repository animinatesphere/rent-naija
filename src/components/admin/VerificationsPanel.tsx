"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getKycRecord, approveKyc, rejectKyc } from "@/lib/kyc";
import { syntheticKycSubmissions, type AdminKycSubmission } from "@/lib/admin";
import { landlordProfile } from "@/lib/dashboard";

export default function VerificationsPanel() {
  const [submissions, setSubmissions] = useState<AdminKycSubmission[]>([]);
  const [decided, setDecided] = useState<Record<string, "approved" | "rejected">>({});

  useEffect(() => {
    const live = getKycRecord();
    const liveEntry: AdminKycSubmission[] =
      live?.status === "pending"
        ? [
            {
              id: "live",
              landlordName: landlordProfile.name,
              idType: live.idType,
              idNumber: live.idNumber,
              submittedDate: live.submittedAt.slice(0, 10),
              isLive: true,
            },
          ]
        : [];

    setSubmissions([...liveEntry, ...syntheticKycSubmissions]);
  }, []);

  function approve(submission: AdminKycSubmission) {
    if (submission.isLive) approveKyc();
    setDecided((prev) => ({ ...prev, [submission.id]: "approved" }));
  }

  function reject(submission: AdminKycSubmission) {
    if (submission.isLive) rejectKyc();
    setDecided((prev) => ({ ...prev, [submission.id]: "rejected" }));
  }

  const pending = submissions.filter((s) => !decided[s.id]);

  if (submissions.length === 0) {
    return (
      <div className="flex h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-light border-t-brand" />
      </div>
    );
  }

  if (pending.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-black/10 bg-white py-16 text-center">
        <p className="text-3xl">✅</p>
        <p className="mt-3 font-semibold text-foreground">All caught up</p>
        <p className="mt-1 text-sm text-foreground/60">No pending verification submissions.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {pending.map((submission) => (
          <motion.div
            key={submission.id}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20, height: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-black/5 bg-white px-5 py-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-light text-xs font-semibold text-brand-dark">
                🪪
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{submission.landlordName}</p>
                <p className="text-xs text-foreground/50">
                  {submission.idType} · {submission.idNumber}
                </p>
                <p className="text-xs text-foreground/40">
                  Submitted {submission.submittedDate}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => reject(submission)}
                className="rounded-lg border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => approve(submission)}
                className="rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-dark"
              >
                Approve
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
