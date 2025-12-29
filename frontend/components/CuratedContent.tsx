"use client";

import React, { useRef, useState } from "react";
import { useGsapTimeline } from "@/hooks/useGSAP";

export default function CuratedContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mutedStates, setMutedStates] = useState<{ [key: number]: boolean }>({});

  const toggleMute = (videoId: number) => {
    setMutedStates((prev) => ({
      ...prev,
      [videoId]: !(prev[videoId] ?? true),
    }));
  };
  
  const videos = [
  {
    id: 1,
    src: "/videos/video1.mp4",
    caption: "A million dollar brand owner just",
    highlight: "million",
  },
  {
    id: 2,
    src: "/videos/video2.mp4",
    caption: "We pulled years of expertise from",
    highlight: "expertise",
  },
  {
    id: 3,
    src: "/videos/video3.mp4",
    caption: "you really wanted was comfort.",
    highlight: "wanted",
  },
  {
    id: 4,
    src: "/videos/video4.mp4",
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
      className="relative min-h-screen w-full flex items-center justify-center py-16 md:py-20 px-4 md:px-6 bg-black"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 grid-background opacity-50 pointer-events-none z-0"></div>

      <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center relative z-10">
        {/* Header */}
        <div className="mb-20 md:mb-36">
          <h2 className="curated-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium mb-3 md:mb-4 tracking-tight text-white">
            Curated <span className="text-[#9999ff] font-normal italic font-eb-garamond">short form</span> content
            
          </h2>
          <p className="curated-sub text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl font-light leading-relaxed text-gray-300">
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
                <video 
                  src={video.src}
                  className="w-full h-full object-cover" 
                  muted={mutedStates[video.id] ?? true}
                  loop
                  autoPlay
                  playsInline
                  preload="metadata"
                  />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>

              {/* Enable sound button */}
              <button 
                onClick={() => toggleMute(video.id)}
                className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 bg-black/50 backdrop-blur-sm text-white text-[10px] sm:text-xs px-2 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-2 hover:bg-black/70 transition-colors z-10"
              >
                {mutedStates[video.id] === false ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="sm:w-3 sm:h-3">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                  </svg>
                ) : (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="sm:w-3 sm:h-3">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                  </svg>
                )}
                <span className="hidden sm:inline">{mutedStates[video.id] === false ? 'Mute' : 'Enable sound'}</span>
              </button>

              {/* Text overlay - middle */}
              {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-3 sm:px-4 md:px-6">
                <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-tight">
                  {video.caption.split(video.highlight)[0]}
                  <span className="text-[#9999ff] italic font-light font-eb-garamond">{video.highlight}</span>
                  {video.caption.split(video.highlight)[1]}
                </p>
              </div> */}

              {/* Caption at bottom */}
              {/* <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4">
                <p className="text-white text-xs sm:text-sm leading-tight font-light">
                  {video.caption}
                </p>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
