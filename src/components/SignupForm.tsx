"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import { setLandlordProfile } from "@/lib/profile";

const container: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function SignupForm() {
  const router = useRouter();
  const [role, setRole] = useState<"tenant" | "landlord">("tenant");
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (role === "landlord") {
      setLandlordProfile({ fullName, email, businessName, phone, city, bio });
      router.push("/subscribe?next=/dashboard");
    } else {
      router.push("/");
    }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative w-full max-w-sm rounded-2xl border border-black/5 bg-white p-8 shadow-xl shadow-brand/5"
    >
      <motion.div
        className="absolute -inset-px -z-10 rounded-2xl bg-linear-to-br from-brand/30 via-transparent to-emerald-300/30 opacity-0 blur-md"
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.h1 variants={item} className="text-2xl font-bold text-foreground">
        Create your account
      </motion.h1>
      <motion.p variants={item} className="mt-1 text-sm text-foreground/60">
        Find a home, or list one — free to join.
      </motion.p>

      <motion.div
        variants={item}
        className="relative mt-5 grid grid-cols-2 gap-1 rounded-lg bg-brand-light p-1 text-sm font-medium"
      >
        <motion.div
          className="absolute inset-y-1 w-[calc(50%-4px)] rounded-md bg-white shadow-sm"
          animate={{ x: role === "tenant" ? 0 : "calc(100% + 8px)" }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
        <button
          type="button"
          onClick={() => setRole("tenant")}
          className={`relative z-10 rounded-md py-2 transition-colors ${
            role === "tenant" ? "text-brand-dark" : "text-foreground/60"
          }`}
        >
          I&apos;m a Tenant
        </button>
        <button
          type="button"
          onClick={() => setRole("landlord")}
          className={`relative z-10 rounded-md py-2 transition-colors ${
            role === "landlord" ? "text-brand-dark" : "text-foreground/60"
          }`}
        >
          I&apos;m a Landlord
        </button>
      </motion.div>

      {role === "landlord" && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700"
        >
          Landlord accounts require an active subscription to list properties
          and access the dashboard. You&apos;ll choose a plan after signing up.
        </motion.p>
      )}

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <motion.div variants={item}>
          <label className="text-sm font-medium text-foreground/80">Full Name</label>
          <motion.input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Ada Obi"
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
            animate={{
              borderColor: focused === "name" ? "var(--brand)" : "rgba(0,0,0,0.1)",
              boxShadow:
                focused === "name" ? "0 0 0 4px rgba(10,125,63,0.12)" : "0 0 0 0 transparent",
            }}
            transition={{ duration: 0.2 }}
            className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm outline-none"
          />
        </motion.div>

        <motion.div variants={item}>
          <label className="text-sm font-medium text-foreground/80">Email</label>
          <motion.input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
            animate={{
              borderColor: focused === "email" ? "var(--brand)" : "rgba(0,0,0,0.1)",
              boxShadow:
                focused === "email" ? "0 0 0 4px rgba(10,125,63,0.12)" : "0 0 0 0 transparent",
            }}
            transition={{ duration: 0.2 }}
            className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm outline-none"
          />
        </motion.div>

        {role === "landlord" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-4 overflow-hidden"
          >
            <div>
              <label className="text-sm font-medium text-foreground/80">
                Business / Agency Name
              </label>
              <input
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Adeyemi Properties"
                className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-foreground/80">Phone</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234..."
                  className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground/80">City / Area</label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Lekki, Lagos"
                  className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground/80">Short Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={2}
                placeholder="Tell tenants a bit about yourself or your agency..."
                className="mt-1 w-full resize-none rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand"
              />
            </div>
          </motion.div>
        )}

        <motion.div variants={item}>
          <label className="text-sm font-medium text-foreground/80">Password</label>
          <div className="relative">
            <motion.input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused(null)}
              animate={{
                borderColor: focused === "password" ? "var(--brand)" : "rgba(0,0,0,0.1)",
                boxShadow:
                  focused === "password"
                    ? "0 0 0 4px rgba(10,125,63,0.12)"
                    : "0 0 0 0 transparent",
              }}
              transition={{ duration: 0.2 }}
              className="mt-1 w-full rounded-lg border px-4 py-2.5 pr-11 text-sm outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 mt-0.5 -translate-y-1/2 text-foreground/40 transition hover:text-brand"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </motion.div>

        <motion.button
          variants={item}
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-lg bg-brand py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/20 transition hover:bg-brand-dark"
        >
          Create Account
        </motion.button>
      </form>

      <motion.div variants={item} className="mt-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-black/5" />
        <span className="text-xs text-foreground/40">OR</span>
        <span className="h-px flex-1 bg-black/5" />
      </motion.div>

      <motion.div variants={item} className="mt-4 grid grid-cols-2 gap-3">
        <SocialButton label="Google" icon={<GoogleIcon />} />
        <SocialButton label="Facebook" icon={<FacebookIcon />} />
      </motion.div>

      <motion.p variants={item} className="mt-6 text-center text-sm text-foreground/60">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-brand-dark hover:underline">
          Log in
        </Link>
      </motion.p>
    </motion.div>
  );
}

function SocialButton({ label, icon }: { label: string; icon: ReactNode }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03, backgroundColor: "rgba(0,0,0,0.02)" }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center justify-center gap-2 rounded-lg border border-black/10 py-2 text-sm font-medium text-foreground/70"
    >
      {icon}
      {label}
    </motion.button>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a18.5 18.5 0 0 1 4.22-5.06M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 7 11 7a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.69-2.26 1.1-3.71 1.1-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.14a6.6 6.6 0 0 1 0-4.28V7.02H2.18a11 11 0 0 0 0 9.96l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.9 10.9 0 0 0 12 1a11 11 0 0 0-9.82 6.02l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5 3.66 9.13 8.44 9.94v-7.03H7.9v-2.91h2.54V9.86c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.81 8.44-4.94 8.44-9.94z" />
    </svg>
  );
}
