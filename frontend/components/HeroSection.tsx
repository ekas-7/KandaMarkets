"use client";

import React from "react";
import { Button } from "./ui/Button";
import { Iphone } from "./ui/iphone";
import FloatingBadge from "./FloatingBadge";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-12 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left Side: Text Content */}
        <div className="space-y-6 text-center lg:text-left relative z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 dark:text-white" style={{ fontFamily: 'var(--font-family-serif)' }}>
            Discover the art of{" "}
            <span className="italic">strategy</span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0" style={{ fontFamily: 'var(--font-family-sans)' }}>
            Join a community of creative strategists and build your portfolio with elegant, data-driven solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button variant="primary" size="lg">
              Join for $9.99/m
            </Button>
            <Button variant="secondary" size="lg">
              Read more
            </Button>
          </div>
        </div>

        {/* Right Side: iPhone with Floating Badges */}
        <div className="relative flex items-center justify-center h-[500px] lg:h-[600px]">
          <div className="w-[280px] sm:w-[320px] lg:w-[360px]">
            <Iphone videoSrc="https://videos.pexels.com/video-files/8946986/8946986-uhd_1440_2732_25fps.mp4" />
          </div>
          
          {/* Floating Badges */}
          <FloatingBadge 
            text="@coplin" 
            className="top-8 right-4 lg:right-12 animate-float-slow"
          />
          <FloatingBadge 
            text="@andrea" 
            className="bottom-16 left-4 lg:left-8 animate-float-delayed"
          />
        </div>
      </div>

      {/* Add custom animations to globals.css later */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite 1s;
        }
      `}</style>
    </section>
  );
}
