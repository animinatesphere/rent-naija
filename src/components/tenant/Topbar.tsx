"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getTenantProfile } from "@/lib/tenant";
import { getInitials } from "@/lib/profile";

export default function TenantTopbar({ title }: { title: string }) {
  const [initials, setInitials] = useState("?");

  useEffect(() => {
    const profile = getTenantProfile();
    if (profile?.fullName) setInitials(getInitials(profile.fullName));
  }, []);

  return (
    <div className="flex items-center justify-between border-b border-black/5 bg-white px-6 py-4">
      <h1 className="text-lg font-bold text-foreground">{title}</h1>
      <Link href="/tenant/settings" className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-light text-xs font-semibold text-brand-dark">
          {initials}
        </div>
      </Link>
    </div>
  );
}
