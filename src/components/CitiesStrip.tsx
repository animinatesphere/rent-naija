const cities = [
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Ibadan",
  "Enugu",
  "Kano",
  "Benin City",
  "Calabar",
  "Uyo",
  "Abeokuta",
];

export default function CitiesStrip() {
  const loop = [...cities, ...cities];

  return (
    <section className="border-y border-black/5 bg-white py-6">
      <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wide text-foreground/40">
        Trusted by tenants and landlords in
      </p>
      <div className="relative overflow-hidden">
        <div className="flex w-max animate-marquee gap-10">
          {loop.map((city, i) => (
            <span
              key={`${city}-${i}`}
              className="text-lg font-semibold text-foreground/30 whitespace-nowrap"
            >
              {city}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
