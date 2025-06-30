
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, Zap, Heart, Brain, Sparkles } from "lucide-react";

const BenefitsSection = () => {
  const [benefitsData, setBenefitsData] = useState({
    title: "Why Choose Quantum Healing?",
    subtitle: "Experience the power of natural healing with proven results",
    benefits: [
      {
        icon: "CheckCircle",
        title: "Proven Effectiveness",
        description: "Over 98% success rate in clinical studies and real-world applications"
      },
      {
        icon: "Shield",
        title: "100% Safe & Natural",
        description: "No side effects, no chemicals - completely natural healing process"
      },
      {
        icon: "Zap",
        title: "Fast-Acting Results",
        description: "Many clients report improvements within the first 2-4 weeks"
      },
      {
        icon: "Heart",
        title: "Holistic Approach",
        description: "Addresses root causes, not just symptoms for lasting health"
      },
      {
        icon: "Brain",
        title: "Scientifically Backed",
        description: "Based on quantum physics and energy medicine research"
      },
      {
        icon: "Sparkles",
        title: "Life-Changing Results",
        description: "Transform your health, energy, and overall quality of life"
      }
    ]
  });

  useEffect(() => {
    const saved = localStorage.getItem('benefitsData');
    if (saved) {
      setBenefitsData(JSON.parse(saved));
    }
  }, []);

  const getIcon = (iconName: string) => {
    const icons = {
      CheckCircle,
      Shield,
      Zap,
      Heart,
      Brain,
      Sparkles
    };
    const IconComponent = icons[iconName as keyof typeof icons] || CheckCircle;
    return <IconComponent className="h-8 w-8" />;
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            {benefitsData.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {benefitsData.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitsData.benefits.map((benefit, index) => (
            <Card key={index} className="border border-green-200 hover:shadow-lg transition-all duration-300 hover:border-green-400">
              <CardContent className="p-6">
                <div className="text-green-600 mb-4">
                  {getIcon(benefit.icon)}
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
