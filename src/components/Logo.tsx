export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="10" fill="#0a7d3f" />
      <path
        d="M20 8L9 16.5V31a1.5 1.5 0 0 0 1.5 1.5H16v-9.25a1.25 1.25 0 0 1 1.25-1.25h5.5A1.25 1.25 0 0 1 24 23.25V32.5h5.5A1.5 1.5 0 0 0 31 31V16.5L20 8Z"
        fill="white"
      />
      <path
        d="M20 8 9 16.5h2.4L20 9.9l8.6 6.6H31L20 8Z"
        fill="#fcd34d"
      />
    </svg>
  );
}

export default function Logo({
  className = "",
  markClassName = "h-9 w-9",
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={`flex items-center gap-2 text-xl font-bold text-brand-dark ${className}`}>
      <LogoMark className={markClassName} />
      RentNaija
    </span>
  );
}
