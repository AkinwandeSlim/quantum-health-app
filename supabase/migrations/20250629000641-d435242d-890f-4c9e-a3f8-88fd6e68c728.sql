
-- Create site_info table for dynamic content management
CREATE TABLE public.site_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default values for site content

INSERT INTO public.site_info (key, value)
VALUES
  -- Hero Section
  ('hero_headline', 'Transform Your Health with Quantum Healing Technology'),
  ('hero_subheadline', 'Discover Natural Healing Solutions That Actually Work'),
  ('hero_description', 'Join thousands of Nigerians who have transformed their health using proven quantum healing methods. Limited time offer - Get started today!'),
  ('hero_cta_text', 'Get Your Free Consultation Now'),
  ('hero_background_image', 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=2000'),

  -- Intro Section
  ('intro_headline', 'Why Quantum Healing Works'),
  ('intro_subheadline', 'Science-Based Natural Solutions'),
  ('intro_description', 'Our quantum healing technology has helped over 10,000 Nigerians overcome chronic health challenges. Using advanced bioenergetic principles, we address the root cause of illness at the cellular level.'),

  -- Video Section
  ('video_headline', 'Watch Real Transformation Stories'),
  ('video_description', 'See how quantum healing has changed lives across Nigeria. Watch testimonials from real people who experienced remarkable health improvements.'),

  -- CTA Section
  ('cta_headline', 'Ready to Transform Your Health?'),
  ('cta_subheadline', 'Join Thousands Who Have Already Experienced the Power of Quantum Healing'),
  ('cta_description', 'Don''t let poor health control your life any longer. Take the first step towards vibrant health with our proven quantum healing system.'),
  ('cta_button_text', 'Start Your Healing Journey Today'),
  ('cta_phone_text', 'Or Call Us: +234 803 123 4567'),

  -- Contact Info
  ('contact_headline', 'Get in Touch'),
  ('contact_description', 'Ready to start your healing journey? Contact us today for a free consultation.'),
  ('contact_email', 'info@quantumhealth.ng'),
  ('contact_phone', '+234 803 123 4567'),
  ('contact_whatsapp_link', 'https://wa.me/2348031234567'),
  ('contact_address', '123 Health Street, Victoria Island, Lagos, Nigeria')
ON CONFLICT (key) DO NOTHING;








-- Enable Row Level Security
ALTER TABLE public.site_info ENABLE ROW LEVEL SECURITY;

-- Create policies for site_info table
CREATE POLICY "Anyone can view site info" 
  ON public.site_info 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can update site info" 
  ON public.site_info 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Create function to update site info values

CREATE OR REPLACE FUNCTION public.update_site_info(info_key TEXT, info_value TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.site_info (key, value)
  VALUES (info_key, info_value)
  ON CONFLICT (key)
  DO UPDATE SET value = EXCLUDED.value, updated_at = now();
END;
$$;

