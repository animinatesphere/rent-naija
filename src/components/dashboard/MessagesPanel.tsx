"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { inquiries as initialInquiries, type Inquiry } from "@/lib/dashboard";

export default function MessagesPanel() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [selectedId, setSelectedId] = useState(initialInquiries[0]?.id ?? "");
  const [mobileView, setMobileView] = useState<"list" | "thread">("list");
  const [reply, setReply] = useState("");

  const selected = inquiries.find((i) => i.id === selectedId);

  function selectInquiry(id: string) {
    setSelectedId(id);
    setMobileView("thread");
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, unread: false } : i)));
  }

  return (
    <div className="grid h-[calc(100vh-9rem)] grid-cols-1 overflow-hidden rounded-2xl border border-black/5 bg-white sm:grid-cols-[20rem_1fr] lg:h-[calc(100vh-5rem)]">
      <div
        className={`overflow-y-auto border-r border-black/5 ${
          mobileView === "thread" ? "hidden sm:block" : "block"
        }`}
      >
        {inquiries.map((inquiry) => (
          <button
            key={inquiry.id}
            onClick={() => selectInquiry(inquiry.id)}
            className={`flex w-full gap-3 border-b border-black/5 px-4 py-4 text-left transition ${
              selectedId === inquiry.id ? "bg-brand-light/60" : "hover:bg-black/1"
            }`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-light text-xs font-semibold text-brand-dark">
              {inquiry.initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-semibold text-foreground">
                  {inquiry.tenantName}
                </p>
                {inquiry.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-brand" />}
              </div>
              <p className="truncate text-xs text-foreground/50">{inquiry.propertyTitle}</p>
              <p className="mt-1 truncate text-xs text-foreground/40">{inquiry.message}</p>
            </div>
          </button>
        ))}
      </div>

      <div
        className={`${mobileView === "thread" ? "flex" : "hidden"} flex-col sm:flex`}
      >
        {selected ? (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="flex h-full flex-col"
          >
            <div className="flex items-center gap-3 border-b border-black/5 px-4 py-4 sm:px-6">
              <button
                onClick={() => setMobileView("list")}
                aria-label="Back to conversations"
                className="-ml-1 mr-1 rounded-lg p-1 text-foreground/50 hover:bg-black/5 sm:hidden"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-light text-xs font-semibold text-brand-dark">
                {selected.initials}
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold text-foreground">{selected.tenantName}</p>
                <p className="truncate text-xs text-foreground/50">Re: {selected.propertyTitle}</p>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6 sm:px-6">
              <div className="max-w-md rounded-2xl rounded-tl-none bg-brand-light/60 px-4 py-3 text-sm text-foreground/80">
                {selected.message}
                <p className="mt-2 text-[11px] text-foreground/40">{selected.date}</p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setReply("");
              }}
              className="flex items-center gap-3 border-t border-black/5 px-4 py-4 sm:px-6"
            >
              <input
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type a reply..."
                className="flex-1 rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={!reply.trim()}
                className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-foreground/20"
              >
                Send
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-foreground/40">
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
}
