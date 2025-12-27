"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { useGsapTimeline } from "@/hooks/useGSAP";
import Link from "next/link";

export default function ThankYouPage() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapTimeline(sectionRef, ({ gsap }) => {
    const tl = gsap.timeline({
      defaults: { duration: 0.9, ease: "power3.out" },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });

    tl.from(".thank-you-content", { y: 60, opacity: 0, scale: 0.95 })
      .from(".thank-you-icon", { scale: 0, opacity: 0, rotation: -180 }, "-=0.5")
      .from(".thank-you-details", { y: 30, opacity: 0, stagger: 0.15 }, "-=0.3");
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-16 sm:py-20 px-4 sm:px-6 md:px-8 overflow-hidden bg-black"
      style={{
        backgroundColor: "black",
        backgroundImage: `
          linear-gradient(to top, rgba(153, 153, 255, 0.125), transparent),
          linear-gradient(rgba(255, 255, 255, 0.16) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.16) 1px, transparent 1px)
        `,
        backgroundSize: "auto, 44px 44px, 44px 44px",
        backgroundRepeat: "no-repeat, repeat, repeat",
      }}
    >
      <div className="max-w-5xl mx-auto w-full text-center">
        <div className="thank-you-content relative">
          {/* Animated Grid Background Effect */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="grid grid-cols-6 grid-rows-6 h-full w-full gap-2">
              {Array.from({ length: 36 }).map((_, i) => (
                <div
                  key={i}
                  className="border border-[#9999ff]/30 rounded-sm"
                  style={{
                    animation: `pulse ${2 + (i % 3)}s ease-in-out infinite`,
                    animationDelay: `${(i % 10) * 0.1}s`
                  }}
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-2xl p-8 sm:p-12 md:p-16">
            {/* Success Icon */}
            <div className="thank-you-icon mb-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-[#9999ff]/20 rounded-full flex items-center justify-center border-2 border-[#9999ff]">
                <svg 
                  className="w-10 h-10 sm:w-12 sm:h-12 text-[#9999ff]" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2.5} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
            </div>

            {/* Heading */}
            <h1 className="thank-you-details text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-tight text-white tracking-tight mb-4 sm:mb-6">
              Thank you for{" "}
              <span className="font-light italic text-[#9999ff]">reaching out!</span>
            </h1>

            {/* Message */}
            <div className="thank-you-details space-y-4 mb-8 sm:mb-10">
              <p className="text-base sm:text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
                We've received your request and are excited to connect with you.
              </p>
              
              <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed max-w-xl mx-auto">
                Our team will review your information and reach out within <span className="text-[#9999ff] font-normal">24-48 hours</span> to schedule your free strategy call.
              </p>
            </div>

            {/* What's Next Section */}
            <div className="thank-you-details bg-black/30 rounded-xl p-6 sm:p-8 mb-8 sm:mb-10 border border-[#9999ff]/10">
              <h2 className="text-xl sm:text-2xl font-normal text-white mb-4 sm:mb-6">
                What happens next?
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
                <div className="flex flex-col gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#9999ff]/20 flex items-center justify-center text-[#9999ff] font-normal text-base">
                    1
                  </div>
                  <div>
                    <h3 className="text-white font-normal mb-2 text-base sm:text-lg">We'll audit your profile</h3>
                    <p className="text-gray-400 text-sm font-light">
                      Our team will review your Instagram and business details.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#9999ff]/20 flex items-center justify-center text-[#9999ff] font-normal text-base">
                    2
                  </div>
                  <div>
                    <h3 className="text-white font-normal mb-2 text-base sm:text-lg">Get contacted</h3>
                    <p className="text-gray-400 text-sm font-light">
                      We'll reach out via WhatsApp or email to schedule a call.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#9999ff]/20 flex items-center justify-center text-[#9999ff] font-normal text-base">
                    3
                  </div>
                  <div>
                    <h3 className="text-white font-normal mb-2 text-base sm:text-lg">Free strategy session</h3>
                    <p className="text-gray-400 text-sm font-light">
                      We'll discuss your goals and create a custom growth plan.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="thank-you-details flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/">
                <Button
                  variant={null as any}
                  className="bg-[#9999ff] text-white hover:shadow-[0_0_30px_rgba(153,153,255,0.8)] hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-sm sm:text-base px-6 sm:px-7 md:px-8 py-3"
                >
                  Back to Home
                </Button>
              </Link>
              
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#9999ff] transition-colors text-sm sm:text-base font-light flex items-center gap-2"
              >
                Follow us on Instagram
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </section>
  );
}
