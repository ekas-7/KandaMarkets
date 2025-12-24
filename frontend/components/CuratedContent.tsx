"use client";

import React, { useRef } from "react";
import { useGsapTimeline } from "@/hooks/useGSAP";

export default function CuratedContent() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const videos = [
    {
      id: 1,
      thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop",
      caption: "A million dollar brand owner just",
      highlight: "million",
    },
    {
      id: 2,
      thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=600&fit=crop",
      caption: "We pulled years of expertise from",
      highlight: "expertise",
    },
    {
      id: 3,
      thumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=600&fit=crop",
      caption: "you really wanted was comfort.",
      highlight: "wanted",
    },
    {
      id: 4,
      thumbnail: "https://images.unsplash.com/photo-1600878459305-8a2b2c2c4c7e?w=400&h=600&fit=crop",
      caption: "These moments aren't just about utility",
      highlight: "aren't",
    },
  ];

  useGsapTimeline(sectionRef, ({ gsap }) => {
    const cards = gsap.utils.toArray<HTMLElement>(".curated-card");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });

    tl.from(".curated-heading", { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" })
      .from(".curated-sub", { y: 30, opacity: 0, duration: 0.7 }, "-=0.4")
      .fromTo(cards, {
        y: 40,
        opacity: 0,
        rotate: (i: number) => (i % 2 === 0 ? -3 : 3),
      }, {
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      }, "-=0.2");
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center py-20 px-6 bg-black"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 grid-background opacity-50 pointer-events-none z-0"></div>

      <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center relative z-10">
        {/* Header */}
        <div className="mb-36">
          <h2 className="curated-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium mb-3 md:mb-4 tracking-tight text-white">
            Curated <span className="text-[#9999ff] font-normal italic font-eb-garamond">short form</span> content
            
          </h2>
          <p className="curated-sub text-base sm:text-lg md:text-xl max-w-3xl font-light leading-relaxed text-gray-300">
            We help with creative direction and/or ideate, script and post produce.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 flex-1">
          {videos.map((video) => (
            <div
              key={video.id}
              className="curated-card relative group cursor-pointer overflow-hidden rounded-xl md:rounded-2xl bg-gray-800 aspect-[9/16] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              {/* Video Thumbnail */}
              <div className="absolute inset-0">
                <img
                  src={video.thumbnail}
                  alt={video.caption}
                  className="w-full h-full object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>

              {/* Enable sound button */}
              <button className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 bg-black/50 backdrop-blur-sm text-white text-[10px] sm:text-xs px-2 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-2 hover:bg-black/70 transition-colors">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="sm:w-3 sm:h-3">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                </svg>
                <span className="hidden sm:inline">Enable sound</span>
              </button>

              {/* Text overlay - middle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-3 sm:px-4 md:px-6">
                <p className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium leading-tight">
                  {video.caption.split(video.highlight)[0]}
                  <span className="text-[#9999ff] italic font-light font-eb-garamond">{video.highlight}</span>
                  {video.caption.split(video.highlight)[1]}
                </p>
              </div>

              {/* Caption at bottom */}
              <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4">
                <p className="text-white text-xs sm:text-sm leading-tight font-light">
                  {video.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
