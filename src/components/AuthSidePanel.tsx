import Link from "next/link";
import { LogoMark } from "@/components/Logo";

export default function AuthSidePanel({
  heading,
  body,
}: {
  heading: string;
  body: string;
}) {
  return (
    <div className="relative hidden overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-emerald-600 p-10 text-white lg:flex lg:w-1/2 lg:flex-col lg:justify-between">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute -left-16 -top-16 h-72 w-72 animate-blob rounded-full bg-emerald-300/20 blur-3xl" />
      <div className="absolute -right-10 bottom-10 h-80 w-80 animate-blob rounded-full bg-yellow-300/15 blur-3xl [animation-delay:4s]" />

      <Link href="/" className="relative z-10 flex items-center gap-2 text-lg font-bold">
        <LogoMark className="h-9 w-9" />
        RentNaija
      </Link>

      <div className="relative z-10">
        <h2 className="max-w-sm text-3xl font-bold leading-tight">{heading}</h2>
        <p className="mt-3 max-w-sm text-white/85">{body}</p>

        <div className="mt-8 flex flex-col gap-3">
          <HouseCard
            title="3-Bedroom Flat, Lekki"
            tag="Verified"
            gradient="from-emerald-400 to-emerald-600"
          />
          <HouseCard
            title="Studio Apartment, Wuse"
            tag="New"
            gradient="from-sky-400 to-blue-600"
            className="translate-x-6"
          />
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-8 text-sm text-white/80">
        <Stat value="12,400+" label="Listings" />
        <Stat value="38" label="Cities" />
        <Stat value="9,000+" label="Tenants" />
      </div>
    </div>
  );
}

function HouseCard({
  title,
  tag,
  gradient,
  className = "",
}: {
  title: string;
  tag: string;
  gradient: string;
  className?: string;
}) {
  return (
    <div
      className={`flex max-w-xs items-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur-sm ${className}`}
    >
      <div className={`h-12 w-16 shrink-0 rounded-lg bg-gradient-to-br ${gradient}`} />
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <span className="text-xs text-white/70">{tag}</span>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-xs text-white/70">{label}</p>
    </div>
  );
}
