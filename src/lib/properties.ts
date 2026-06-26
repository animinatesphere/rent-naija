export type Property = {
  id: string;
  title: string;
  city: string;
  state: string;
  address: string;
  pricePerYear: number;
  bedrooms: number;
  bathrooms: number;
  type: "Apartment" | "Duplex" | "Bungalow" | "Self-Contain" | "Mini Flat";
  verified: boolean;
  tone: string;
  description: string;
  amenities: string[];
  landlord: {
    name: string;
    initials: string;
    role: string;
    responseTime: string;
  };
};

export const featuredProperties: Property[] = [
  {
    id: "1",
    title: "3-Bedroom Flat, Lekki Phase 1",
    city: "Lekki",
    state: "Lagos",
    address: "12 Admiralty Way, Lekki Phase 1, Lagos",
    pricePerYear: 3500000,
    bedrooms: 3,
    bathrooms: 3,
    type: "Apartment",
    verified: true,
    tone: "from-emerald-500 to-emerald-700",
    description:
      "A bright, fully tiled 3-bedroom flat on the first floor of a serviced building. Each room is en-suite with built-in wardrobes, a fitted kitchen, and 24-hour power backup. Walking distance to Admiralty Mall and the Lekki-Epe expressway.",
    amenities: [
      "24/7 Electricity",
      "Borehole Water",
      "Fitted Kitchen",
      "Gated Estate",
      "Parking Space",
      "CCTV",
    ],
    landlord: {
      name: "Mrs. Funke Adeyemi",
      initials: "FA",
      role: "Property Manager",
      responseTime: "within 1 hour",
    },
  },
  {
    id: "2",
    title: "Modern Duplex, Gwarinpa",
    city: "Gwarinpa",
    state: "Abuja",
    address: "7th Avenue, Gwarinpa Estate, Abuja",
    pricePerYear: 5200000,
    bedrooms: 4,
    bathrooms: 5,
    type: "Duplex",
    verified: true,
    tone: "from-amber-500 to-orange-600",
    description:
      "Spacious 4-bedroom detached duplex with a private compound, BQ, and ample parking for 4 cars. Newly renovated with modern fittings, a large family lounge, and a fitted kitchen with island.",
    amenities: [
      "Private Compound",
      "BQ (Boys' Quarters)",
      "Inverter System",
      "Fitted Kitchen",
      "4-Car Parking",
      "Family Lounge",
    ],
    landlord: {
      name: "Engr. Tunde Bakare",
      initials: "TB",
      role: "Landlord",
      responseTime: "within 3 hours",
    },
  },
  {
    id: "3",
    title: "Self-Contain Studio, Yaba",
    city: "Yaba",
    state: "Lagos",
    address: "Herbert Macaulay Way, Yaba, Lagos",
    pricePerYear: 900000,
    bedrooms: 1,
    bathrooms: 1,
    type: "Self-Contain",
    verified: false,
    tone: "from-sky-500 to-blue-700",
    description:
      "Compact and affordable self-contain unit, ideal for a young professional or student. Close to UNILAG and major tech hubs in Yaba. Shared compound with good security.",
    amenities: ["Prepaid Meter", "Tiled Floors", "Shared Compound", "Security Guard"],
    landlord: {
      name: "Mr. Emeka Okafor",
      initials: "EO",
      role: "Agent",
      responseTime: "within 6 hours",
    },
  },
  {
    id: "4",
    title: "Mini Flat, GRA Phase 2",
    city: "Port Harcourt",
    state: "Rivers",
    address: "Olu Obasanjo Road, GRA Phase 2, Port Harcourt",
    pricePerYear: 1200000,
    bedrooms: 2,
    bathrooms: 2,
    type: "Mini Flat",
    verified: true,
    tone: "from-fuchsia-500 to-purple-700",
    description:
      "Cozy 2-bedroom mini flat in a quiet, secure neighborhood. Recently repainted with new tiles throughout. Close to top schools and the Port Harcourt mall.",
    amenities: ["24/7 Electricity", "Borehole Water", "Secure Estate", "Parking Space"],
    landlord: {
      name: "Mrs. Ibinabo Wonodi",
      initials: "IW",
      role: "Landlord",
      responseTime: "within 2 hours",
    },
  },
  {
    id: "5",
    title: "Bungalow with Garden, Independence Layout",
    city: "Enugu",
    state: "Enugu",
    address: "Independence Layout, Enugu",
    pricePerYear: 1600000,
    bedrooms: 3,
    bathrooms: 2,
    type: "Bungalow",
    verified: true,
    tone: "from-rose-500 to-red-600",
    description:
      "Charming 3-bedroom bungalow with a private garden and large compound, perfect for a family. Located in a calm, established neighborhood with easy access to the city center.",
    amenities: ["Private Garden", "Large Compound", "Borehole Water", "Garage"],
    landlord: {
      name: "Chief Obiora Nnamdi",
      initials: "ON",
      role: "Landlord",
      responseTime: "within 4 hours",
    },
  },
  {
    id: "6",
    title: "2-Bedroom Apartment, Bodija",
    city: "Ibadan",
    state: "Oyo",
    address: "Awolowo Avenue, Bodija, Ibadan",
    pricePerYear: 1100000,
    bedrooms: 2,
    bathrooms: 2,
    type: "Apartment",
    verified: false,
    tone: "from-teal-500 to-cyan-700",
    description:
      "Well-maintained 2-bedroom flat in the heart of Bodija, close to the market and major roads. Features a fitted kitchen and ample natural lighting.",
    amenities: ["Fitted Kitchen", "Tiled Floors", "Parking Space", "Prepaid Meter"],
    landlord: {
      name: "Mrs. Yetunde Alabi",
      initials: "YA",
      role: "Agent",
      responseTime: "within 5 hours",
    },
  },
];

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function getPropertyById(id: string): Property | undefined {
  return featuredProperties.find((property) => property.id === id);
}

export const priceRangeOptions = [
  { value: "any", label: "Any Price" },
  { value: "under-1m", label: "Under ₦1m" },
  { value: "1m-3m", label: "₦1m - ₦3m" },
  { value: "3m-5m", label: "₦3m - ₦5m" },
  { value: "5m-plus", label: "₦5m+" },
] as const;

export type PriceRangeValue = (typeof priceRangeOptions)[number]["value"];

function matchesPriceRange(price: number, range: string): boolean {
  switch (range) {
    case "under-1m":
      return price < 1_000_000;
    case "1m-3m":
      return price >= 1_000_000 && price <= 3_000_000;
    case "3m-5m":
      return price > 3_000_000 && price <= 5_000_000;
    case "5m-plus":
      return price > 5_000_000;
    default:
      return true;
  }
}

export function filterProperties(
  properties: Property[],
  filters: { q?: string; type?: string; price?: string }
): Property[] {
  const q = filters.q?.trim().toLowerCase();
  const type = filters.type?.trim();
  const price = filters.price?.trim();

  return properties.filter((property) => {
    const matchesQuery =
      !q ||
      property.city.toLowerCase().includes(q) ||
      property.state.toLowerCase().includes(q) ||
      property.title.toLowerCase().includes(q);

    const matchesType = !type || type === "any" || property.type === type;
    const matchesPrice = !price || matchesPriceRange(property.pricePerYear, price);

    return matchesQuery && matchesType && matchesPrice;
  });
}
