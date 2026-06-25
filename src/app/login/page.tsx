import Link from "next/link";
import Logo from "@/components/Logo";
import AuthSidePanel from "@/components/AuthSidePanel";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <AuthSidePanel
        heading="Welcome back to RentNaija"
        body="Pick up where you left off — saved searches, ongoing chats with landlords, and your tenancy agreements, all in one place."
      />

      <div className="flex w-full flex-col items-center justify-center bg-brand-light/40 px-6 py-12 lg:w-1/2">
        <Link href="/" className="mb-8 lg:hidden">
          <Logo />
        </Link>

        <LoginForm />
      </div>
    </div>
  );
}
