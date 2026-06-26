import Link from "next/link";
import Topbar from "@/components/dashboard/Topbar";
import Reveal from "@/components/Reveal";
import ListingsTable from "@/components/dashboard/ListingsTable";
import { landlordListings } from "@/lib/dashboard";

export default function DashboardListingsPage() {
  return (
    <div>
      <Topbar title="My Listings" />

      <div className="p-6">
        <Reveal className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-foreground/60">
            {landlordListings.length} properties · manage status, edit details, or add a new one.
          </p>
          <Link
            href="/list-property"
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            + New Listing
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="mt-6">
          <ListingsTable listings={landlordListings} />
        </Reveal>
      </div>
    </div>
  );
}
