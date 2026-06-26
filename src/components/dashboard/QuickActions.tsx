import Link from "next/link";
import { landlordProfile } from "@/lib/dashboard";

export default function QuickActions() {
  const actions = [
    { label: "New Listing", href: "/list-property", icon: "🏠" },
    { label: "View Storefront", href: `/storefront/${landlordProfile.slug}`, icon: "🔗" },
    { label: "Verify Identity", href: "/dashboard/verification", icon: "🪪" },
    { label: "Billing", href: "/dashboard/billing", icon: "💳" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {actions.map((action) => (
        <Link
          key={action.label}
          href={action.href}
          className="flex flex-col items-center gap-2 rounded-2xl border border-black/5 bg-white px-4 py-5 text-center transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
        >
          <span className="text-2xl">{action.icon}</span>
          <span className="text-xs font-medium text-foreground/70">{action.label}</span>
        </Link>
      ))}
    </div>
  );
}
