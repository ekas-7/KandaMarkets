"use client";

import React from "react";
import { Button } from "./ui/Button";
import { Iphone3D } from "./ui/iphone3d";
import FloatingBadge from "./FloatingBadge";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left Side: Text Content */}
        <div className="space-y-6 text-center lg:text-left relative z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal leading-tight text-gray-900 dark:text-white tracking-tight">
            Discover the art of{" "}
            <span className=" font-light italic">strategy</span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
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
          <div className="w-full h-full">
            <Iphone3D videoSrc="https://videos.pexels.com/video-files/8946986/8946986-uhd_1440_2732_25fps.mp4" />
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
    </section>
  );
}
