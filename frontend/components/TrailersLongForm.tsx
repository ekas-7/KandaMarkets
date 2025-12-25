"use client";

import React, { useRef, useState } from "react";
import { useGsapTimeline } from "@/hooks/useGSAP";

export default function TrailersLongForm() {
  const ref = useRef<HTMLElement>(null);
  const [, setHov] = useState<number | null>(null);

  const vids = [
    {
      id: 1,
      thumb: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop",
      cap: "for exactly what you have to",
    },
    {
      id: 2,
      thumb: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
      cap: "Looking for success",
      ctrl: true,
    },
    {
      id: 3,
      thumb: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop",
      cap: "the trade-off between health, happiness,",
    },
  ];

  useGsapTimeline(ref, ({ gsap }) => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: ref.current,
        start: "top 78%",
      },
    });

    tl.from(".h-anim", { y: 50, opacity: 0, duration: 0.8 })
      .from(".s-anim", { y: 30, opacity: 0, duration: 0.7 }, "-=0.35")
      .fromTo(".c-anim", 
        { y: 40, opacity: 0, rotate: (i: number) => (i % 2 ? 1.5 : -1.5) },
        { y: 0, opacity: 1, rotate: 0, duration: 0.65, stagger: 0.12 }, 
        "-=0.2")
      .from(".i-title", { y: 40, opacity: 0, duration: 0.7 }, "-=0.1")
      .from(".i-copy", { y: 30, opacity: 0, duration: 0.65, stagger: 0.08 }, "-=0.2")
      .from(".i-vid", { y: 50, opacity: 0, scale: 0.95, duration: 0.8 }, "-=0.25");
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full py-16 md:py-20 px-4 sm:px-6 lg:px-10 bg-black overflow-hidden"
    >
      <div className="absolute inset-0 grid-background opacity-50 pointer-events-none z-0"></div>

      <div className="w-full max-w-6xl mx-auto flex flex-col gap-16 md:gap-24 relative z-10">
        
        {/* Top Section */}
        <div>
          <div className="text-center md:text-left mb-12 md:mb-16">
            <h2 className="h-anim text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-snug mb-4 md:mb-6">
              Trailers and <span className="text-[#9999ff] font-light italic font-eb-garamond">Long form</span>
            </h2>
            <p className="s-anim text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto md:mx-0 font-light text-gray-400">
              Podcast trailers, B2B videos and more
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {vids.map((v) => (
              <div
                key={v.id}
                className="c-anim relative group cursor-pointer overflow-hidden rounded-xl md:rounded-2xl bg-gray-900 border border-white/5 aspect-video"
                onMouseEnter={() => setHov(v.id)}
                onMouseLeave={() => setHov(null)}
              >
                  <img
                    src={v.thumb}
                    alt={v.cap}
                    className="w-full h-full object-cover opacity-80"
                  />
                  
                  {v.ctrl ? (
                    /* Middle Video Controls */
                    <div className="absolute inset-0 flex flex-col justify-between z-20">
                       <div className="p-3 md:p-4">
                        <div className="bg-black/60 backdrop-blur-md text-white text-[9px] md:text-[10px] font-semibold px-2 md:px-3 py-1 md:py-1.5 rounded-full flex items-center gap-1.5 md:gap-2 w-fit">
                            <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                            <span>Playing</span>
                        </div>
                       </div>
                       <div className="bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 md:p-4 space-y-2 md:space-y-3">
                        <div className="h-1 bg-white/20 rounded-full w-full overflow-hidden">
                          <div className="h-full w-1/3 bg-[#9999ff]"></div>
                        </div>
                        <div className="flex justify-between items-center text-white">
                            <div className="flex gap-3 md:gap-4">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="md:w-5 md:h-5"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="md:w-6 md:h-6"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
                            </div>
                            <span className="text-[10px] md:text-xs font-mono text-gray-300">0:41 / 3:20</span>
                        </div>
                       </div>
                    </div>
                  ) : (
                    /* Standard Overlay */
                    <>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                        <button className="absolute top-3 md:top-4 left-3 md:left-4 bg-black/60 backdrop-blur-sm text-white text-[10px] md:text-xs px-2 md:px-3 py-1 md:py-1.5 rounded-full flex items-center gap-1.5 md:gap-2 border border-white/10 z-20">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="md:w-3 md:h-3"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
                            <span>Enable sound</span>
                        </button>
                        <div className="absolute bottom-3 md:bottom-5 left-3 md:left-5 right-3 md:right-5 z-20">
                            <p className="text-white text-xs md:text-sm font-light leading-snug drop-shadow-md">
                            {v.cap}
                            </p>
                        </div>
                    </>
                  )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section - Fixed Alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">
          
          {/* Left Text */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8">
            <h2 className="i-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-tight">
              Launch With <span className="text-[#9999ff] font-light italic font-eb-garamond">Impact</span>
            </h2>
            
            <p className="i-copy text-sm sm:text-base md:text-lg lg:text-xl max-w-xl font-light leading-relaxed text-gray-400">
              We craft compelling stories that build anticipation, drive traffic and convert your audience with the best in class launch videos.
            </p>

            <div className="i-copy pt-2">
              <button className="bg-[#9999ff] hover:bg-[#8888ff] text-black font-medium px-6 md:px-8 py-3 md:py-4 rounded-xl text-sm md:text-base transition-transform duration-300 hover:scale-105">
                Book a Discovery Call
              </button>
            </div>
          </div>

          {/* Right Video */}
          <div className="i-vid w-full relative overflow-hidden rounded-xl md:rounded-2xl bg-gray-900 border border-white/5 shadow-2xl aspect-video">
              <img
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&h=450&fit=crop"
                alt="Launch video"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-black/40"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-8 text-center">
                 <p className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium leading-tight max-w-lg">
                  into days of <span className="text-[#9999ff] font-light italic font-eb-garamond">education</span>
                </p>
              </div>

               <div className="absolute bottom-3 md:bottom-4 right-3 md:right-4 text-white hover:text-[#9999ff] cursor-pointer">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="md:w-6 md:h-6"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
               </div>
          </div>
        </div>
      </div>
    </section>
  );
}