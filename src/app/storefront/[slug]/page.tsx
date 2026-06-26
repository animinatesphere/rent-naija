import Link from "next/link";
import { notFound } from "next/navigation";
import Logo from "@/components/Logo";
import StorefrontContent from "@/components/StorefrontContent";
import { landlordListings, landlordProfile } from "@/lib/dashboard";

export async function generateStaticParams() {
  return [{ slug: landlordProfile.slug }];
}

export default async function StorefrontPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug !== landlordProfile.slug) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-black/5 bg-white py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6">
          <Link href="/">
            <Logo markClassName="h-7 w-7" />
          </Link>
          <span className="text-xs text-foreground/40">Powered by RentNaija</span>
        </div>
      </header>

      <StorefrontContent
        fallback={{
          name: landlordProfile.name,
          businessName: landlordProfile.businessName,
          phone: landlordProfile.phone,
          city: landlordProfile.city,
          bio: landlordProfile.bio,
          initials: landlordProfile.initials,
          role: landlordProfile.role,
          memberSince: landlordProfile.memberSince,
        }}
        listings={landlordListings}
      />

      <footer className="border-t border-black/5 bg-white py-6 text-center text-sm text-foreground/50">
        Want a storefront like this?{" "}
        <Link href="/list-property" className="font-medium text-brand-dark hover:underline">
          List your property on RentNaija
        </Link>
      </footer>
    </div>
  );
}
