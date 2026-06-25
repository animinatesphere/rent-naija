import Reveal from "@/components/Reveal";

const features = [
  {
    icon: "✅",
    title: "Verified Listings",
    description:
      "Every verified property is physically inspected by our team before it goes live — no fake listings.",
  },
  {
    icon: "💬",
    title: "Direct Chat",
    description:
      "Message landlords and agents directly in-app. No middlemen, no hidden agent fees.",
  },
  {
    icon: "🔒",
    title: "Secure Payments",
    description:
      "Pay rent and agreement fees through escrow — funds only release after you move in.",
  },
  {
    icon: "📄",
    title: "Instant Agreements",
    description:
      "Get a digital tenancy agreement generated and signed in minutes, not weeks.",
  },
  {
    icon: "🎥",
    title: "Video Tours",
    description:
      "Can't inspect in person? Request a live video walkthrough before you commit.",
  },
  {
    icon: "📍",
    title: "Map Search",
    description:
      "Search by proximity to work, school or transport links across 38 Nigerian cities.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <Reveal className="text-center">
        <h2 className="text-3xl font-bold text-foreground">Why Renters Choose RentNaija</h2>
        <p className="mx-auto mt-2 max-w-xl text-foreground/60">
          Built to remove the stress, scams and surprise fees from renting in
          Nigeria.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <Reveal key={feature.title} delay={i * 0.06}>
            <div className="h-full rounded-2xl border border-black/5 p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <span className="text-3xl">{feature.icon}</span>
              <h3 className="mt-4 font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm text-foreground/60">{feature.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
