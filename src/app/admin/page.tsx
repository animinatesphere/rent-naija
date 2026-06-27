import Link from "next/link";
import AdminTopbar from "@/components/admin/Topbar";
import Reveal from "@/components/Reveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { getPlatformStats, recentActivity } from "@/lib/admin";

export default function AdminOverviewPage() {
  const stats = getPlatformStats();

  return (
    <div>
      <AdminTopbar title="Platform Overview" />

      <div className="space-y-6 p-6">
        <Reveal>
          <p className="text-foreground/60">
            A snapshot of activity across RentNaija right now.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard delay={0} label="Landlords" value={stats.totalLandlords} dark />
          <StatCard delay={0.05} label="Tenants" value={stats.totalTenants} />
          <StatCard delay={0.1} label="Total Listings" value={stats.totalListings} />
          <StatCard
            delay={0.15}
            label="Pending Verifications"
            value={stats.pendingVerifications}
          />
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-black/5 bg-white p-6">
            <p className="text-sm text-foreground/50">Monthly Transaction Volume</p>
            <p className="mt-1 text-3xl font-bold text-foreground">{stats.monthlyVolumeLabel}</p>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <h2 className="font-semibold text-foreground">Recent Activity</h2>
              <div className="mt-4 divide-y divide-black/5">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start justify-between gap-4 py-3">
                    <p className="text-sm text-foreground/70">{activity.text}</p>
                    <span className="shrink-0 text-xs text-foreground/40">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="space-y-3">
              <Link
                href="/admin/verifications"
                className="block rounded-2xl border border-black/5 bg-white p-5 transition hover:border-brand hover:shadow-md"
              >
                <p className="font-semibold text-foreground">Review Verifications</p>
                <p className="mt-1 text-sm text-foreground/50">
                  {stats.pendingVerifications} landlord submissions waiting
                </p>
              </Link>
              <Link
                href="/admin/listings"
                className="block rounded-2xl border border-black/5 bg-white p-5 transition hover:border-brand hover:shadow-md"
              >
                <p className="font-semibold text-foreground">Moderate Listings</p>
                <p className="mt-1 text-sm text-foreground/50">
                  Approve or reject newly submitted properties
                </p>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  delay,
  dark = false,
}: {
  label: string;
  value: number;
  delay: number;
  dark?: boolean;
}) {
  return (
    <Reveal delay={delay}>
      <div
        className={`rounded-2xl p-5 ${
          dark ? "bg-linear-to-br from-brand-dark to-brand text-white" : "border border-black/5 bg-white"
        }`}
      >
        <p className={`text-sm ${dark ? "text-white/80" : "text-foreground/50"}`}>{label}</p>
        <p className="mt-2 text-2xl font-bold">
          <AnimatedCounter
            target={value}
            className={dark ? "text-2xl font-bold text-white" : "text-2xl font-bold text-foreground"}
          />
        </p>
      </div>
    </Reveal>
  );
}
