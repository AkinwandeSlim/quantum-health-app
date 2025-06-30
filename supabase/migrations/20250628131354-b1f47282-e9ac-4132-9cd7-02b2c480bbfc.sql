
-- Create videos table
CREATE TABLE public.videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  quote TEXT NOT NULL,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security for videos
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Create policies for videos table
CREATE POLICY "Anyone can view videos" 
  ON public.videos 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can create videos" 
  ON public.videos 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update videos" 
  ON public.videos 
  FOR UPDATE 
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete videos" 
  ON public.videos 
  FOR DELETE 
  TO authenticated
  USING (true);

-- Enable Row Level Security for testimonials
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies for testimonials table
CREATE POLICY "Anyone can view testimonials" 
  ON public.testimonials 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can create testimonials" 
  ON public.testimonials 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update testimonials" 
  ON public.testimonials 
  FOR UPDATE 
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete testimonials" 
  ON public.testimonials 
  FOR DELETE 
  TO authenticated
  USING (true);
