"use client";

import React from "react";

export default function CuratedContent() {
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

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 dark:bg-black">
      <div className="w-full max-w-[1600px] mx-auto h-full flex flex-col justify-center">
        {/* Header */}
        <div className="mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 md:mb-4" style={{ fontFamily: 'var(--font-family-serif)' }}>
            Curated <span className="text-yellow-400">short form</span> content
            <span className="inline-block ml-2 align-middle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-8 md:h-8">
                <path d="M3 3L21 21M21 3L3 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl" style={{ fontFamily: 'var(--font-family-sans)' }}>
            We help with creative direction and/or ideate, script and post produce.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 flex-1">
          {videos.map((video) => (
            <div
              key={video.id}
              className="relative group cursor-pointer overflow-hidden rounded-xl md:rounded-2xl bg-gray-800 aspect-[9/16] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
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
                <p className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight" style={{ fontFamily: 'var(--font-family-serif)' }}>
                  {video.caption.split(video.highlight)[0]}
                  <span className="text-yellow-400 italic">{video.highlight}</span>
                  {video.caption.split(video.highlight)[1]}
                </p>
              </div>

              {/* Caption at bottom */}
              <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4">
                <p className="text-white text-xs sm:text-sm leading-tight" style={{ fontFamily: 'var(--font-family-sans)' }}>
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
