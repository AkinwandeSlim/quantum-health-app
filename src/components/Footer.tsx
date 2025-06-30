
import { useState, useEffect } from "react";
import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { useSiteInfo } from "@/hooks/useSiteInfo";

const Footer = () => {
  const { siteInfo } = useSiteInfo();
  const [footerData, setFooterData] = useState({
    brandName: "Quantum Health",
    description: "Transforming lives through quantum healing technology and natural health solutions.",
    copyright: "© 2024 Quantum Health. All rights reserved.",
    tagline: "Built with ❤️ for Natural Healing"
  });

  useEffect(() => {
    const saved = localStorage.getItem('footerData');
    if (saved) {
      setFooterData(JSON.parse(saved));
    }
  }, []);

  const [contactData, setContactData] = useState({
    email: "info@quantumhealth.ng",
    phone: "+234 803 123 4567",
    address: "Victoria Island, Lagos, Nigeria"
  });

  useEffect(() => {
    const saved = localStorage.getItem('contactData');
    if (saved) {
      const contact = JSON.parse(saved);
      setContactData({
        email: contact.email,
        phone: contact.phone,
        address: contact.address
      });
    }
  }, []);

  // Use dynamic content from Supabase if available, otherwise fall back to local state
  const displayEmail = siteInfo.contact_email || contactData.email;
  const displayPhone = siteInfo.contact_phone || contactData.phone;

  return (
    <footer className="bg-green-950/50 backdrop-blur-sm border-t border-green-400/30 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Heart className="h-8 w-8 text-green-400 mr-2" />
              <span className="text-xl font-bold text-white">{footerData.brandName}</span>
            </div>
            <p className="text-green-200 text-sm leading-relaxed">
              {footerData.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-green-200 hover:text-green-400 text-sm">Home</a></li>
              <li><a href="#intro" className="text-green-200 hover:text-green-400 text-sm">About</a></li>
              <li><a href="#products" className="text-green-200 hover:text-green-400 text-sm">Products</a></li>
              <li><a href="#testimonials" className="text-green-200 hover:text-green-400 text-sm">Testimonials</a></li>
              <li><a href="#contact" className="text-green-200 hover:text-green-400 text-sm">Contact</a></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4">Our Products</h4>
            <ul className="space-y-2">
              <li><span className="text-green-200 text-sm">Quantum Light Therapy</span></li>
              <li><span className="text-green-200 text-sm">Energy Bracelets</span></li>
              <li><span className="text-green-200 text-sm">Quantum Tableware</span></li>
              <li><span className="text-green-200 text-sm">Wellness Products</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-green-400 mr-2" />
                <span className="text-green-200 text-sm">{displayEmail}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-green-400 mr-2" />
                <span className="text-green-200 text-sm">{displayPhone}</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                <span className="text-green-200 text-sm">{contactData.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-400/20 mt-8 pt-8 text-center">
          <p className="text-green-300 text-sm">
            {footerData.copyright} | 
            <span className="text-green-400"> {footerData.tagline}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
