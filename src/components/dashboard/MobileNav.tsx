"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Overview", href: "/dashboard" },
  { label: "Listings", href: "/dashboard/listings" },
  { label: "Messages", href: "/dashboard/messages" },
  { label: "Billing", href: "/dashboard/billing" },
  { label: "Settings", href: "/dashboard/settings" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-black/5 bg-white lg:hidden">
      {navItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-1 py-3 text-center text-xs font-medium ${
              active ? "text-brand-dark" : "text-foreground/50"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
