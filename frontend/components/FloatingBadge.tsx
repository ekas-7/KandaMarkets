"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface FloatingBadgeProps {
  text: string;
  className?: string;
}

export default function FloatingBadge({ text, className }: FloatingBadgeProps) {
  return (
    <div
      className={cn(
        "absolute px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:bg-white dark:hover:bg-gray-700 cursor-pointer",
        className
      )}
    >
      {text}
    </div>
  );
}
