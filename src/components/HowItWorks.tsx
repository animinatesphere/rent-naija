import Reveal from "@/components/Reveal";

const steps = [
  {
    number: "1",
    title: "Search & Filter",
    description:
      "Browse verified listings by city, budget and property type — no guesswork.",
  },
  {
    number: "2",
    title: "Inspect & Verify",
    description:
      "Book an inspection or video tour, and chat directly with the landlord or agent.",
  },
  {
    number: "3",
    title: "Move In",
    description:
      "Pay securely through RentNaija and get your tenancy agreement instantly.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-brand-light/60 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center">
          <h2 className="text-3xl font-bold text-foreground">How RentNaija Works</h2>
          <p className="mx-auto mt-2 max-w-xl text-foreground/60">
            Three simple steps between you and your next home.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.1} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand text-lg font-bold text-white">
                {step.number}
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-foreground/60">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
