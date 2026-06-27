const STORAGE_KEY = "rentnaija_kyc";
const REVIEW_DURATION_MS = 8000;

export type KycStatus = "unverified" | "pending" | "verified";

export type KycRecord = {
  status: KycStatus;
  fullName: string;
  idType: string;
  idNumber: string;
  submittedAt: string;
};

export function getKycRecord(): KycRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const record = JSON.parse(raw) as KycRecord;

    if (record.status === "pending") {
      const elapsed = Date.now() - new Date(record.submittedAt).getTime();
      if (elapsed > REVIEW_DURATION_MS) {
        const updated: KycRecord = { ...record, status: "verified" };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      }
    }

    return record;
  } catch {
    return null;
  }
}

export function submitKyc(data: { fullName: string; idType: string; idNumber: string }): void {
  if (typeof window === "undefined") return;
  const record: KycRecord = {
    ...data,
    status: "pending",
    submittedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}

export function approveKyc(): void {
  if (typeof window === "undefined") return;
  const record = getKycRecord();
  if (!record) return;
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...record, status: "verified" })
  );
}

export function rejectKyc(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
