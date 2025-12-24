"use client";

import React, { useRef, useState } from "react";
import { useGsapTimeline } from "@/hooks/useGSAP";

export default function HighLevelRepurposing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isContainerHovered, setIsContainerHovered] = useState(false);

  const services = [
    {
      title: "BESPOKE\nDEVELOPMENT",
      image: "/vr-placeholder.jpg",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      barColor: "from-blue-400 via-purple-400",
      align: "left",
    },
    {
      title: "VR\nINSTALLATIONS",
      image: "/vr-placeholder.jpg",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      barColor: "from-pink-400 via-red-400",
      align: "right",
    },
    {
      title: "INFINITE\nDESTINATIONS",
      image: "/vr-placeholder.jpg",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      barColor: "from-cyan-400 via-blue-400",
      align: "left",
    },
    {
      title: "CONTENT\nREPURPOSING",
      image: "/vr-placeholder.jpg",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      barColor: "from-yellow-400 via-pink-400",
      align: "right",
    },
    {
      title: "BRAND\nSTRATEGY",
      image: "/vr-placeholder.jpg",
      gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
      barColor: "from-purple-400 via-cyan-400",
      align: "left",
    },
    {
      title: "SOCIAL MEDIA\nMANAGEMENT",
      image: "/vr-placeholder.jpg",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      barColor: "from-teal-400 via-pink-300",
      align: "right",
    },
  ];

  useGsapTimeline(sectionRef, ({ gsap }) => {
    const rows = gsap.utils.toArray<HTMLElement>(".repurpose-row");

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });

    tl.from(".repurpose-kicker", { y: 20, opacity: 0, duration: 0.6 })
      .from(rows, { opacity: 0, y: 35, duration: 0.7, stagger: 0.12 }, "-=0.2")
      .from(".repurpose-footer", { opacity: 0, y: 20, duration: 0.6 }, "-=0.25");
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full py-20 px-6 bg-black overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto h-full flex flex-col justify-center relative z-10">
        {/* Header */}
        <div className="mb-16 text-left">
          <p className="repurpose-kicker text-sm font-light tracking-wider mb-4 text-gray-400 uppercase"> 
            OUR SERVICES
          </p>
        </div>

        {/* Accordion List */}
        <div 
          className="space-y-0 border-t border-gray-800"
          onMouseEnter={() => setIsContainerHovered(true)}
          onMouseLeave={() => {
            setIsContainerHovered(false);
            setHoveredIndex(null);
          }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="repurpose-row relative border-b border-gray-800 py-6 cursor-pointer group"
              style={{
                opacity: isContainerHovered 
                  ? hoveredIndex === index 
                    ? 1 
                    : 0.3
                  : 1,
                transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: isContainerHovered ? 'opacity' : 'auto',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
            >
              {/* Left Aligned Items */}
              {service.align === "left" && (
                <div className="flex items-center justify-between gap-8">
                  
                  {/* Left Side: Animated Bar + Image Container + Title */}
                  <div className="flex items-center gap-6 flex-1 overflow-hidden">
                    
                    {/* Animated Vertical Bar */}
                    <div 
                      className={`h-24 bg-gradient-to-b ${service.barColor} to-transparent`}
                      style={{
                        width: hoveredIndex === index ? '4px' : '2px',
                        opacity: hoveredIndex === index ? 1 : 0.5,
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        willChange: hoveredIndex === index ? 'width, opacity' : 'auto',
                      }}
                    ></div>

                    {/* Image Container - Expands on Hover */}
                    <div 
                      className="h-24 rounded-lg overflow-hidden"
                      style={{
                        width: hoveredIndex === index ? '160px' : '0px',
                        opacity: hoveredIndex === index ? 1 : 0,
                        transform: hoveredIndex === index ? 'scale(1)' : 'scale(0.95)',
                        transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        willChange: hoveredIndex === index ? 'width, opacity, transform' : 'auto',
                      }}
                    >
                      <div 
                        className="w-full h-full"
                        style={{
                          background: service.gradient,
                        }}
                      >
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    </div>

                    {/* Title - Slides Right as Image Expands */}
                    <h2 
                      className="text-5xl sm:text-6xl md:text-7xl font-medium text-white leading-none whitespace-pre-line tracking-tight"
                      style={{
                        transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        willChange: hoveredIndex === index ? 'transform' : 'auto',
                      }}
                    >
                      {service.title}
                    </h2>
                  </div>

                  {/* Right Side: Discover Button - Fades In on Hover */}
                  <div 
                    style={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      transform: hoveredIndex === index ? 'translateX(0)' : 'translateX(20px)',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      willChange: hoveredIndex === index ? 'opacity, transform' : 'auto',
                    }}
                  >
                    <button className="px-6 py-2 border-2 border-white text-white rounded-full text-xs font-medium tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300">
                      Discover
                    </button>
                  </div>
                </div>
              )}

              {/* Right Aligned Items */}
              {service.align === "right" && (
                <div className="flex items-center justify-between gap-8 flex-row-reverse">
                  
                  {/* Right Side: Animated Bar + Image Container + Title */}
                  <div className="flex items-center gap-6 flex-1 overflow-hidden flex-row-reverse">
                    
                    {/* Animated Vertical Bar */}
                    <div 
                      className={`h-24 bg-gradient-to-b ${service.barColor} to-transparent`}
                      style={{
                        width: hoveredIndex === index ? '4px' : '2px',
                        opacity: hoveredIndex === index ? 1 : 0.5,
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        willChange: hoveredIndex === index ? 'width, opacity' : 'auto',
                      }}
                    ></div>

                    {/* Image Container - Expands on Hover */}
                    <div 
                      className="h-24 rounded-lg overflow-hidden"
                      style={{
                        width: hoveredIndex === index ? '160px' : '0px',
                        opacity: hoveredIndex === index ? 1 : 0,
                        transform: hoveredIndex === index ? 'scale(1)' : 'scale(0.95)',
                        transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        willChange: hoveredIndex === index ? 'width, opacity, transform' : 'auto',
                      }}
                    >
                      <div 
                        className="w-full h-full"
                        style={{
                          background: service.gradient,
                        }}
                      >
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    </div>

                    {/* Title - Slides Left as Image Expands */}
                    <h2 
                      className="text-5xl sm:text-6xl md:text-7xl font-medium text-white leading-none whitespace-pre-line text-right tracking-tight"
                      style={{
                        transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        willChange: hoveredIndex === index ? 'transform' : 'auto',
                      }}
                    >
                      {service.title}
                    </h2>
                  </div>

                  {/* Left Side: Discover Button - Fades In on Hover */}
                  <div 
                    style={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      transform: hoveredIndex === index ? 'translateX(0)' : 'translateX(-20px)',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      willChange: hoveredIndex === index ? 'opacity, transform' : 'auto',
                    }}
                  >
                    <button className="px-6 py-2 border-2 border-white text-white rounded-full text-xs font-medium tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300">
                      Discover
                    </button>
                  </div>
                </div>
              )}

              {/* Optional: Cross Icon on Active Item */}
              {hoveredIndex === index && (
                <div className={`absolute top-4 ${service.align === 'left' ? 'right-4' : 'left-4'} opacity-30`}>
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-yellow-400">
                    <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Subtitle */}
        <div className="mt-16 text-center">
          <p className="repurpose-footer text-sm md:text-base text-gray-500 max-w-2xl mx-auto" 
             style={{ fontFamily: 'var(--font-family-sans)' }}>
            Hover to explore our innovative solutions across multiple platforms
          </p>
        </div>
      </div>
    </section>
  );
}
