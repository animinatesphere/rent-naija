"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Overview", href: "/admin" },
  { label: "Revenue", href: "/admin/revenue" },
  { label: "Verify", href: "/admin/verifications" },
  { label: "Listings", href: "/admin/listings" },
  { label: "Users", href: "/admin/users" },
];

export default function AdminMobileNav() {
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
