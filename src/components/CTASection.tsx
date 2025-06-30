
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { useSiteInfo } from "@/hooks/useSiteInfo";

const CTASection = () => {
  const { siteInfo, loading } = useSiteInfo();

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-emerald-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="text-lg">Loading...</div>
        </div>
      </section>
    );
  }

  const headline = siteInfo.cta_headline || "Ready to Transform Your Health?";
  const subheadline = siteInfo.cta_subheadline || "Join Thousands Who Have Already Experienced the Power of Quantum Healing";
  const description = siteInfo.cta_description || "Don't let poor health control your life any longer. Take the first step towards vibrant health with our proven quantum healing system.";
  const buttonText = siteInfo.cta_button_text || "Start Your Healing Journey Today";
  const phoneText = siteInfo.cta_phone_text || "Or Call Us: +234 803 123 4567";

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-emerald-700">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {headline}
        </h2>
        <h3 className="text-xl md:text-2xl mb-6 text-green-100">
          {subheadline}
        </h3>
        <p className="text-lg mb-8 text-green-100 leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-white text-green-700 hover:bg-green-50 px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {buttonText}
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
          
          <div className="flex items-center text-green-100">
            <Phone className="h-5 w-5 mr-2" />
            <span className="text-lg">{phoneText}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
