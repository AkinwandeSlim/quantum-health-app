
-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  video_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read products (for public display)
CREATE POLICY "Anyone can view products" 
  ON public.products 
  FOR SELECT 
  USING (true);

-- Create policy to allow only authenticated users to insert products
CREATE POLICY "Authenticated users can create products" 
  ON public.products 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Create policy to allow only authenticated users to update products
CREATE POLICY "Authenticated users can update products" 
  ON public.products 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Create policy to allow only authenticated users to delete products
CREATE POLICY "Authenticated users can delete products" 
  ON public.products 
  FOR DELETE 
  TO authenticated
  USING (true);
