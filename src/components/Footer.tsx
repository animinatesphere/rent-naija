import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo markClassName="h-7 w-7" />
            <p className="mt-3 text-sm text-foreground/60">
              Nigeria&apos;s trusted platform for finding and listing rental
              homes.
            </p>
          </div>

          <FooterColumn
            title="Explore"
            links={[
              { label: "Find a Home", href: "/#listings" },
              { label: "List Your Property", href: "/list-property" },
              { label: "How It Works", href: "/#how-it-works" },
              { label: "Landlord Dashboard", href: "/dashboard" },
            ]}
          />
          <FooterColumn
            title="Company"
            links={[
              { label: "About Us", href: "#" },
              { label: "Careers", href: "#" },
              { label: "Contact", href: "#" },
            ]}
          />
          <FooterColumn
            title="Legal"
            links={[
              { label: "Terms of Service", href: "#" },
              { label: "Privacy Policy", href: "#" },
            ]}
          />
        </div>

        <div className="mt-10 border-t border-black/5 pt-6 text-center text-sm text-foreground/50">
          © {new Date().getFullYear()} RentNaija. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="font-semibold text-foreground">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-foreground/60">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="hover:text-brand">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
