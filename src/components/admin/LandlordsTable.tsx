"use client";

import { useEffect, useState } from "react";
import { getLandlordsList, type AdminLandlord } from "@/lib/admin";
import { getSubscription } from "@/lib/subscription";
import { getPlanById } from "@/lib/plans";

export default function LandlordsTable() {
  const [landlords, setLandlords] = useState<AdminLandlord[]>([]);

  useEffect(() => {
    const list = getLandlordsList();
    const subscription = getSubscription();
    setLandlords(
      list.map((l) =>
        l.isLive ? { ...l, planId: subscription?.planId ?? null } : l
      )
    );
  }, []);

  return (
    <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-black/5 bg-black/2 text-xs uppercase text-foreground/40">
          <tr>
            <th className="px-5 py-3">Landlord</th>
            <th className="px-5 py-3">Plan</th>
            <th className="px-5 py-3">Listings</th>
            <th className="px-5 py-3">Joined</th>
          </tr>
        </thead>
        <tbody>
          {landlords.map((landlord) => {
            const plan = landlord.planId ? getPlanById(landlord.planId) : undefined;
            return (
              <tr key={landlord.id} className="border-b border-black/5 last:border-0">
                <td className="px-5 py-3 font-medium text-foreground">{landlord.name}</td>
                <td className="px-5 py-3">
                  {plan ? (
                    <span className="rounded-full bg-brand-light px-2.5 py-1 text-xs font-semibold text-brand-dark">
                      {plan.name}
                    </span>
                  ) : (
                    <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-500">
                      No plan
                    </span>
                  )}
                </td>
                <td className="px-5 py-3 text-foreground/70">{landlord.listingsCount}</td>
                <td className="px-5 py-3 text-foreground/50">{landlord.joinDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
