
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { useSiteInfo } from "@/hooks/useSiteInfo";

interface ContentTabsSectionProps {
  activeTab: string;
}

const ContentTabsSection = ({ activeTab }: ContentTabsSectionProps) => {
  const { siteInfo, updateSiteInfo, loading } = useSiteInfo();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Default values for all sections
  const defaultValues: Record<string, Record<string, string>> = {
    hero: {
      hero_headline: "Transform Your Health with Quantum Healing Technology",
      hero_subheadline: "Discover Natural Healing Solutions That Actually Work",
      hero_description: "Join thousands of Nigerians who have transformed their health using proven quantum healing methods. Limited time offer - Get started today!",
      hero_cta_text: "Get Your Free Consultation Now",
      hero_background_image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=2000"
    },
    intro: {
      intro_headline: "Why Quantum Healing Works",
      intro_subheadline: "Science-Based Natural Solutions",
      intro_description: "Our quantum healing technology has helped over 10,000 Nigerians overcome chronic health challenges. Using advanced bioenergetic principles, we address the root cause of illness at the cellular level."
    },
    video: {
      video_headline: "Watch Real Transformation Stories",
      video_description: "See how quantum healing has changed lives across Nigeria. Watch testimonials from real people who experienced remarkable health improvements."
    },
    cta: {
      cta_headline: "Ready to Transform Your Health?",
      cta_subheadline: "Join Thousands Who Have Already Experienced the Power of Quantum Healing",
      cta_description: "Don't let poor health control your life any longer. Take the first step towards vibrant health with our proven quantum healing system.",
      cta_button_text: "Start Your Healing Journey Today",
      cta_phone_text: "Or Call Us: +234 803 123 4567"
    },
    contact: {
      contact_headline: "Get in Touch",
      contact_description: "Ready to start your healing journey? Contact us today for a free consultation.",
      contact_email: "info@quantumhealth.ng",
      contact_phone: "+234 803 123 4567",
      contact_whatsapp_link: "https://wa.me/2348031234567",
      contact_address: "123 Health Street, Victoria Island, Lagos, Nigeria"
    }
  };

  const getFieldsForTab = (tab: string): Record<string, string> => {
    return defaultValues[tab] || {};
  };

  useEffect(() => {
    const fields = getFieldsForTab(activeTab);
    const initialData: Record<string, string> = {};
    
    Object.keys(fields).forEach(key => {
      initialData[key] = siteInfo[key] || fields[key];
    });
    
    setFormData(initialData);
  }, [activeTab, siteInfo]);

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      for (const [key, value] of Object.entries(formData)) {
        await updateSiteInfo(key, value);
      }
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Error saving changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const renderField = (key: string, label: string, type: 'input' | 'textarea' | 'url' = 'input') => {
    const value = formData[key] || '';
    
    return (
      <div key={key} className="space-y-2">
        <Label htmlFor={key} className="text-sm font-medium">
          {label}
        </Label>
        {type === 'textarea' ? (
          <Textarea
            id={key}
            value={value}
            onChange={(e) => handleInputChange(key, e.target.value)}
            rows={3}
            className="w-full"
          />
        ) : (
          <Input
            id={key}
            type={type === 'url' ? 'url' : 'text'}
            value={value}
            onChange={(e) => handleInputChange(key, e.target.value)}
            className="w-full"
          />
        )}
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "hero":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Hero Section Settings</h3>
            <div className="grid gap-4">
              {renderField('hero_headline', 'Main Headline')}
              {renderField('hero_subheadline', 'Subheadline')}
              {renderField('hero_description', 'Description', 'textarea')}
              {renderField('hero_cta_text', 'Call to Action Button Text')}
              {renderField('hero_background_image', 'Background Image URL', 'url')}
            </div>
          </div>
        );

      case "intro":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Intro Section Settings</h3>
            <div className="grid gap-4">
              {renderField('intro_headline', 'Headline')}
              {renderField('intro_subheadline', 'Subheadline')}
              {renderField('intro_description', 'Description', 'textarea')}
            </div>
          </div>
        );

      case "video":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Video Section Settings</h3>
            <div className="grid gap-4">
              {renderField('video_headline', 'Section Headline')}
              {renderField('video_description', 'Section Description', 'textarea')}
            </div>
          </div>
        );

      case "cta":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Call to Action Settings</h3>
            <div className="grid gap-4">
              {renderField('cta_headline', 'Main Headline')}
              {renderField('cta_subheadline', 'Subheadline')}
              {renderField('cta_description', 'Description', 'textarea')}
              {renderField('cta_button_text', 'Button Text')}
              {renderField('cta_phone_text', 'Phone Text')}
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="grid gap-4">
              {renderField('contact_headline', 'Section Headline')}
              {renderField('contact_description', 'Description', 'textarea')}
              {renderField('contact_email', 'Email Address')}
              {renderField('contact_phone', 'Phone Number')}
              {renderField('contact_whatsapp_link', 'WhatsApp Link', 'url')}
              {renderField('contact_address', 'Address', 'textarea')}
            </div>
          </div>
        );

      default:
        return <div>Select a tab to edit content</div>;
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {renderTabContent()}
      
      <div className="flex justify-end pt-6 border-t">
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-green-600 hover:bg-green-700"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

export default ContentTabsSection;
