"use client";

import React, { useRef } from "react";
import { Button } from "./ui/Button";
import { Iphone3D } from "./ui/iphone3d";
import FloatingBadge from "./FloatingBadge";
import { useGsapTimeline } from "@/hooks/useGSAP";
import Link from "next/link";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapTimeline(sectionRef, ({ gsap }) => {
    const tl = gsap.timeline({
      defaults: { duration: 0.9, ease: "power3.out" },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });

    tl.from(".hero-title", { y: 60, opacity: 0 })
      .from(".hero-copy", { y: 40, opacity: 0 }, "-=0.4")
      .from(".hero-cta button", { y: 25, opacity: 0, stagger: 0.12 }, "-=0.35")
      .from(".hero-device", { y: 80, opacity: 0, rotate: -4 }, "-=0.35")
      .from(
        ".hero-badge",
        { y: -12, opacity: 0, stagger: 0.15, ease: "power2.out" },
        "-=0.45"
      );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 pb-20 sm:pb-32 md:pb-60 px-4 sm:px-6 md:px-8 overflow-hidden bg-black"
      style={{
        background: 'linear-gradient(to top, rgba(153, 153, 255, 0.125), transparent), black'
      }}
    >
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
          {/* Left Side: Text Content */}
          <div className="text-center lg:text-left relative z-10 px-2 sm:px-0">
            <h1 className="hero-title text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.15] sm:leading-[1.1] text-gray-900 dark:text-white tracking-tight mb-3 sm:mb-4 md:mb-6">
              Discover the art of{" "}
              <span className="font-light italic">strategy</span>
            </h1>
            
            <p className="hero-copy text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed mb-4 sm:mb-6 md:mb-8 px-2 sm:px-0">
              Join a community of creative strategists and build your portfolio with elegant, data-driven solutions.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 md:mt-16 justify-center lg:justify-start px-2 sm:px-0">
              <Button 
                variant={null as any}
                className="bg-[#9999ff] text-white hover:shadow-[0_0_30px_rgba(153,153,255,0.8)] hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-sm sm:text-base px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 w-full sm:w-auto" 
                size="lg"
                data-track-name="Contact Cal.com CTA"
              >
                Contact on Cal.com
              </Button>
              
              <Link href="/interestform">
                <Button 
                  variant={null as any}
                  className="bg-transparent border-2 border-[#9999ff] text-[#9999ff] hover:bg-[#9999ff]/10 hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-sm sm:text-base px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 w-full sm:w-auto" 
                  size="lg"
                  data-track-name="Get Free Strategy Call"
                >
                  Get Free Strategy Call
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side: iPhone with Floating Badges */}
          <div className="hero-device relative flex items-center justify-center h-[350px] xs:h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] mt-8 lg:mt-0 overflow-hidden">
            <div className="w-full h-full max-w-[400px] mx-auto">
              <Iphone3D videoSrc="/videos/main_phone.mp4" />
            </div>
            
            {/* Floating Badges */}
            <FloatingBadge 
              text="@coplin" 
              className="hero-badge top-2 xs:top-4 sm:top-6 md:top-8 right-0 xs:right-2 sm:right-4 md:right-4 lg:right-12 animate-float-slow text-xs sm:text-sm"
            />
            <FloatingBadge 
              text="@andrea" 
              className="hero-badge bottom-8 xs:bottom-10 sm:bottom-12 md:bottom-16 left-0 xs:left-2 sm:left-4 md:left-4 lg:left-8 animate-float-delayed text-xs sm:text-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
