"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useGsapTimeline } from "@/hooks/useGSAP";

export default function InterestFormPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    interest: "",
    message: ""
  });

  useGsapTimeline(sectionRef, ({ gsap }) => {
    const tl = gsap.timeline({
      defaults: { duration: 0.9, ease: "power3.out" },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });

    tl.from(".form-title", { y: 60, opacity: 0 })
      .from(".form-container", { y: 40, opacity: 0 }, "-=0.4")
      .from(".form-field", { y: 25, opacity: 0, stagger: 0.1 }, "-=0.35");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

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
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
          {/* Left Side: Text Content with Grid Background */}
          <div className="relative text-center lg:text-left px-2 sm:px-0">
            {/* Grid Background Effect */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-8 grid-rows-8 h-full w-full gap-2">
                {Array.from({ length: 64 }).map((_, i) => (
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

            <div className="relative z-10">
              <h1 className="form-title text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.15] sm:leading-[1.1] text-gray-900 dark:text-white tracking-tight mb-3 sm:mb-4 md:mb-6">
                Let's connect over a{" "}
                <span className="font-light italic text-[#9999ff]">snack</span>
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed px-2 sm:px-0">
                Share your ideas and let's build something amazing together.
              </p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="form-container relative">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-2xl p-6 sm:p-8 md:p-10">
              <h2 className="text-2xl sm:text-3xl font-normal text-white mb-6 sm:mb-8">
                Get in touch
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div className="form-field">
                  <label htmlFor="name" className="block text-sm font-light text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-[#9999ff]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#9999ff] focus:ring-2 focus:ring-[#9999ff]/20 transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>

                {/* Email Field */}
                <div className="form-field">
                  <label htmlFor="email" className="block text-sm font-light text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-[#9999ff]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#9999ff] focus:ring-2 focus:ring-[#9999ff]/20 transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Company Field */}
                <div className="form-field">
                  <label htmlFor="company" className="block text-sm font-light text-gray-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-[#9999ff]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#9999ff] focus:ring-2 focus:ring-[#9999ff]/20 transition-all duration-300"
                    placeholder="Your company (optional)"
                  />
                </div>

                {/* Interest Field */}
                <div className="form-field">
                  <label htmlFor="interest" className="block text-sm font-light text-gray-300 mb-2">
                    I'm interested in *
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    required
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-[#9999ff]/30 rounded-lg text-white focus:outline-none focus:border-[#9999ff] focus:ring-2 focus:ring-[#9999ff]/20 transition-all duration-300"
                  >
                    <option value="">Select an option</option>
                    <option value="joining">Joining the community</option>
                    <option value="partnership">Partnership opportunities</option>
                    <option value="consulting">Consulting services</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message Field */}
                <div className="form-field">
                  <label htmlFor="message" className="block text-sm font-light text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-black/50 border border-[#9999ff]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#9999ff] focus:ring-2 focus:ring-[#9999ff]/20 transition-all duration-300 resize-none"
                    placeholder="Tell us about your ideas..."
                  />
                </div>

                {/* Submit Button */}
                <div className="form-field pt-4">
                  <Button
                    variant={null as any}
                    type="submit"
                    className="w-full bg-[#9999ff] text-white hover:shadow-[0_0_30px_rgba(153,153,255,0.8)] hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-sm sm:text-base px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4"
                    size="lg"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
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
