import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ListPropertyForm from "@/components/ListPropertyForm";

export default function ListPropertyPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main className="flex-1 bg-brand-light/30 py-12">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <Reveal>
            <span className="rounded-full bg-brand/10 px-4 py-1 text-sm font-medium text-brand-dark">
              For Landlords & Agents
            </span>
            <h1 className="mt-4 text-3xl font-bold text-foreground">List Your Property</h1>
            <p className="mt-2 text-foreground/60">
              It only takes a few minutes. Verified listings get up to 3x more
              inquiries.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 px-6">
          <ListPropertyForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
