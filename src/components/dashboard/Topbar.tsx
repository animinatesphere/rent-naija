import Link from "next/link";
import { landlordProfile, inquiries } from "@/lib/dashboard";

export default function Topbar({ title }: { title: string }) {
  const unreadCount = inquiries.filter((i) => i.unread).length;

  return (
    <div className="flex items-center justify-between border-b border-black/5 bg-white px-6 py-4">
      <h1 className="text-lg font-bold text-foreground">{title}</h1>

      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/messages"
          className="relative flex h-9 w-9 items-center justify-center rounded-full text-foreground/60 transition hover:bg-brand-light hover:text-brand-dark"
          aria-label="Messages"
        >
          <BellIcon />
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
              {unreadCount}
            </span>
          )}
        </Link>

        <Link href="/dashboard/settings" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-light text-xs font-semibold text-brand-dark">
            {landlordProfile.initials}
          </div>
          <span className="hidden text-sm font-medium text-foreground/80 sm:block">
            {landlordProfile.name}
          </span>
        </Link>
      </div>
    </div>
  );
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
