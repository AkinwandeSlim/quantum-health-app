
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";
import { useSiteInfo } from "@/hooks/useSiteInfo";

const HeroSection = () => {
  const { siteInfo, loading } = useSiteInfo();
  const [heroData, setHeroData] = useState({
    title: "Transform Your Health with Quantum Healing Technology",
    subtitle: "Discover Natural Healing Solutions That Actually Work",
    description: "Join thousands of Nigerians who have transformed their health using proven quantum healing methods. Limited time offer - Get started today!",
    backgroundImage: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=2000",
    ctaText: "Get Your Free Consultation Now"
  });

  useEffect(() => {
    const saved = localStorage.getItem('heroData');
    if (saved) {
      setHeroData(JSON.parse(saved));
    }
  }, []);

  // Use dynamic content from Supabase if available, otherwise fall back to local state
  const displayTitle = siteInfo.hero_headline || heroData.title;
  const displaySubtitle = siteInfo.hero_subheadline || heroData.subtitle;
  const displayCtaText = siteInfo.hero_cta_text || heroData.ctaText;

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("${heroData.backgroundImage}")`,
      }}
    >
      {/* Animated particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-emerald-400/15 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-teal-400/25 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
        <div className="flex justify-center mb-6">
          <Heart className="h-16 w-16 text-green-400 animate-pulse" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
            {displayTitle}
          </span>
        </h1>
        
        <h2 className="text-2xl md:text-3xl text-green-100 mb-6 font-semibold">
          {displaySubtitle}
        </h2>
        
        <p className="text-lg md:text-xl text-green-200 mb-8 leading-relaxed max-w-4xl mx-auto">
          {heroData.description}
        </p>
        
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          {displayCtaText}
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
