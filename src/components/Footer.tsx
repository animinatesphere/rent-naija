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
            links={["Find a Home", "List Your Property", "How It Works"]}
          />
          <FooterColumn
            title="Company"
            links={["About Us", "Careers", "Contact"]}
          />
          <FooterColumn
            title="Legal"
            links={["Terms of Service", "Privacy Policy"]}
          />
        </div>

        <div className="mt-10 border-t border-black/5 pt-6 text-center text-sm text-foreground/50">
          © {new Date().getFullYear()} RentNaija. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="font-semibold text-foreground">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-foreground/60">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="hover:text-brand">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
