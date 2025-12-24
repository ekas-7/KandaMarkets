"use client";

import React, { useRef } from "react";
import { useGsapTimeline } from "@/hooks/useGSAP";

export default function ClientTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);

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

  useGsapTimeline(sectionRef, ({ gsap }) => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 78%",
      },
    });

    tl.from(".goal-title", { y: 50, opacity: 0, duration: 0.8 })
      .from(".goal-sub", { y: 30, opacity: 0, duration: 0.7 }, "-=0.35")
      .from(".goal-point", { y: 25, opacity: 0, duration: 0.6, stagger: 0.12 }, "-=0.25")
      .from(".testimonial-heading", { y: 40, opacity: 0, duration: 0.75 }, "-=0.2")
      .from(".testimonial-sub", { y: 24, opacity: 0, duration: 0.6 }, "-=0.25")
      .from(".testimonial-card", { y: 40, opacity: 0, duration: 0.7, stagger: 0.08 }, "-=0.2");
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center py-24 lg:py-32 px-6 bg-black"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 grid-background opacity-50 pointer-events-none z-0"></div>
      
      <div className="w-full max-w-6xl mx-auto relative z-10">
        
        {/* The Goal Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-32 lg:mb-40">
          
          {/* Left Side - Heading */}
          <div className="space-y-4">
            <div className="flex items-baseline gap-3">
              <h2 className="goal-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-tight tracking-tight"> 
                The <span className="text-yellow-400 font-light italic font-eb-garamond">Goal</span>
              </h2>
              {/* Decorative lines */}
              
            </div>
            
            <p className="goal-sub text-lg sm:text-xl text-gray-300 max-w-md leading-relaxed font-light"> 
              We become your brains and brawn.
            </p>
          </div>

          {/* Right Side - Content Points */}
          <div className="space-y-8">
            <div className="goal-point">
              <h3 className="text-xl sm:text-2xl md:text-3xl text-white font-medium leading-tight"> 
                Max content output with minimal input.
              </h3>
            </div>

            <div className="goal-point">
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed font-light"> 
                Our clients typically film 3-5 hours a month, we take care of the rest. In other cases, they have footage and need no extra work.
              </p>
            </div>

            <div className="goal-point">
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed font-light"> 
                Growth focused organic content that brings results. Always.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Section Header */}
        <div className="mb-16 lg:mb-20">
          <div className="flex items-baseline gap-3 mb-6">
            <h2 className="testimonial-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-tight tracking-tight"> 
              Client <span className="text-yellow-400 font-light italic font-eb-garamond">Testimonials</span>
            </h2>
            {/* Decorative lines */}
           
          </div>
          
          <p className="testimonial-sub text-lg sm:text-xl text-gray-300 font-light"> 
            Hear from their experience
          </p>
        </div>

        {/* Testimonials Grid - Masonry Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card group relative backdrop-blur-sm border rounded-3xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer bg-gray-900/50 border-gray-800 hover:bg-gray-800/70 hover:border-yellow-400/30"
            >
              {/* Testimonial Text */}
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 font-light"> 
                {highlightText(testimonial.text, testimonial.highlight)}
              </p>

              {/* Author Info */}
              {testimonial.author && (
                <div className="border-t border-gray-700/50 pt-4">
                  <p className="text-white font-medium text-sm sm:text-base mb-1"> 
                    {testimonial.author}
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm font-light"> 
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
