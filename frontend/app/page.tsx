"use client";

import { useEffect } from "react";
import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import CuratedContent from "../components/CuratedContent";
import HighLevelRepurposing from "../components/HighLevelRepurposing";
import TrailersLongForm from "../components/TrailersLongForm";
import ProblemsWeSolve from "../components/ProblemsWesolve";
import ClientTestimonials from "../components/ClientTestimonials";
import Footer from "../components/Footer";
import { trackPageView } from "@/lib/analytics";

export default function Home() {
  useEffect(() => {
    // Track page view when component mounts
    trackPageView('/');
  }, []);

  return (
    <div className="min-h-screen ">
      <Navigation />
      <HeroSection />
      <CuratedContent />
      <HighLevelRepurposing />
      <TrailersLongForm />
      <ProblemsWeSolve />
      <ClientTestimonials />
      <Footer />
    </div>
  );
}
