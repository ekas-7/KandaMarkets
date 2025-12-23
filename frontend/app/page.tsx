"use client";

import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import CuratedContent from "../components/CuratedContent";
import HighLevelRepurposing from "../components/HighLevelRepurposing";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <CuratedContent />
      <HighLevelRepurposing />
    </div>
  );
}
