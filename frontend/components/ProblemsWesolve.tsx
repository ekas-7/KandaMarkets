"use client";

import React, { useRef, useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import dynamic from "next/dynamic";
import { useGsapTimeline } from "@/hooks/useGSAP";

// Dynamically import the 3D component to avoid SSR issues
const Holoboard3D = dynamic(() => import("./Holoboard3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse text-blue-400">Loading 3D Model...</div>
    </div>
  ),
});

export default function ProblemsWeSolve() {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const rafId = useRef<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  // Track scroll progress within this section
  useEffect(() => {
    const updateProgress = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 0 when section is below viewport, 1 when fully past the top
      const rawProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
      const clamped = Math.max(0, Math.min(1, rawProgress));

      setScrollProgress(clamped);

      const totalItems = 6;
      const itemsToShow = Math.ceil(clamped * totalItems);
      setVisibleCards(Array.from({ length: Math.min(itemsToShow, totalItems) }, (_, i) => i + 1));
    };

    const onScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useGsapTimeline(sectionRef, ({ gsap }) => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });

    tl.from(".holoboard-shell", { opacity: 0, y: 50, duration: 0.9 })
      .from(".problems-tagline", { opacity: 0, y: 30, duration: 0.7 }, "-=0.45")
      .from(".problems-card", { opacity: 0, y: 35, duration: 0.65, stagger: 0.12 }, "-=0.3");
  }, []);

  const teamMembers = [
    "Lead Creatives",
    "World-class Editors",
    "Content Writers",
    "Project Managers",
    "Designers",
    "Virtual Assistants",
  ];

  return (
    <section 
      ref={sectionRef}
      className={`relative min-h-screen w-full flex items-center justify-center py-20 px-6 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-black' : 'bg-black'
      }`}
    >
      {/* Gradient + Grid Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-black/85 to-black pointer-events-none z-0"></div>
    

      <div className="w-full max-w-7xl mx-auto h-full flex flex-col justify-center relative z-10">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          
          {/* Left Side - 3D Model */}
          <div className="holoboard-shell relative h-[600px] order-1 lg:order-1">
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="w-full h-full transition-opacity duration-1000"
                style={{ 
                  opacity: scrollProgress > 0.1 ? 1 : 0,
                }}
              >
                <Holoboard3D scrollProgress={scrollProgress} />
              </div>
            </div>
          </div>

          {/* Right Side - List */}
          <div className="relative flex items-center justify-center order-2 lg:order-2">
            <div className="w-full max-w-lg">
              <p className="problems-tagline text-lg md:text-xl text-gray-400 mb-10 leading-relaxed font-light"> 
                Think of an in house content team, that you don't have to manage.
              </p>
              
              <div className="space-y-3">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className={`problems-card group relative transition-all duration-700 ${
                      visibleCards.includes(index + 1)
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-12'
                    }`}
                    style={{
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className={`relative overflow-hidden rounded-xl border backdrop-blur-sm transition-all duration-300 ${
                      theme === 'dark' 
                        ? 'bg-gradient-to-r from-gray-900/80 to-gray-800/60 border-gray-700/50 hover:border-blue-500/50 hover:bg-gray-800/90' 
                        : 'bg-gradient-to-r from-gray-800/80 to-gray-700/60 border-gray-600/50 hover:border-blue-400/50 hover:bg-gray-700/90'
                    } px-6 py-4 cursor-pointer`}>
                      {/* Animated gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      
                      {/* Index number */}
                      <div className="absolute left-2 top-1/2 -translate-y-1/2 text-5xl font-bold opacity-5 select-none">
                        {(index + 1).toString().padStart(2, '0')}
                      </div>
                      
                      {/* Content */}
                      <div className="relative flex items-center justify-between">
                        <span className="text-xl md:text-2xl font-medium text-white group-hover:text-blue-300 transition-colors duration-300">
                          {member}
                        </span>
                        
                        {/* Arrow icon */}
                        <svg 
                          className="w-5 h-5 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      
                      {/* Bottom accent line */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
