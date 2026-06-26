import type { ListingStatus } from "@/lib/dashboard";

const styles: Record<ListingStatus, string> = {
  Verified: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Draft: "bg-zinc-100 text-zinc-600",
};

export default function StatusBadge({ status }: { status: ListingStatus }) {
  return (
    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}
