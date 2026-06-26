import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function CTASection() {
  return (
    <section id="list-property" className="mx-auto max-w-7xl px-6 py-20">
      <Reveal className="rounded-3xl bg-linear-to-br from-brand-dark to-brand px-8 py-14 text-center text-white sm:px-16">
        <h2 className="text-3xl font-bold">Are you a landlord or agent?</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/85">
          List your property on RentNaija for free and reach thousands of
          verified tenants searching every day.
        </p>
        <Link
          href="/list-property"
          className="mt-8 inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-dark transition hover:bg-white/90"
        >
          List Your Property
        </Link>
      </Reveal>
    </section>
  );
}
