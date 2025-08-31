import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Video = Database['public']['Tables']['videos']['Row'];
type VideoInsert = Database['public']['Tables']['videos']['Insert'];
type VideoUpdate = Database['public']['Tables']['videos']['Update'];

const VIDEO_BUCKET = 'videos';

export const useVideos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching videos:', error);
        throw error;
      }
      
      console.log('Fetched videos:', data); // Debug log
      setVideos(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      console.error('Fetch videos error:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const addVideo = async (title: string, type: 'url' | 'upload', urlOrFile: string | File, duration?: string) => {
    try {
      setError(null);
      let videoUrl = '';

      if (type === 'upload' && urlOrFile instanceof File) {
        console.log('Uploading file:', urlOrFile.name);
        
        // Verify bucket is accessible
        const { data: bucketFiles, error: bucketError } = await supabase.storage
          .from(VIDEO_BUCKET)
          .list('', { limit: 1 });
          
        if (bucketError) {
          console.error('Bucket access error:', bucketError);
          throw new Error('Cannot access video storage bucket. Check your RLS policies.');
        }
        
        console.log('Video bucket is accessible');

        const fileName = `${Date.now()}_${urlOrFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(VIDEO_BUCKET)
          .upload(fileName, urlOrFile, {
            cacheControl: '3600',
            upsert: false
          });
          
        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw new Error('Upload failed: ' + uploadError.message);
        }

        console.log('Upload successful:', uploadData);

        const { data: { publicUrl } } = supabase.storage
          .from(VIDEO_BUCKET)
          .getPublicUrl(uploadData.path);
          
        videoUrl = publicUrl;
        console.log('Public URL:', videoUrl);
        
      } else if (type === 'url' && typeof urlOrFile === 'string') {
        videoUrl = urlOrFile;
      } else {
        throw new Error('Invalid input for video');
      }

      // Prepare the insert data
      const videoInsert: VideoInsert = {
        title: title.trim(),
        url: videoUrl,
        type,
        duration: duration || null,
      };

      console.log('Inserting video data:', videoInsert);

      const { data, error } = await supabase
        .from('videos')
        .insert([videoInsert])
        .select()
        .single();
        
      if (error) {
        console.error('Database insert error:', error);
        throw new Error('Database insert failed: ' + error.message);
      }

      console.log('Video inserted successfully:', data);
      
      // Refresh the videos list to ensure UI updates
      await fetchVideos();
      
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      console.error('Add video error:', errorMessage);
      setError(errorMessage);
      return { data: null, error: errorMessage };
    }
  };

  const updateVideo = async (id: string, title: string, type: 'url' | 'upload', urlOrFile?: string | File, duration?: string) => {
    try {
      setError(null);
      let videoUrl: string | undefined = undefined;

      if (type === 'upload' && urlOrFile instanceof File) {
        // Get current video data
        const { data: current, error: fetchError } = await supabase
          .from('videos')
          .select('url, type')
          .eq('id', id)
          .single();
          
        if (fetchError) {
          console.error('Error fetching current video:', fetchError);
          throw fetchError;
        }

        // Delete old file if it was an upload
        if (current?.type === 'upload' && current.url) {
          const path = current.url.split(`/storage/v1/object/public/${VIDEO_BUCKET}/`)?.[1];
          if (path) {
            const { error: removeError } = await supabase.storage
              .from(VIDEO_BUCKET)
              .remove([path]);
            if (removeError) {
              console.warn('Failed to delete old video file:', removeError);
            }
          }
        }

        // Upload new file
        const fileName = `${Date.now()}_${urlOrFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(VIDEO_BUCKET)
          .upload(fileName, urlOrFile, {
            cacheControl: '3600',
            upsert: false
          });
          
        if (uploadError) {
          console.error('Update upload error:', uploadError);
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from(VIDEO_BUCKET)
          .getPublicUrl(uploadData.path);
        videoUrl = publicUrl;
        
      } else if (type === 'url' && typeof urlOrFile === 'string') {
        videoUrl = urlOrFile;
      }

      const updates: VideoUpdate = { 
        title: title.trim(), 
        type, 
        duration: duration || null,
        updated_at: new Date().toISOString()
      };
      
      if (videoUrl) {
        updates.url = videoUrl;
      }

      console.log('Updating video with:', updates);

      const { data, error } = await supabase
        .from('videos')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
        
      if (error) {
        console.error('Database update error:', error);
        throw error;
      }

      console.log('Video updated successfully:', data);
      setVideos(prev => prev.map(v => v.id === id ? data : v));
      
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      console.error('Update video error:', errorMessage);
      setError(errorMessage);
      return { data: null, error: errorMessage };
    }
  };

  const deleteVideo = async (id: string) => {
    try {
      setError(null);
      
      // Get current video data to delete file if needed
      const { data: current, error: fetchError } = await supabase
        .from('videos')
        .select('url, type')
        .eq('id', id)
        .single();
        
      if (fetchError) {
        console.error('Error fetching video for deletion:', fetchError);
        throw fetchError;
      }

      // Delete file from storage if it was an upload
      if (current?.type === 'upload' && current.url) {
        const path = current.url.split(`/storage/v1/object/public/${VIDEO_BUCKET}/`)?.[1];
        if (path) {
          const { error: removeError } = await supabase.storage
            .from(VIDEO_BUCKET)
            .remove([path]);
          if (removeError) {
            console.warn('Failed to delete video file:', removeError);
          }
        }
      }

      // Delete from database
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', id);
        
      if (error) {
        console.error('Database delete error:', error);
        throw error;
      }

      console.log('Video deleted successfully');
      setVideos(prev => prev.filter(v => v.id !== id));
      
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      console.error('Delete video error:', errorMessage);
      setError(errorMessage);
      return { error: errorMessage };
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return {
    videos,
    loading,
    error,
    addVideo,
    updateVideo,
    deleteVideo,
    refetch: fetchVideos
  };
};














// import { useState, useEffect } from 'react';
// import { supabase } from '@/integrations/supabase/client';
// import { Database } from '@/integrations/supabase/types';

// type Video = Database['public']['Tables']['videos']['Row'];
// type VideoInsert = Database['public']['Tables']['videos']['Insert'];
// type VideoUpdate = Database['public']['Tables']['videos']['Update'];

// export const useVideos = () => {
//   const [videos, setVideos] = useState<Video[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchVideos = async () => {
//     try {
//       setLoading(true);
//       const { data, error } = await supabase
//         .from('videos')
//         .select('*')
//         .order('created_at', { ascending: false });

//       if (error) throw error;
//       setVideos(data || []);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addVideo = async (video: Omit<VideoInsert, 'id' | 'created_at' | 'updated_at'>) => {
//     try {
//       const { data, error } = await supabase
//         .from('videos')
//         .insert([video])
//         .select()
//         .single();

//       if (error) throw error;
//       setVideos(prev => [data, ...prev]);
//       return { data, error: null };
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : 'An error occurred';
//       setError(errorMessage);
//       return { data: null, error: errorMessage };
//     }
//   };

//   const updateVideo = async (id: string, updates: VideoUpdate) => {
//     try {
//       const { data, error } = await supabase
//         .from('videos')
//         .update({ ...updates, updated_at: new Date().toISOString() })
//         .eq('id', id)
//         .select()
//         .single();

//       if (error) throw error;
//       setVideos(prev => prev.map(v => v.id === id ? data : v));
//       return { data, error: null };
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : 'An error occurred';
//       setError(errorMessage);
//       return { data: null, error: errorMessage };
//     }
//   };

//   const deleteVideo = async (id: string) => {
//     try {
//       const { error } = await supabase
//         .from('videos')
//         .delete()
//         .eq('id', id);

//       if (error) throw error;
//       setVideos(prev => prev.filter(v => v.id !== id));
//       return { error: null };
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : 'An error occurred';
//       setError(errorMessage);
//       return { error: errorMessage };
//     }
//   };

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   return {
//     videos,
//     loading,
//     error,
//     addVideo,
//     updateVideo,
//     deleteVideo,
//     refetch: fetchVideos
//   };
// };
