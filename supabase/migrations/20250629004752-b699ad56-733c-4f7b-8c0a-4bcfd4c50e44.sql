
-- Enable RLS on all tables and set up proper policies

-- Products table
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read products" 
  ON public.products 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can manage products" 
  ON public.products 
  FOR ALL 
  TO authenticated
  USING (true);

-- Videos table  
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read videos" 
  ON public.videos 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can manage videos" 
  ON public.videos 
  FOR ALL 
  TO authenticated
  USING (true);

-- Testimonials table
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read testimonials" 
  ON public.testimonials 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can manage testimonials" 
  ON public.testimonials 
  FOR ALL 
  TO authenticated
  USING (true);

-- Site info policies are already correct from previous migration
-- Just adding INSERT policy for completeness
CREATE POLICY "Authenticated users can insert site info" 
  ON public.site_info 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);
