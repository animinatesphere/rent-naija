"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getSubscription } from "@/lib/subscription";

export default function SubscriptionGate({
  children,
  redirectTo = "/subscribe?next=/dashboard",
}: {
  children: ReactNode;
  redirectTo?: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<"checking" | "subscribed" | "blocked">("checking");

  useEffect(() => {
    const subscription = getSubscription();
    if (subscription) {
      setStatus("subscribed");
    } else {
      setStatus("blocked");
      router.replace(redirectTo);
    }
  }, [router, redirectTo]);

  if (status !== "subscribed") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-light border-t-brand" />
      </div>
    );
  }

  return <>{children}</>;
}
