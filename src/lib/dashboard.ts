import { featuredProperties, formatNaira, type Property } from "@/lib/properties";

export const landlordProfile = {
  name: "Funke Adeyemi",
  email: "funke.adeyemi@example.com",
  phone: "+234 802 345 6789",
  city: "Lekki, Lagos",
  bio: "Managing well-maintained rental homes across Lagos for over 6 years. I work directly with tenants — no agent middlemen, no hidden fees.",
  businessName: "Adeyemi Properties",
  initials: "FA",
  role: "Property Manager",
  memberSince: "March 2023",
  slug: "funke-adeyemi",
};

export type ListingStatus = "Verified" | "Pending" | "Draft";

export type LandlordListing = {
  property: Property;
  status: ListingStatus;
  views: number;
  inquiries: number;
  datePosted: string;
};

export const landlordListings: LandlordListing[] = [
  { property: featuredProperties[0], status: "Verified", views: 482, inquiries: 12, datePosted: "2026-04-02" },
  { property: featuredProperties[1], status: "Verified", views: 311, inquiries: 7, datePosted: "2026-04-18" },
  { property: featuredProperties[2], status: "Pending", views: 94, inquiries: 2, datePosted: "2026-06-10" },
  { property: featuredProperties[4], status: "Draft", views: 0, inquiries: 0, datePosted: "2026-06-20" },
];

export type Inquiry = {
  id: string;
  tenantName: string;
  initials: string;
  propertyTitle: string;
  message: string;
  date: string;
  unread: boolean;
};

export const inquiries: Inquiry[] = [
  {
    id: "i1",
    tenantName: "Chidinma Okafor",
    initials: "CO",
    propertyTitle: "3-Bedroom Flat, Lekki Phase 1",
    message:
      "Hi, is this still available for viewing this weekend? I'd like to come by on Saturday morning if possible.",
    date: "2026-06-25",
    unread: true,
  },
  {
    id: "i2",
    tenantName: "Tunde Bakare",
    initials: "TB",
    propertyTitle: "Modern Duplex, Gwarinpa",
    message:
      "Good day, does the rent include the BQ or is that priced separately? Also is the agreement fee negotiable?",
    date: "2026-06-24",
    unread: true,
  },
  {
    id: "i3",
    tenantName: "Blessing Eze",
    initials: "BE",
    propertyTitle: "3-Bedroom Flat, Lekki Phase 1",
    message:
      "Thank you for the video tour! I'm interested — can we proceed with the tenancy agreement?",
    date: "2026-06-22",
    unread: false,
  },
  {
    id: "i4",
    tenantName: "Emeka Nwosu",
    initials: "EN",
    propertyTitle: "Self-Contain Studio, Yaba",
    message: "Is parking space included? I have a small car.",
    date: "2026-06-19",
    unread: false,
  },
];

export function getLandlordListingByPropertyId(propertyId: string): LandlordListing | undefined {
  return landlordListings.find((listing) => listing.property.id === propertyId);
}

export function getDashboardStats() {
  const totalViews = landlordListings.reduce((sum, l) => sum + l.views, 0);
  const totalInquiries = landlordListings.reduce((sum, l) => sum + l.inquiries, 0);
  const activeListings = landlordListings.filter((l) => l.status === "Verified").length;
  const estimatedEarnings = landlordListings
    .filter((l) => l.status === "Verified")
    .reduce((sum, l) => sum + l.property.pricePerYear, 0);

  return {
    totalViews,
    totalInquiries,
    activeListings,
    estimatedEarnings,
    estimatedEarningsLabel: formatNaira(estimatedEarnings),
  };
}
