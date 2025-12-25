"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useGsapTimeline } from "@/hooks/useGSAP";

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className }: NavigationProps) {
  const navRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useGsapTimeline(navRef, ({ gsap }) => {
    gsap.fromTo(
      navRef.current,
      { y: -32, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  return (
    <nav ref={navRef} className={cn("w-full py-4 md:py-6 px-4 md:px-8 bg-black", className)}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
            <span className="text-white dark:text-black font-bold">K</span>
          </div>
          <span className="font-serif text-lg md:text-xl font-semibold text-gray-900 dark:text-white">Kanda</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
            Strategies
          </a>
          <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1">
            <span>Create strategy</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </a>
          <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
            About
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
          <div className="flex flex-col gap-4 pt-4">
            <a href="#" className="text-gray-300 hover:text-white transition-colors py-2">
              Strategies
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 py-2">
              <span>Create strategy</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors py-2">
              About
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
