"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";

export default function ClientTestimonials() {
  const { theme } = useTheme();

  const testimonials = [
    {
      id: 1,
      text: "For 3 years, Kanda Speaks has been my go-to team — helping deliver top-quality content for 7-9 figure clients with great communication, fast turnaround, and flawless editing.",
      author: "Patrick Crosby",
      role: "Founder, Omni Media Group",
      highlight: "",
    },
    {
      id: 2,
      text: "Kanda Speaks overdelivers — 95% on point, professional, and reliable. Highly recommended.",
      author: "Yashvardhan Swamy",
      role: "Fitness Entrepreneur",
      highlight: "",
    },
    {
      id: 3,
      text: "Working with Kanda Speaks has been a game-changer for our paid media performance. Since partnering with them, we've seen our CPAs drop by 33%. Their creative work has been outperforming what we were running before, and they've become an essential part of our growth stack.",
      author: "Aryan Arora",
      role: "Head of Growth & Advertising, Maple Inc",
      highlight: "",
    },
    {
      id: 4,
      text: "Kanda Speaks helped me rapidly build my personal brand online. Saksham is more than a supplier — he's a true partner with vision, strategy, and 24/7 support",
      author: "Christian Schute",
      role: "8 fig serial entrepreneur and investor. Built ticketing software for F1",
      highlight: "true partner with vision, strategy, and 24/7 support",
    },
    {
      id: 5,
      text: "Holy F*cking shit. Excuse my language but I took a sneak peek at the edits and they are unreal. So stoked about this.",
      author: "George Munguia",
      role: "Founder, Tryharmony.ai",
      highlight: "took a sneak peek at the edits and they are unreal",
    },
    {
      id: 6,
      text: "Love the vibe and overall execution. Edits are crisp, song choice & energy is a vibe, broll is on point, fonts are awesome. Great work!",
      author: "Drew Rogers",
      role: "Founder, Stabledash Studios",
      highlight: "Edits are crisp, song choice & energy is a vibe, broll is on point, fonts are awesome. Great work!",
    },
    {
      id: 7,
      text: "We've had very good results. The team is very fast at feedback and their editing quality is top notch too. We have multiple millions of views through Saksham's team on the B-roll side of things which help with",
      author: "",
      role: "",
      highlight: "millions of views",
    },
    {
      id: 8,
      text: "Working with Kanda Speaks has been an absolute pleasure. They produced several videos for Fluid Focus, and we were genuinely impressed by the creativity they brought to each concept. Their modern editing style gave our content a fresh, engaging feel that really captured our brand. Professional, imaginative, and easy to collaborate with - we couldn't be happier",
      author: "",
      role: "",
      highlight: "",
    },
    {
      id: 9,
      text: "In just six weeks, Saksham and his team at Kanda Speaks helped me grow my brand significantly, increasing my income by thousands of dollars and securing three",
      author: "",
      role: "",
      highlight: "increasing my income by thousands of dollars",
    },
  ];

  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    
    const parts = text.split(highlight);
    return (
      <>
        {parts[0]}
        <span className="text-yellow-400">{highlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section className={`relative min-h-screen w-full flex items-center justify-center py-20 px-6 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-black' : 'bg-gray-900'
    }`}>
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-baseline gap-2 mb-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white" 
                style={{ fontFamily: 'var(--font-family-serif)' }}>
              Client <span className="text-yellow-400">Testimonials</span>
            </h2>
            {/* Decorative lines */}
            <div className="flex flex-col gap-1 mb-2">
              <div className="w-6 h-0.5 bg-yellow-400 rotate-45"></div>
              <div className="w-8 h-0.5 bg-yellow-400 rotate-45"></div>
            </div>
          </div>
          
          <p className="text-lg sm:text-xl text-gray-300" 
             style={{ fontFamily: 'var(--font-family-sans)' }}>
            Hear from their experience
          </p>
        </div>

        {/* Testimonials Grid - Masonry Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`group relative backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer ${
                theme === 'dark' 
                  ? 'bg-gray-900/50 border-gray-800 hover:bg-gray-800/70 hover:border-gray-700' 
                  : 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/70 hover:border-gray-600'
              }`}
            >
              {/* Testimonial Text */}
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4" 
                 style={{ fontFamily: 'var(--font-family-sans)' }}>
                {highlightText(testimonial.text, testimonial.highlight)}
              </p>

              {/* Author Info */}
              {testimonial.author && (
                <div className="border-t border-gray-700 pt-4">
                  <p className="text-white font-semibold text-sm sm:text-base mb-1" 
                     style={{ fontFamily: 'var(--font-family-sans)' }}>
                    {testimonial.author}
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm" 
                     style={{ fontFamily: 'var(--font-family-sans)' }}>
                    {testimonial.role}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
