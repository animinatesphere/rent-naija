"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { isFavorite, toggleFavorite } from "@/lib/tenant";

export default function FavoriteButton({
  propertyId,
  className = "",
}: {
  propertyId: string;
  className?: string;
}) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isFavorite(propertyId));
  }, [propertyId]);

  function handleClick(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setSaved(toggleFavorite(propertyId));
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileTap={{ scale: 0.85 }}
      aria-label={saved ? "Remove from saved homes" : "Save this home"}
      className={`flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-base shadow-sm transition hover:bg-white ${className}`}
    >
      <motion.span
        animate={saved ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
        className={saved ? "text-red-500" : "text-foreground/40"}
      >
        {saved ? "♥" : "♡"}
      </motion.span>
    </motion.button>
  );
}
