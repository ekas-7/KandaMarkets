"use client";

import React, { useRef, useState } from "react";
import { useGsapTimeline } from "@/hooks/useGSAP";

export default function TrailersLongForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const [, setHoveredVideo] = useState<number | null>(null);

  const videos = [
    {
      id: 1,
      thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop",
      caption: "for exactly what you have to",
      time: "0:01",
    },
    {
      id: 2,
      thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
      caption: "Looking for success",
      time: "0:01",
      hasControls: true,
    },
    {
      id: 3,
      thumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop",
      caption: "the trade-off between health, happiness,",
      time: "0:01",
    },
  ];

  useGsapTimeline(sectionRef, ({ gsap }) => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 78%",
      },
    });

    tl.from(".trailers-heading", { y: 50, opacity: 0, duration: 0.8 })
      .from(".trailers-sub", { y: 30, opacity: 0, duration: 0.7 }, "-=0.35")
      .from(".trailer-card", { y: 40, opacity: 0, duration: 0.65, stagger: 0.12, rotate: (i: number) => (i % 2 ? 1.5 : -1.5) }, "-=0.2")
      .from(".impact-title", { y: 40, opacity: 0, duration: 0.7 }, "-=0.1")
      .from(".impact-copy", { y: 30, opacity: 0, duration: 0.65, stagger: 0.08 }, "-=0.2")
      .from(".impact-video", { y: 50, opacity: 0, scale: 0.95, duration: 0.8 }, "-=0.25");
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center py-24 px-4 sm:px-6 lg:px-10 bg-black"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 grid-background opacity-50 pointer-events-none z-0"></div>

      <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center gap-32 relative z-10">
        
        {/* Top Section - Trailers and Long form */}
        <div className="space-y-12">
          {/* Header */}
          <div>
            <h2 className="trailers-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-5 md:mb-6 tracking-tight text-white">
              Trailers and <span className="text-[#9999ff] font-light italic font-eb-garamond">Long form</span>
              
            </h2>
            <p className="trailers-sub text-sm sm:text-base md:text-lg max-w-3xl font-light leading-relaxed text-gray-300">
              Podcast trailers, B2B videos and more
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {videos.map((video) => (
              <div
                key={video.id}
                className="trailer-card relative group cursor-pointer overflow-hidden rounded-xl md:rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-gray-900"
                onMouseEnter={() => setHoveredVideo(video.id)}
                onMouseLeave={() => setHoveredVideo(null)}
              >
                {/* Video Container */}
                <div className="relative aspect-video">
                  {/* Video Thumbnail */}
                  <img
                    src={video.thumbnail}
                    alt={video.caption}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/40"></div>

                  {/* Enable sound button */}
                  <button className="absolute top-3 left-3 md:top-4 md:left-4 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 hover:bg-black/80 transition-colors z-10">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                    </svg>
                    <span>Enable sound</span>
                  </button>

                  {/* Caption overlay */}
                  <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5 md:right-5 z-10">
                    <p className="text-white text-sm md:text-base leading-tight font-light">
                      {video.caption}
                    </p>
                  </div>

                  {/* Video Controls (for middle video) */}
                  {video.hasControls && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-5 space-y-4">
                        {/* Progress bar */}
                        <div className="relative h-1 bg-white/30 rounded-full cursor-pointer">
                          <div className="absolute top-0 left-0 h-full w-1/3 bg-white rounded-full"></div>
                          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"></div>
                        </div>
                        
                        {/* Controls */}
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            {/* Previous */}
                            <button className="text-white hover:text-[#9999ff] transition-colors">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                              </svg>
                            </button>
                            
                            {/* Play/Pause */}
                            <button className="text-white hover:text-[#9999ff] transition-colors">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                              </svg>
                            </button>
                            
                            {/* Next */}
                            <button className="text-white hover:text-[#9999ff] transition-colors">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16 18h2V6h-2zM6 18l8.5-6L6 6z"/>
                              </svg>
                            </button>
                            
                            {/* Volume */}
                            <button className="text-white hover:text-[#9999ff] transition-colors">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                              </svg>
                            </button>
                            
                            {/* Time */}
                            <span className="text-white text-sm font-medium">0:41</span>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {/* Playlist */}
                            <button className="text-white hover:text-[#9999ff] transition-colors">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/>
                              </svg>
                            </button>
                            
                            {/* Captions */}
                            <button className="text-white hover:text-[#9999ff] transition-colors">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 7H9.5v-.5h-2v3h2V13H11v1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1zm7 0h-1.5v-.5h-2v3h2V13H18v1c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1z"/>
                              </svg>
                            </button>
                            
                            {/* Settings */}
                            <button className="text-white hover:text-[#9999ff] transition-colors">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                              </svg>
                            </button>
                            
                            {/* Fullscreen */}
                            <button className="text-white hover:text-[#9999ff] transition-colors">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                              </svg>
                            </button>
                            
                            {/* Share */}
                            <button className="text-white hover:text-[#9999ff] transition-colors">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section - Launch With Impact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-9 md:space-y-10">
              <h2 className="impact-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white">
              Launch With <span className="text-[#9999ff] font-light italic font-eb-garamond">Impact</span>
              
            </h2>
            
            <p className="impact-copy text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed text-gray-300">
              We craft compelling stories that build anticipation, drive traffic and convert your audience with the best in class launch videos.
            </p>

            <div className="pt-2 mt-4">
              <button className="bg-[#9999ff] hover:bg-brand-500 text-black font-medium px-6 py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl text-base md:text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl">
                Book a Discovery Call
              </button>
            </div>
          </div>

          {/* Right Video */}
          <div className="impact-video relative overflow-hidden rounded-xl md:rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-gray-900">
            <div className="relative aspect-video">
              {/* Video Thumbnail */}
              <img
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&h=450&fit=crop"
                alt="Launch video"
                className="w-full h-full object-cover"
              />
              
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Enable sound button */}
              <button className="absolute top-3 left-3 md:top-4 md:left-4 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 hover:bg-black/80 transition-colors z-10">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                </svg>
                <span>Enable sound</span>
              </button>

              {/* Text overlay - center */}
              <div className="absolute inset-0 flex items-center justify-center px-8 sm:px-10">
                <p className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-center leading-tight">
                  into days of <span className="text-[#9999ff] font-light italic font-eb-garamond">education</span>
                </p>
              </div>

              {/* Caption at bottom */}
              <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5 md:right-5 z-10">
                <p className="text-white text-sm md:text-base leading-tight font-light">
                  sessions into days of education for
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
