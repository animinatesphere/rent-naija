import Link from "next/link";
import Topbar from "@/components/dashboard/Topbar";
import Reveal from "@/components/Reveal";
import VerificationBanner from "@/components/dashboard/VerificationBanner";
import ProfileForm from "@/components/dashboard/ProfileForm";

export default function DashboardSettingsPage() {
  return (
    <div>
      <Topbar title="Settings" />

      <div className="space-y-6 p-6">
        <div className="mx-auto max-w-2xl">
          <VerificationBanner />
        </div>

        <Reveal className="mx-auto max-w-2xl rounded-2xl border border-brand bg-brand-light/40 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-brand-dark">Manage your subscription</p>
              <p className="text-xs text-foreground/60">
                View your plan, billing history, or change your plan anytime.
              </p>
            </div>
            <Link
              href="/dashboard/billing"
              className="rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-dark"
            >
              View Billing
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <ProfileForm />
        </Reveal>
      </div>
    </div>
  );
}
