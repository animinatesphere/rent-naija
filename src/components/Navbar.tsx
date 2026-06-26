"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Logo from "@/components/Logo";

const navLinks = [
  { label: "Find a Home", href: "#listings" },
  { label: "Demo", href: "#demo" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "List Your Property", href: "/list-property" },
];

const menuVariants: Variants = {
  hidden: { height: 0, opacity: 0 },
  show: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut", staggerChildren: 0.05, delayChildren: 0.05 },
  },
  exit: { height: 0, opacity: 0, transition: { duration: 0.25, ease: "easeIn" } },
};

const linkVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.25, ease: "easeOut" } },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/80 md:flex">
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <a key={link.label} href={link.href} className="transition hover:text-brand">
                {link.label}
              </a>
            ) : (
              <Link key={link.label} href={link.href} className="transition hover:text-brand">
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="text-sm font-medium text-foreground/80 transition hover:text-brand"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Sign Up
          </Link>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 md:hidden"
        >
          <span className="relative block h-3.5 w-4">
            <motion.span
              animate={{ y: open ? 6 : 0, rotate: open ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 top-0 h-0.5 w-4 bg-foreground"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 top-[6px] h-0.5 w-4 bg-foreground"
            />
            <motion.span
              animate={{ y: open ? -6 : 0, rotate: open ? -45 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 top-[12px] h-0.5 w-4 bg-foreground"
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={menuVariants}
            className="overflow-hidden border-t border-black/5 bg-white md:hidden"
          >
            <div className="px-6 py-4">
              <nav className="flex flex-col gap-3 text-sm font-medium text-foreground/80">
                {navLinks.map((link) =>
                  link.href.startsWith("#") ? (
                    <motion.a
                      key={link.label}
                      variants={linkVariants}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="py-1"
                    >
                      {link.label}
                    </motion.a>
                  ) : (
                    <motion.div key={link.label} variants={linkVariants}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block py-1"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                )}
                <motion.hr variants={linkVariants} className="border-black/5" />
                <motion.div variants={linkVariants}>
                  <Link href="/login" onClick={() => setOpen(false)} className="block py-1">
                    Log In
                  </Link>
                </motion.div>
                <motion.div variants={linkVariants}>
                  <Link
                    href="/signup"
                    onClick={() => setOpen(false)}
                    className="block rounded-lg bg-brand px-4 py-2 text-center font-semibold text-white"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
