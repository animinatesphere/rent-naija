import AdminTopbar from "@/components/admin/Topbar";
import Reveal from "@/components/Reveal";
import RevenueTrendChart from "@/components/admin/RevenueTrendChart";
import { getRevenueBreakdown, recentTransactions } from "@/lib/admin";
import { formatNaira } from "@/lib/properties";

const statusStyles: Record<string, string> = {
  Completed: "bg-emerald-100 text-emerald-700",
  Held: "bg-blue-100 text-blue-700",
  Pending: "bg-amber-100 text-amber-700",
};

export default function AdminRevenuePage() {
  const revenue = getRevenueBreakdown();

  return (
    <div>
      <AdminTopbar title="Revenue" />

      <div className="space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Monthly Revenue"
            value={revenue.totalMonthlyRevenueLabel}
            dark
            delay={0}
          />
          <StatCard label="Subscription MRR" value={revenue.subscriptionMrrLabel} delay={0.05} />
          <StatCard
            label="Commission Revenue"
            value={revenue.commissionRevenueLabel}
            delay={0.1}
          />
          <StatCard label="Escrow Held" value={revenue.escrowHeldLabel} delay={0.15} />
        </div>

        <Reveal delay={0.1}>
          <RevenueTrendChart />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal delay={0.1} className="lg:col-span-1">
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <h2 className="font-semibold text-foreground">Revenue by Plan</h2>
              <div className="mt-4 space-y-4">
                {revenue.byPlan.map((plan) => (
                  <div key={plan.planId} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{plan.planName}</p>
                      <p className="text-xs text-foreground/50">{plan.subscribers} subscribers</p>
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      {formatNaira(plan.mrr)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-2">
            <div className="rounded-2xl border border-black/5 bg-white">
              <div className="px-6 pt-6">
                <h2 className="font-semibold text-foreground">Recent Transactions</h2>
              </div>
              <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-black/5 bg-black/2 text-xs uppercase text-foreground/40">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">Amount</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-black/5 last:border-0">
                      <td className="px-6 py-3 text-foreground/80">{tx.name}</td>
                      <td className="px-6 py-3 text-foreground/60">{tx.type}</td>
                      <td className="px-6 py-3 font-medium text-foreground">
                        {formatNaira(tx.amount)}
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[tx.status]}`}
                        >
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
}: {
  label: string;
  value: string;
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
        <p className={`mt-2 text-xl font-bold ${dark ? "text-white" : "text-foreground"}`}>
          {value}
        </p>
      </div>
    </Reveal>
  );
}
