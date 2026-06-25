import Reveal from "@/components/Reveal";

const testimonials = [
  {
    name: "Chidinma O.",
    role: "Tenant, Lekki",
    quote:
      "I found my flat in 3 days without paying a single agent fee. The video tour saved me a trip from Abuja.",
    initials: "CO",
  },
  {
    name: "Tunde A.",
    role: "Landlord, Gwarinpa",
    quote:
      "Listed my duplex on a Friday, had three verified inquiries by Monday. The escrow payment gave me real peace of mind.",
    initials: "TA",
  },
  {
    name: "Blessing E.",
    role: "Tenant, Port Harcourt",
    quote:
      "The instant tenancy agreement meant I didn't need a lawyer just to move into a self-contain. Super smooth.",
    initials: "BE",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <Reveal className="text-center">
        <h2 className="text-3xl font-bold text-foreground">Loved by Renters and Landlords</h2>
        <p className="mx-auto mt-2 max-w-xl text-foreground/60">
          Real stories from people who found a home, or a tenant, through
          RentNaija.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08}>
            <div className="h-full rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <p className="text-foreground/80">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-light text-sm font-semibold text-brand-dark">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-foreground/50">{t.role}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
