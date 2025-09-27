import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Product = Database['public']['Tables']['products']['Row'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];
type ProductUpdate = Database['public']['Tables']['products']['Update'];

const PRODUCT_BUCKET = 'products';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching products from Supabase...');
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching products:', error);
        throw new Error(`Fetch failed: ${error.message} (code: ${error.code})`);
      }
      
      console.log('Fetched products:', data);
      setProducts(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      console.error('Fetch products error:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (data: { title: string; description?: string; image?: File; video_url?: string }) => {
    try {
      setError(null);
      console.log('Adding product:', data);

      // Check authentication
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        console.error('Authentication error:', authError);
        throw new Error('User not authenticated');
      }
      console.log('Authenticated user:', user.id);

      let imageUrl: string | undefined;

      if (data.image) {
        console.log('Uploading image:', data.image.name, `(${data.image.size} bytes)`);
        
        // Verify bucket is accessible
        console.log('Checking products bucket access...');
        const { data: bucketFiles, error: bucketError } = await supabase.storage
          .from(PRODUCT_BUCKET)
          .list('', { limit: 1 });
          
        if (bucketError) {
          console.error('Bucket access error:', bucketError);
          throw new Error(`Cannot access products bucket: ${bucketError.message} (code: ${bucketError.code})`);
        }
        
        console.log('Products bucket is accessible:', bucketFiles);

        const fileName = `${Date.now()}_${data.image.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        console.log('Generated file name:', fileName);
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(PRODUCT_BUCKET)
          .upload(fileName, data.image, {
            cacheControl: '3600',
            upsert: false
          });
          
        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw new Error(`Upload failed: ${uploadError.message} (code: ${uploadError.code})`);
        }

        console.log('Upload successful:', uploadData);

        const { data: { publicUrl } } = supabase.storage
          .from(PRODUCT_BUCKET)
          .getPublicUrl(uploadData.path);
          
        imageUrl = publicUrl;
        console.log('Public URL:', imageUrl);
      }

      const productInsert: ProductInsert = {
        title: data.title.trim(),
        description: data.description || null,
        image_url: imageUrl || null,
        video_url: data.video_url || null,
      };

      console.log('Inserting product data:', productInsert);

      const { data: productData, error } = await supabase
        .from('products')
        .insert([productInsert])
        .select()
        .single();
        
      if (error) {
        console.error('Database insert error:', error);
        throw new Error(`Database insert failed: ${error.message} (code: ${error.code})`);
      }

      console.log('Product inserted successfully:', productData);
      
      // Refresh the products list
      await fetchProducts();
      
      return { data: productData, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      console.error('Add product error:', errorMessage);
      setError(errorMessage);
      return { data: null, error: errorMessage };
    }
  };

  const updateProduct = async (id: string, data: { title: string; description?: string; image?: File | null; video_url?: string }) => {
    try {
      setError(null);
      console.log('Updating product ID:', id, 'with data:', data);

      // Check authentication
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        console.error('Authentication error:', authError);
        throw new Error('User not authenticated');
      }
      console.log('Authenticated user:', user.id);

      let imageUrl: string | undefined;

      if (data.image) {
        // Get current product data
        console.log('Fetching current product data for ID:', id);
        const { data: current, error: fetchError } = await supabase
          .from('products')
          .select('image_url')
          .eq('id', id)
          .single();
          
        if (fetchError) {
          console.error('Error fetching current product:', fetchError);
          throw new Error(`Fetch current product failed: ${fetchError.message} (code: ${fetchError.code})`);
        }

        // Delete old image if it exists
        if (current?.image_url) {
          const path = current.image_url.split(`/storage/v1/object/public/${PRODUCT_BUCKET}/`)?.[1];
          if (path) {
            console.log('Deleting old image:', path);
            const { error: removeError } = await supabase.storage
              .from(PRODUCT_BUCKET)
              .remove([path]);
            if (removeError) {
              console.warn('Failed to delete old image:', removeError);
            } else {
              console.log('Old image deleted successfully');
            }
          }
        }

        // Upload new image
        const fileName = `${Date.now()}_${data.image.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        console.log('Uploading new image:', fileName);
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(PRODUCT_BUCKET)
          .upload(fileName, data.image, {
            cacheControl: '3600',
            upsert: false
          });
          
        if (uploadError) {
          console.error('Update upload error:', uploadError);
          throw new Error(`Upload failed: ${uploadError.message} (code: ${uploadError.code})`);
        }

        console.log('Upload successful:', uploadData);

        const { data: { publicUrl } } = supabase.storage
          .from(PRODUCT_BUCKET)
          .getPublicUrl(uploadData.path);
        imageUrl = publicUrl;
        console.log('New public URL:', imageUrl);
        
      } else if (data.image === null) {
        // Remove existing image if explicitly cleared
        console.log('Clearing existing image for product ID:', id);
        const { data: current, error: fetchError } = await supabase
          .from('products')
          .select('image_url')
          .eq('id', id)
          .single();
          
        if (fetchError) {
          console.error('Error fetching current product:', fetchError);
          throw new Error(`Fetch current product failed: ${fetchError.message} (code: ${fetchError.code})`);
        }

        if (current?.image_url) {
          const path = current.image_url.split(`/storage/v1/object/public/${PRODUCT_BUCKET}/`)?.[1];
          if (path) {
            console.log('Deleting image:', path);
            const { error: removeError } = await supabase.storage
              .from(PRODUCT_BUCKET)
              .remove([path]);
            if (removeError) {
              console.warn('Failed to delete image:', removeError);
            } else {
              console.log('Image deleted successfully');
            }
          }
        }
        imageUrl = null;
      }

      const updates: ProductUpdate = { 
        title: data.title.trim(), 
        description: data.description || null,
        image_url: imageUrl !== undefined ? imageUrl : undefined,
        video_url: data.video_url || null,
        updated_at: new Date().toISOString()
      };

      console.log('Updating product with:', updates);

      const { data: productData, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
        
      if (error) {
        console.error('Database update error:', error);
        throw new Error(`Database update failed: ${error.message} (code: ${error.code})`);
      }

      console.log('Product updated successfully:', productData);
      setProducts(prev => prev.map(p => p.id === id ? productData : p));
      
      return { data: productData, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      console.error('Update product error:', errorMessage);
      setError(errorMessage);
      return { data: null, error: errorMessage };
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setError(null);
      console.log('Deleting product ID:', id);
      
      // Get current product data to delete image if needed
      const { data: current, error: fetchError } = await supabase
        .from('products')
        .select('image_url')
        .eq('id', id)
        .single();
        
      if (fetchError) {
        console.error('Error fetching product for deletion:', fetchError);
        throw new Error(`Fetch product failed: ${fetchError.message} (code: ${fetchError.code})`);
      }

      // Delete image from storage if it exists
      if (current?.image_url) {
        const path = current.image_url.split(`/storage/v1/object/public/${PRODUCT_BUCKET}/`)?.[1];
        if (path) {
          console.log('Deleting image:', path);
          const { error: removeError } = await supabase.storage
            .from(PRODUCT_BUCKET)
            .remove([path]);
          if (removeError) {
            console.warn('Failed to delete image:', removeError);
          } else {
            console.log('Image deleted successfully');
          }
        }
      }

      // Delete from database
      console.log('Deleting product from database');
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
        
      if (error) {
        console.error('Database delete error:', error);
        throw new Error(`Database delete failed: ${error.message} (code: ${error.code})`);
      }

      console.log('Product deleted successfully');
      setProducts(prev => prev.filter(p => p.id !== id));
      
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      console.error('Delete product error:', errorMessage);
      setError(errorMessage);
      return { error: errorMessage };
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts
  };
};

































// import { useState, useEffect } from 'react';
// import { supabase } from '@/integrations/supabase/client';
// import { Database } from '@/integrations/supabase/types';

// type Product = Database['public']['Tables']['products']['Row'];
// type ProductInsert = Database['public']['Tables']['products']['Insert'];
// type ProductUpdate = Database['public']['Tables']['products']['Update'];

// export const useProducts = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const { data, error } = await supabase
//         .from('products')
//         .select('*')
//         .order('created_at', { ascending: false });

//       if (error) throw error;
//       setProducts(data || []);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addProduct = async (product: Omit<ProductInsert, 'id' | 'created_at' | 'updated_at'>) => {
//     try {
//       const { data, error } = await supabase
//         .from('products')
//         .insert([product])
//         .select()
//         .single();

//       if (error) throw error;
//       setProducts(prev => [data, ...prev]);
//       return { data, error: null };
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : 'An error occurred';
//       setError(errorMessage);
//       return { data: null, error: errorMessage };
//     }
//   };

//   const updateProduct = async (id: string, updates: ProductUpdate) => {
//     try {
//       const { data, error } = await supabase
//         .from('products')
//         .update({ ...updates, updated_at: new Date().toISOString() })
//         .eq('id', id)
//         .select()
//         .single();

//       if (error) throw error;
//       setProducts(prev => prev.map(p => p.id === id ? data : p));
//       return { data, error: null };
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : 'An error occurred';
//       setError(errorMessage);
//       return { data: null, error: errorMessage };
//     }
//   };

//   const deleteProduct = async (id: string) => {
//     try {
//       const { error } = await supabase
//         .from('products')
//         .delete()
//         .eq('id', id);

//       if (error) throw error;
//       setProducts(prev => prev.filter(p => p.id !== id));
//       return { error: null };
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : 'An error occurred';
//       setError(errorMessage);
//       return { error: errorMessage };
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return {
//     products,
//     loading,
//     error,
//     addProduct,
//     updateProduct,
//     deleteProduct,
//     refetch: fetchProducts
//   };
// };
