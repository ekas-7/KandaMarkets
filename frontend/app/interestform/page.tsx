"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useGsapTimeline } from "@/hooks/useGSAP";
import { useRouter } from "next/navigation";

export default function InterestFormPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    instagramHandle: "",
    services: [] as string[],
    businessType: "",
    budget: "",
    biggestGoal: ""
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

  const handleCheckboxChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        // Redirect to thank you page after a short delay
        setTimeout(() => {
          router.push('/interestform/thank-you');
        }, 1000);
      } else {
        setSubmitStatus('error');
        console.error('Error submitting form:', data.error);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
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
            <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-2xl p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-normal text-white mb-4 sm:mb-6">
                Get in touch
              </h2>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">{/* Success Message */}
                {submitStatus === 'success' && (
                  <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-green-400 text-sm">
                      ✓ Success! Redirecting...
                    </p>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-sm">
                      ✗ Something went wrong. Please try again.
                    </p>
                  </div>
                )}

                {/* Name and Email - 2 Column Grid on Desktop */}
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Full Name Field */}
                  <div className="form-field">
                    <label htmlFor="fullName" className="block text-xs sm:text-sm font-light text-gray-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm bg-black/50 border border-[#9999ff]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#9999ff] focus:ring-2 focus:ring-[#9999ff]/20 transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="form-field">
                    <label htmlFor="email" className="block text-xs sm:text-sm font-light text-gray-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm bg-black/50 border border-[#9999ff]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#9999ff] focus:ring-2 focus:ring-[#9999ff]/20 transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Phone and Business Name - 2 Column Grid */}
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Phone / WhatsApp Field */}
                  <div className="form-field">
                    <label htmlFor="phone" className="block text-xs sm:text-sm font-light text-gray-300 mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm bg-black/50 border border-[#9999ff]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#9999ff] focus:ring-2 focus:ring-[#9999ff]/20 transition-all duration-300"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  {/* Business / Brand Name Field */}
                  <div className="form-field">
                    <label htmlFor="businessName" className="block text-xs sm:text-sm font-light text-gray-300 mb-1.5">
                      Business / Brand Name *
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      required
                      value={formData.businessName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm bg-black/50 border border-[#9999ff]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#9999ff] focus:ring-2 focus:ring-[#9999ff]/20 transition-all duration-300"
                      placeholder="Your business name"
                    />
                  </div>
                </div>

                {/* Instagram Handle - Full Width */}
                <div className="form-field">
                  <label htmlFor="instagramHandle" className="block text-xs sm:text-sm font-light text-gray-300 mb-1.5">
                    Instagram / Social Media Handle *
                  </label>
                  <input
                    type="text"
                    id="instagramHandle"
                    name="instagramHandle"
                    required
                    value={formData.instagramHandle}
                    onChange={handleChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm bg-black/50 border border-[#9999ff]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#9999ff] focus:ring-2 focus:ring-[#9999ff]/20 transition-all duration-300"
                    placeholder="@yourbrand"
                  />
                </div>

                {/* Services Field - Checkboxes in Grid */}
                <div className="form-field">
                  <label className="block text-xs sm:text-sm font-light text-gray-300 mb-2">
                    What services are you looking for? *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      'Social Media Management',
                      'Content Creation / Reels Editing',
                      'Personal Branding',
                      'Paid Ads',
                      'Growth Strategy',
                      'Not sure (Let\'s discuss)'
                    ].map((service) => (
                      <label key={service} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={formData.services.includes(service)}
                          onChange={() => handleCheckboxChange(service)}
                          className="w-4 h-4 bg-black/50 border border-[#9999ff]/30 rounded text-[#9999ff] focus:ring-2 focus:ring-[#9999ff]/20"
                        />
                        <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors">
                          {service}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Business Type and Budget - 2 Column Grid */}
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Business Type Field */}
                  <div className="form-field">
                    <label htmlFor="businessType" className="block text-xs sm:text-sm font-light text-gray-300 mb-1.5">
                      What best describes you? *
                    </label>
                    <select
                      id="businessType"
                      name="businessType"
                      required
                      value={formData.businessType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm bg-black/50 border border-[#9999ff]/30 rounded-lg text-white focus:outline-none focus:border-[#9999ff] focus:ring-2 focus:ring-[#9999ff]/20 transition-all duration-300"
                    >
                      <option value="">Select an option</option>
                      <option value="creator">Creator / Personal Brand</option>
                      <option value="startup">Startup / Small Business</option>
                      <option value="coach">Coach / Consultant</option>
                      <option value="ecommerce">E-commerce Brand</option>
                      <option value="agency">Agency / Other</option>
                    </select>
                  </div>

                  {/* Budget Field */}
                  <div className="form-field">
                    <label htmlFor="budget" className="block text-xs sm:text-sm font-light text-gray-300 mb-1.5">
                      Monthly marketing budget? *
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      required
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm bg-black/50 border border-[#9999ff]/30 rounded-lg text-white focus:outline-none focus:border-[#9999ff] focus:ring-2 focus:ring-[#9999ff]/20 transition-all duration-300"
                    >
                      <option value="">Select budget</option>
                      <option value="10k-25k">₹10k – ₹25k</option>
                      <option value="25k-50k">₹25k – ₹50k</option>
                      <option value="50k-1L">₹50k – ₹1L</option>
                      <option value="1L+">₹1L+</option>
                      <option value="not-sure">Not sure yet</option>
                    </select>
                  </div>
                </div>

                {/* Biggest Goal Field */}
                <div className="form-field">
                  <label htmlFor="biggestGoal" className="block text-xs sm:text-sm font-light text-gray-300 mb-1.5">
                    What is your biggest goal right now? *
                  </label>
                  <textarea
                    id="biggestGoal"
                    name="biggestGoal"
                    required
                    value={formData.biggestGoal}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm bg-black/50 border border-[#9999ff]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#9999ff] focus:ring-2 focus:ring-[#9999ff]/20 transition-all duration-300 resize-none"
                    placeholder="E.g., More leads, Brand visibility..."
                  />
                </div>

                {/* Submit Button */}
                <div className="form-field pt-2">
                  <Button
                    variant={null as any}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#9999ff] text-white hover:shadow-[0_0_30px_rgba(153,153,255,0.8)] hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-sm sm:text-base px-6 py-2.5 sm:py-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    size="lg"
                  >
                    {isSubmitting ? 'Submitting...' : 'Book Free Strategy Call'}
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
