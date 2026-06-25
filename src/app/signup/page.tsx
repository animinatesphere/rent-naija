import Link from "next/link";
import Logo from "@/components/Logo";
import AuthSidePanel from "@/components/AuthSidePanel";
import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen">
      <AuthSidePanel
        heading="Join thousands renting smarter"
        body="Create a free account to save listings, message landlords directly, and pay securely through escrow — or list your own property in minutes."
      />

      <div className="flex w-full flex-col items-center justify-center bg-brand-light/40 px-6 py-12 lg:w-1/2">
        <Link href="/" className="mb-8 lg:hidden">
          <Logo />
        </Link>

        <SignupForm />
      </div>
    </div>
  );
}
