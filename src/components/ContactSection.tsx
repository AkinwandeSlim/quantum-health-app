
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useSiteInfo } from "@/hooks/useSiteInfo";

const ContactSection = () => {
  const { siteInfo, loading } = useSiteInfo();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  if (loading) {
    return (
      <section id="contact" className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </section>
    );
  }

  const headline = siteInfo.contact_headline || "Get in Touch";
  const description = siteInfo.contact_description || "Ready to start your healing journey? Contact us today for a free consultation.";
  const email = siteInfo.contact_email || "info@quantumhealth.ng";
  const phone = siteInfo.contact_phone || "+234 803 123 4567";
  const whatsappLink = siteInfo.contact_whatsapp_link || "https://wa.me/2348031234567";
  const address = siteInfo.contact_address || "123 Health Street, Victoria Island, Lagos, Nigeria";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            {headline}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green-800">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Mail className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-800">Email</p>
                    <p className="text-gray-600">{email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 mb-4">
                  <Phone className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-800">Phone</p>
                    <p className="text-gray-600">{phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 mb-4">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-800">WhatsApp</p>
                    <a 
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700"
                    >
                      Chat with us on WhatsApp
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold text-green-800">Address</p>
                    <p className="text-gray-600">{address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  Free Consultation Available
                </h3>
                <p className="text-gray-700 mb-4">
                  Get personalized advice from our quantum healing experts
                </p>
                <Button className="bg-green-600 hover:bg-green-700">
                  Book Free Consultation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
