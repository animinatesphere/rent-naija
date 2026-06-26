import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SubscribePlans from "@/components/SubscribePlans";

export default function SubscribePage() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main className="flex-1 bg-brand-light/30 py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <span className="rounded-full bg-brand/10 px-4 py-1 text-sm font-medium text-brand-dark">
              For Landlords & Agents
            </span>
            <h1 className="mt-4 text-3xl font-bold text-foreground">
              Choose Your Plan
            </h1>
            <p className="mt-2 text-foreground/60">
              An active subscription is required to list properties and access
              your landlord dashboard.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-10 max-w-5xl px-6">
          <Suspense fallback={null}>
            <SubscribePlans />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
