import type { BillingCycle } from "@/lib/plans";

const STORAGE_KEY = "rentnaija_subscription";

export type SubscriptionRecord = {
  planId: string;
  billingCycle: BillingCycle;
  subscribedAt: string;
};

export function getSubscription(): SubscriptionRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SubscriptionRecord) : null;
  } catch {
    return null;
  }
}

export function setSubscription(planId: string, billingCycle: BillingCycle): void {
  if (typeof window === "undefined") return;
  const record: SubscriptionRecord = {
    planId,
    billingCycle,
    subscribedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}

export function clearSubscription(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
