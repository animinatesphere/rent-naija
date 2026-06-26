import Link from "next/link";
import Topbar from "@/components/dashboard/Topbar";
import Reveal from "@/components/Reveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import StatusBadge from "@/components/dashboard/StatusBadge";
import VerificationBanner from "@/components/dashboard/VerificationBanner";
import ShareStorefrontCard from "@/components/dashboard/ShareStorefrontCard";
import QuickActions from "@/components/dashboard/QuickActions";
import WeeklyViewsChart from "@/components/dashboard/WeeklyViewsChart";
import PlanSummaryCard from "@/components/dashboard/PlanSummaryCard";
import { landlordListings, inquiries, getDashboardStats, landlordProfile } from "@/lib/dashboard";
import { formatNaira } from "@/lib/properties";

export default function DashboardOverviewPage() {
  const stats = getDashboardStats();
  const recentInquiries = inquiries.slice(0, 3);

  return (
    <div>
      <Topbar title="Overview" />

      <div className="space-y-6 p-6">
        <Reveal>
          <p className="text-foreground/60">
            Welcome back, <span className="font-semibold text-foreground">{landlordProfile.name}</span> — here&apos;s how your listings are performing.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <QuickActions />
        </Reveal>

        <VerificationBanner />
        <ShareStorefrontCard />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard delay={0} label="Active Listings" value={stats.activeListings} dark />
          <StatCard delay={0.05} label="Total Views" value={stats.totalViews} />
          <StatCard delay={0.1} label="Inquiries" value={stats.totalInquiries} />
          <StatCard
            delay={0.15}
            label="Est. Annual Earnings"
            value={stats.estimatedEarnings}
            formatted={stats.estimatedEarningsLabel}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal delay={0.1} className="lg:col-span-2">
            <WeeklyViewsChart />
          </Reveal>
          <Reveal delay={0.15}>
            <PlanSummaryCard />
          </Reveal>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-foreground">Your Listings</h2>
                <Link href="/dashboard/listings" className="text-sm font-medium text-brand-dark hover:underline">
                  View all
                </Link>
              </div>

              <div className="mt-4 divide-y divide-black/5">
                {landlordListings.map((listing) => (
                  <Link
                    key={listing.property.id}
                    href={`/dashboard/listings/${listing.property.id}`}
                    className="flex items-center gap-4 py-3 transition hover:bg-black/1"
                  >
                    <div className={`h-12 w-16 shrink-0 rounded-lg bg-linear-to-br ${listing.property.tone}`} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {listing.property.title}
                      </p>
                      <p className="text-xs text-foreground/50">
                        {formatNaira(listing.property.pricePerYear)}/year · {listing.views} views
                      </p>
                    </div>
                    <StatusBadge status={listing.status} />
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-foreground">Recent Inquiries</h2>
                <Link href="/dashboard/messages" className="text-sm font-medium text-brand-dark hover:underline">
                  View all
                </Link>
              </div>

              <div className="mt-4 space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-light text-xs font-semibold text-brand-dark">
                      {inquiry.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{inquiry.tenantName}</p>
                      <p className="truncate text-xs text-foreground/50">{inquiry.message}</p>
                    </div>
                    {inquiry.unread && (
                      <span className="ml-auto mt-1 h-2 w-2 shrink-0 rounded-full bg-brand" />
                    )}
                  </div>
                ))}
              </div>
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
  formatted,
}: {
  label: string;
  value: number;
  delay: number;
  dark?: boolean;
  formatted?: string;
}) {
  return (
    <Reveal delay={delay}>
      <div
        className={`rounded-2xl p-5 ${
          dark ? "bg-linear-to-br from-brand-dark to-brand text-white" : "border border-black/5 bg-white"
        }`}
      >
        <p className={`text-sm ${dark ? "text-white/80" : "text-foreground/50"}`}>{label}</p>
        <p className={`mt-2 text-2xl font-bold ${dark ? "text-white" : "text-foreground"}`}>
          {formatted ?? (
            <AnimatedCounter
              target={value}
              className={dark ? "text-2xl font-bold text-white" : "text-2xl font-bold text-foreground"}
            />
          )}
        </p>
      </div>
    </Reveal>
  );
}
