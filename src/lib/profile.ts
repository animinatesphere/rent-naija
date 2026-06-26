const STORAGE_KEY = "rentnaija_landlord_profile";

export type LandlordProfileData = {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  city: string;
  bio: string;
};

export function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function getLandlordProfile(): LandlordProfileData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LandlordProfileData) : null;
  } catch {
    return null;
  }
}

export function setLandlordProfile(data: LandlordProfileData): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
