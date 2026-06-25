"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

const faqs = [
  {
    question: "Is RentNaija free for tenants?",
    answer:
      "Yes. Searching, messaging landlords and booking inspections is completely free for tenants. We only charge a small service fee on completed transactions.",
  },
  {
    question: "How are listings verified?",
    answer:
      "Our field agents physically visit properties marked 'Verified' to confirm they exist, match their photos, and that the lister actually owns or manages them.",
  },
  {
    question: "What if I can't inspect in person?",
    answer:
      "You can request a live video walkthrough with the landlord or agent directly from the listing page before committing to anything.",
  },
  {
    question: "How does secure payment work?",
    answer:
      "Your rent and fees are held in escrow and only released to the landlord after you confirm you've received the keys and moved in.",
  },
  {
    question: "Can I list more than one property?",
    answer:
      "Yes, landlords and agents can list unlimited properties for free. Agencies can also request a verified agency badge.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <Reveal className="text-center">
        <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
        <p className="mx-auto mt-2 max-w-xl text-foreground/60">
          Everything you need to know before you get started.
        </p>
      </Reveal>

      <div className="mt-10 space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <Reveal key={faq.question} delay={i * 0.04}>
              <div className="rounded-xl border border-black/5 bg-white">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-foreground"
                >
                  {faq.question}
                  <span
                    className={`ml-4 shrink-0 text-brand transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <p className="min-h-0 px-5 pb-4 text-sm text-foreground/60">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
