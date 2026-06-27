import { landlordListings, landlordProfile } from "@/lib/dashboard";
import { formatNaira } from "@/lib/properties";
import { plans } from "@/lib/plans";

export type AdminListingStatus = "Pending" | "Verified" | "Rejected";

export type AdminListing = {
  id: string;
  title: string;
  landlordName: string;
  city: string;
  state: string;
  price: number;
  tone: string;
  status: AdminListingStatus;
  submittedDate: string;
  isLive?: boolean;
};

const syntheticPendingListings: AdminListing[] = [
  {
    id: "syn-1",
    title: "2-Bedroom Apartment, Wuse 2",
    landlordName: "Ibrahim Sule",
    city: "Wuse",
    state: "Abuja",
    price: 1800000,
    tone: "from-indigo-500 to-blue-700",
    status: "Pending",
    submittedDate: "2026-06-24",
  },
  {
    id: "syn-2",
    title: "Self-Contain, Surulere",
    landlordName: "Ngozi Eze",
    city: "Surulere",
    state: "Lagos",
    price: 650000,
    tone: "from-pink-500 to-rose-600",
    status: "Pending",
    submittedDate: "2026-06-23",
  },
  {
    id: "syn-3",
    title: "4-Bedroom Duplex, GRA",
    landlordName: "Chuka Obi",
    city: "Port Harcourt",
    state: "Rivers",
    price: 4200000,
    tone: "from-amber-500 to-orange-600",
    status: "Pending",
    submittedDate: "2026-06-21",
  },
];

export function getAdminListings(): AdminListing[] {
  const livePending: AdminListing[] = landlordListings
    .filter((l) => l.status === "Pending")
    .map((l) => ({
      id: l.property.id,
      title: l.property.title,
      landlordName: landlordProfile.name,
      city: l.property.city,
      state: l.property.state,
      price: l.property.pricePerYear,
      tone: l.property.tone,
      status: "Pending" as const,
      submittedDate: l.datePosted,
      isLive: true,
    }));

  return [...livePending, ...syntheticPendingListings];
}

export type AdminKycSubmission = {
  id: string;
  landlordName: string;
  idType: string;
  idNumber: string;
  submittedDate: string;
  isLive?: boolean;
};

export const syntheticKycSubmissions: AdminKycSubmission[] = [
  {
    id: "syn-k1",
    landlordName: "Ibrahim Sule",
    idType: "NIN",
    idNumber: "•••• •••• 4821",
    submittedDate: "2026-06-25",
  },
  {
    id: "syn-k2",
    landlordName: "Ngozi Eze",
    idType: "International Passport",
    idNumber: "A0••••••2",
    submittedDate: "2026-06-22",
  },
];

export function getPlatformStats() {
  const totalListings = 342 + getAdminListings().filter((l) => l.status === "Pending").length;
  const pendingVerifications = syntheticKycSubmissions.length;
  const monthlyVolume = 18400000;

  return {
    totalLandlords: 127,
    totalTenants: 4830,
    totalListings,
    pendingVerifications,
    monthlyVolumeLabel: formatNaira(monthlyVolume),
  };
}

export const recentActivity = [
  { id: "a1", text: "Ibrahim Sule submitted a new listing for review", time: "2 hours ago" },
  { id: "a2", text: "Blessing Eze paid for the Growth plan", time: "5 hours ago" },
  { id: "a3", text: "Ngozi Eze submitted KYC documents", time: "1 day ago" },
  { id: "a4", text: "Chuka Obi listed '4-Bedroom Duplex, GRA'", time: "2 days ago" },
  { id: "a5", text: "Tunde Bakare's listing was verified", time: "3 days ago" },
];

const subscriberCounts: Record<string, number> = {
  starter: 64,
  growth: 51,
  agency: 12,
};

export function getRevenueBreakdown() {
  const byPlan = plans.map((plan) => {
    const subscribers = subscriberCounts[plan.id] ?? 0;
    return {
      planId: plan.id,
      planName: plan.name,
      subscribers,
      mrr: subscribers * plan.monthlyPrice,
    };
  });

  const subscriptionMrr = byPlan.reduce((sum, p) => sum + p.mrr, 0);
  const commissionRevenue = 368000;
  const escrowHeld = 2150000;
  const totalMonthlyRevenue = subscriptionMrr + commissionRevenue;

  return {
    byPlan,
    subscriptionMrr,
    commissionRevenue,
    escrowHeld,
    totalMonthlyRevenue,
    subscriptionMrrLabel: formatNaira(subscriptionMrr),
    commissionRevenueLabel: formatNaira(commissionRevenue),
    escrowHeldLabel: formatNaira(escrowHeld),
    totalMonthlyRevenueLabel: formatNaira(totalMonthlyRevenue),
  };
}

export const revenueTrend = [
  { month: "Jan", revenue: 980000 },
  { month: "Feb", revenue: 1120000 },
  { month: "Mar", revenue: 1240000 },
  { month: "Apr", revenue: 1390000 },
  { month: "May", revenue: 1610000 },
  { month: "Jun", revenue: 1873000 },
];

export type Transaction = {
  id: string;
  name: string;
  type: "Subscription" | "Escrow Payment" | "Commission";
  amount: number;
  date: string;
  status: "Completed" | "Held" | "Pending";
};

export const recentTransactions: Transaction[] = [
  { id: "t1", name: "Funke Adeyemi", type: "Subscription", amount: 15000, date: "2026-06-26", status: "Completed" },
  { id: "t2", name: "Tunde Bakare", type: "Escrow Payment", amount: 5200000, date: "2026-06-25", status: "Held" },
  { id: "t3", name: "Blessing Eze", type: "Subscription", amount: 15000, date: "2026-06-25", status: "Completed" },
  { id: "t4", name: "RentNaija Platform", type: "Commission", amount: 184000, date: "2026-06-24", status: "Completed" },
  { id: "t5", name: "Chidinma Okafor", type: "Escrow Payment", amount: 3500000, date: "2026-06-22", status: "Pending" },
];

export type AdminLandlord = {
  id: string;
  name: string;
  planId: string | null;
  listingsCount: number;
  joinDate: string;
  isLive?: boolean;
};

const syntheticLandlords: AdminLandlord[] = [
  { id: "l1", name: "Ibrahim Sule", planId: "starter", listingsCount: 2, joinDate: "2026-01-14" },
  { id: "l2", name: "Ngozi Eze", planId: "growth", listingsCount: 6, joinDate: "2025-11-02" },
  { id: "l3", name: "Chuka Obi", planId: "agency", listingsCount: 18, joinDate: "2025-08-19" },
  { id: "l4", name: "Tunde Bakare", planId: "growth", listingsCount: 4, joinDate: "2026-03-07" },
];

export function getLandlordsList(): AdminLandlord[] {
  const live: AdminLandlord = {
    id: "live",
    name: landlordProfile.name,
    planId: null,
    listingsCount: landlordListings.length,
    joinDate: "2023-03-01",
    isLive: true,
  };

  return [live, ...syntheticLandlords];
}

export type AdminTenant = {
  id: string;
  name: string;
  savedHomes: number;
  inquiries: number;
  joinDate: string;
};

export const tenantsList: AdminTenant[] = [
  { id: "tn1", name: "Chidinma Okafor", savedHomes: 5, inquiries: 3, joinDate: "2026-02-11" },
  { id: "tn2", name: "Emeka Nwosu", savedHomes: 2, inquiries: 1, joinDate: "2026-04-29" },
  { id: "tn3", name: "Blessing Eze", savedHomes: 7, inquiries: 4, joinDate: "2025-12-18" },
];
