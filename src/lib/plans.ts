export type BillingCycle = "monthly" | "yearly";

export type Plan = {
  id: "starter" | "growth" | "agency";
  name: string;
  tagline: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular?: boolean;
  hasStorefront: boolean;
  features: string[];
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For landlords listing one or two properties",
    monthlyPrice: 5000,
    yearlyPrice: 50000,
    hasStorefront: false,
    features: [
      "Up to 2 active listings",
      "Standard verification",
      "Email support",
      "Tenant messaging",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For landlords and agents managing multiple units",
    monthlyPrice: 15000,
    yearlyPrice: 150000,
    popular: true,
    hasStorefront: true,
    features: [
      "Up to 10 active listings",
      "Priority verification",
      "Featured placement in search",
      "Your own shareable storefront page",
      "Performance analytics",
      "Priority support",
    ],
  },
  {
    id: "agency",
    name: "Agency",
    tagline: "For agencies managing a large portfolio",
    monthlyPrice: 35000,
    yearlyPrice: 350000,
    hasStorefront: true,
    features: [
      "Unlimited active listings",
      "Priority verification",
      "Dedicated account manager",
      "Verified agency badge",
      "Your own shareable storefront page",
      "Performance analytics",
    ],
  },
];

export function getPlanById(id: string): Plan | undefined {
  return plans.find((p) => p.id === id);
}
