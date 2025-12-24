"use client";

import React, { useRef } from "react";
import { Button } from "./ui/Button";
import { Iphone3D } from "./ui/iphone3d";
import FloatingBadge from "./FloatingBadge";
import { useGsapTimeline } from "@/hooks/useGSAP";

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
      className="relative min-h-screen flex items-center justify-center pt-0  pb-60 px-6 overflow-hidden bg-black"
      style={{
        background: 'linear-gradient(to top, rgba(153, 153, 255, 0.125), transparent), black'
      }}
    >
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Side: Text Content */}
          <div className="text-center lg:text-left relative z-10">
            <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.1] text-gray-900 dark:text-white tracking-tight mb-6">
              Discover the art of{" "}
              <span className=" font-light italic">strategy</span>
            </h1>
            
            <p className="hero-copy text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed mb-8">
              Join a community of creative strategists and build your portfolio with elegant, data-driven solutions.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta flex flex-col sm:flex-row gap-4 mt-16 justify-center lg:justify-start">
              <Button 
                variant={null as any}
                className="bg-[#9999ff] text-white  hover:shadow-[0_0_30px_rgba(153,153,255,0.8)] hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" 
                size="lg"
              >
                Join for $9.99/m
              </Button>
  
          </div>
        </div>

          {/* Right Side: iPhone with Floating Badges */}
          <div className="hero-device relative flex items-center justify-center h-[500px] lg:h-[600px]">
            <div className="w-full h-full">
              <Iphone3D videoSrc="https://videos.pexels.com/video-files/8946986/8946986-uhd_1440_2732_25fps.mp4" />
            </div>
            
            {/* Floating Badges */}
            <FloatingBadge 
              text="@coplin" 
              className="hero-badge top-8 right-4 lg:right-12 animate-float-slow"
            />
            <FloatingBadge 
              text="@andrea" 
              className="hero-badge bottom-16 left-4 lg:left-8 animate-float-delayed"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
