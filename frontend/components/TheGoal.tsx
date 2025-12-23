"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";

export default function TheGoal() {
  const { theme } = useTheme();

  return (
    <section className={`relative min-h-screen w-full flex items-center justify-center py-20 px-6 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-black' : 'bg-gray-900'
    }`}>
      <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Heading */}
          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white" 
                  style={{ fontFamily: 'var(--font-family-serif)' }}>
                The <span className="text-yellow-400">Goal</span>
              </h2>
              {/* Decorative lines */}
              <div className="flex flex-col gap-1 mb-4">
                <div className="w-6 h-0.5 bg-yellow-400 rotate-45"></div>
                <div className="w-8 h-0.5 bg-yellow-400 rotate-45"></div>
              </div>
            </div>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-md" 
               style={{ fontFamily: 'var(--font-family-sans)' }}>
              We become your brains and brawn.
            </p>
          </div>

          {/* Right Side - Content Points */}
          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl md:text-3xl text-white font-semibold" 
                  style={{ fontFamily: 'var(--font-family-sans)' }}>
                Max content output with minimal input.
              </h3>
            </div>

            <div className="space-y-3">
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed" 
                 style={{ fontFamily: 'var(--font-family-sans)' }}>
                Our clients typically film 3-5 hours a month, we take care of the rest. In other cases, they have footage and need no extra work.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed" 
                 style={{ fontFamily: 'var(--font-family-sans)' }}>
                Growth focused organic content that brings results. Always.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
