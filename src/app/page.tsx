import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CitiesStrip from "@/components/CitiesStrip";
import FeaturedListings from "@/components/FeaturedListings";
import WhyChooseUs from "@/components/WhyChooseUs";
import Demo from "@/components/Demo";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { featuredProperties, filterProperties } from "@/lib/properties";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const type = typeof params.type === "string" ? params.type : "any";
  const price = typeof params.price === "string" ? params.price : "any";

  const isFiltered = Boolean(q || (type && type !== "any") || (price && price !== "any"));
  const properties = isFiltered
    ? filterProperties(featuredProperties, { q, type, price })
    : featuredProperties;

  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero defaultQuery={q} defaultType={type} defaultPrice={price} />
        <CitiesStrip />
        <FeaturedListings properties={properties} isFiltered={isFiltered} />
        <WhyChooseUs />
        <Demo />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
