const FAVORITES_KEY = "rentnaija_favorites";
const ACTIVITY_KEY = "rentnaija_tenant_activity";
const PROFILE_KEY = "rentnaija_tenant_profile";

export type TenantProfile = {
  fullName: string;
  email: string;
  phone: string;
};

export type InquiryRecord = {
  id: string;
  propertyId: string;
  propertyTitle: string;
  type: "message" | "inspection";
  date: string;
};

function readArray<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

export function getFavorites(): string[] {
  return readArray<string>(FAVORITES_KEY);
}

export function isFavorite(propertyId: string): boolean {
  return getFavorites().includes(propertyId);
}

export function toggleFavorite(propertyId: string): boolean {
  if (typeof window === "undefined") return false;
  const current = getFavorites();
  const next = current.includes(propertyId)
    ? current.filter((id) => id !== propertyId)
    : [...current, propertyId];
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  return next.includes(propertyId);
}

export function getInquiryHistory(): InquiryRecord[] {
  return readArray<InquiryRecord>(ACTIVITY_KEY).sort((a, b) => b.date.localeCompare(a.date));
}

export function addInquiryRecord(record: Omit<InquiryRecord, "id" | "date">): void {
  if (typeof window === "undefined") return;
  const current = readArray<InquiryRecord>(ACTIVITY_KEY);
  const entry: InquiryRecord = {
    ...record,
    id: `${record.propertyId}-${Date.now()}`,
    date: new Date().toISOString(),
  };
  window.localStorage.setItem(ACTIVITY_KEY, JSON.stringify([...current, entry]));
}

export function getTenantProfile(): TenantProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    return raw ? (JSON.parse(raw) as TenantProfile) : null;
  } catch {
    return null;
  }
}

export function setTenantProfile(profile: TenantProfile): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}
