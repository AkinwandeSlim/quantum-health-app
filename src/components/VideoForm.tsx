import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, Play, Trash2, AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface VideoFormProps {
  video?: any;
  onSubmit: (data: { title: string; type: 'url' | 'upload'; urlOrFile: string | File; duration?: string }) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const VideoForm = ({ video, onSubmit, onCancel, isLoading }: VideoFormProps) => {
  const [formData, setFormData] = useState({
    title: video?.title || "",
    type: (video?.type as 'url' | 'upload') || "url",
    url: video?.url || "",
    file: null as File | null,
    duration: video?.duration || "",
  });
  const [previewUrl, setPreviewUrl] = useState<string>(video?.url || "");
  const [submitError, setSubmitError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov'];
      const maxSize = 100 * 1024 * 1024; // 100MB
      
      if (!allowedTypes.includes(file.type)) {
        toast({ 
          title: "Error", 
          description: "Please select a valid video file (MP4, WebM, OGG, AVI, MOV)", 
          variant: "destructive" 
        });
        return;
      }
      
      if (file.size > maxSize) {
        toast({ 
          title: "Error", 
          description: "File size must be less than 100MB", 
          variant: "destructive" 
        });
        return;
      }

      // Clean up previous preview URL
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }

      setFormData(prev => ({ ...prev, file }));
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Get video duration
      const videoElement = document.createElement('video');
      videoElement.preload = 'metadata';
      
      const cleanup = () => {
        URL.revokeObjectURL(videoElement.src);
      };
      
      videoElement.onloadedmetadata = () => {
        const duration = Math.round(videoElement.duration);
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        setFormData(prev => ({
          ...prev,
          duration: `${minutes}:${seconds.toString().padStart(2, '0')}`,
        }));
        cleanup();
      };
      
      videoElement.onerror = () => {
        console.error('Error loading video metadata');
        cleanup();
      };
      
      videoElement.src = objectUrl;
    }
  };

  const handleTypeChange = (type: string) => {
    const newType = type as 'url' | 'upload';
    setFormData(prev => ({
      ...prev,
      type: newType,
      file: null,
      url: newType === 'url' ? prev.url : '',
      duration: newType === 'url' ? prev.duration : '',
    }));
    
    if (newType === 'url') {
      setPreviewUrl(formData.url);
    } else {
      setPreviewUrl('');
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = () => {
    // Clean up blob URL before removing
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    
    setFormData(prev => ({ ...prev, file: null, duration: '' }));
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setSubmitError("Video title is required");
      return false;
    }
    
    if (formData.type === 'upload' && !formData.file) {
      setSubmitError("A video file is required for uploads");
      return false;
    }
    
    if (formData.type === 'url' && !formData.url.trim()) {
      setSubmitError("A video URL is required");
      return false;
    }
    
    // Basic URL validation for URL type
    if (formData.type === 'url') {
      try {
        new URL(formData.url);
      } catch {
        setSubmitError("Please enter a valid URL");
        return false;
      }
    }
    
    setSubmitError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      console.log('Submitting form data:', {
        title: formData.title,
        type: formData.type,
        urlOrFile: formData.type === 'url' ? formData.url : formData.file,
        duration: formData.duration
      });

      await onSubmit({
        title: formData.title.trim(),
        type: formData.type,
        urlOrFile: formData.type === 'url' ? formData.url.trim() : formData.file!,
        duration: formData.duration || undefined,
      });

      toast({
        title: "Success",
        description: video ? "Video updated successfully!" : "Video added successfully!",
      });

    } catch (error) {
      console.error('Submit error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setSubmitError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData(prev => ({ ...prev, url }));
    
    // Update preview for valid URLs
    if (url.trim()) {
      setPreviewUrl(url);
    } else {
      setPreviewUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitError && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">{submitError}</span>
        </div>
      )}

      <div>
        <Label htmlFor="title">Testimonial Video Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
          placeholder="Enter video title"
          className="mt-1"
        />
      </div>

      <div>
        <Label>Video Source</Label>
        <RadioGroup
          value={formData.type}
          onValueChange={handleTypeChange}
          className="flex gap-6 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="url" id="url" />
            <Label htmlFor="url">YouTube/URL</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="upload" id="upload" />
            <Label htmlFor="upload">Upload File</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.type === 'url' ? (
        <div>
          <Label htmlFor="video-url">Video URL</Label>
          <Input
            id="video-url"
            value={formData.url}
            onChange={handleUrlChange}
            placeholder="https://www.youtube.com/embed/VIDEO_ID or https://example.com/video.mp4"
            required
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            For YouTube videos, use the embed URL format
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <Label htmlFor="video-file">Upload Testimonial Video</Label>
            <div className="mt-2">
              {!formData.file ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-400 transition-colors"
                >
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    MP4, WebM, OGG, AVI, MOV up to 100MB
                  </p>
                </div>
              ) : (
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Play className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-sm">{formData.file.name}</p>
                        <p className="text-xs text-gray-500">
                          {(formData.file.size / (1024 * 1024)).toFixed(2)} MB
                          {formData.duration && ` • ${formData.duration}`}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={removeFile}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/webm,video/ogg,video/avi,video/mov"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        </div>
      )}

      {/* Duration input for URL videos */}
      {formData.type === 'url' && (
        <div>
          <Label htmlFor="duration">Duration (optional)</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
            placeholder="e.g., 2:30"
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Format: MM:SS (e.g., 2:30 for 2 minutes 30 seconds)
          </p>
        </div>
      )}

      {previewUrl && (
        <div>
          <Label>Preview</Label>
          <div className="mt-2 border rounded-lg overflow-hidden">
            {formData.type === 'url' && (formData.url.includes('youtube.com') || formData.url.includes('youtu.be')) ? (
              <iframe
                src={formData.url}
                className="w-full aspect-video"
                allowFullScreen
                title="Video preview"
              />
            ) : (
              <video
                src={previewUrl}
                controls
                className="w-full max-h-64 bg-black"
                onError={(e) => {
                  console.error('Video preview error:', e);
                  setPreviewUrl('');
                }}
              />
            )}
          </div>
        </div>
      )}

      <div className="flex gap-2 pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700"
        >
          {isLoading ? "Saving..." : video ? "Update Video" : "Add Video"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default VideoForm;



















// import { useState, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Upload, Play, Trash2 } from "lucide-react";

// interface VideoFormProps {
//   video?: any;
//   onSubmit: (data: any) => Promise<void>;
//   onCancel: () => void;
//   isLoading?: boolean;
// }

// const VideoForm = ({ video, onSubmit, onCancel, isLoading }: VideoFormProps) => {
//   const [formData, setFormData] = useState({
//     title: video?.title || "",
//     url: video?.url || "",
//     type: video?.type || "url", // 'url' or 'upload'
//     file: null as File | null,
//     duration: video?.duration || "",
//     thumbnail: video?.thumbnail || ""
//   });

//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [previewUrl, setPreviewUrl] = useState<string>(video?.url || "");
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       // Validate file type
//       const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov'];
//       if (!allowedTypes.includes(file.type)) {
//         alert('Please select a valid video file (MP4, WebM, OGG, AVI, MOV)');
//         return;
//       }

//       // Validate file size (100MB limit)
//       const maxSize = 100 * 1024 * 1024; // 100MB
//       if (file.size > maxSize) {
//         alert('File size must be less than 100MB');
//         return;
//       }

//       setFormData({ ...formData, file });
      
//       // Create preview URL
//       const url = URL.createObjectURL(file);
//       setPreviewUrl(url);

//       // Get video duration
//       const video = document.createElement('video');
//       video.preload = 'metadata';
//       video.onloadedmetadata = () => {
//         const duration = Math.round(video.duration);
//         const minutes = Math.floor(duration / 60);
//         const seconds = duration % 60;
//         setFormData(prev => ({ 
//           ...prev, 
//           duration: `${minutes}:${seconds.toString().padStart(2, '0')}` 
//         }));
//       };
//       video.src = url;
//     }
//   };

//   const handleTypeChange = (type: string) => {
//     setFormData({ 
//       ...formData, 
//       type,
//       file: null,
//       url: type === 'url' ? formData.url : ''
//     });
//     setPreviewUrl(type === 'url' ? formData.url : '');
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const removeFile = () => {
//     setFormData({ ...formData, file: null });
//     setPreviewUrl('');
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const simulateUpload = (file: File): Promise<string> => {
//     return new Promise((resolve) => {
//       const interval = setInterval(() => {
//         setUploadProgress(prev => {
//           const next = prev + 10;
//           if (next >= 100) {
//             clearInterval(interval);
//             // Simulate returning a URL where the video would be stored
//             resolve(`/uploads/videos/${file.name}`);
//             return 100;
//           }
//           return next;
//         });
//       }, 200);
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     let videoUrl = formData.url;
    
//     // If uploading a file, simulate the upload process
//     if (formData.type === 'upload' && formData.file) {
//       try {
//         setUploadProgress(0);
//         videoUrl = await simulateUpload(formData.file);
//       } catch (error) {
//         console.error('Upload failed:', error);
//         alert('Upload failed. Please try again.');
//         return;
//       }
//     }

//     const videoData = {
//       title: formData.title,
//       url: videoUrl,
//       type: formData.type,
//       duration: formData.duration,
//       thumbnail: formData.thumbnail,
//       fileSize: formData.file ? Math.round(formData.file.size / (1024 * 1024)) : null,
//       uploadDate: new Date().toISOString()
//     };

//     await onSubmit(videoData);
//     setUploadProgress(0);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div>
//         <Label htmlFor="title">Video Title</Label>
//         <Input
//           id="title"
//           value={formData.title}
//           onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//           required
//           placeholder="Enter video title"
//         />
//       </div>

//       <div>
//         <Label>Video Source</Label>
//         <RadioGroup 
//           value={formData.type} 
//           onValueChange={handleTypeChange}
//           className="flex gap-6 mt-2"
//         >
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem value="url" id="url" />
//             <Label htmlFor="url">YouTube/URL</Label>
//           </div>
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem value="upload" id="upload" />
//             <Label htmlFor="upload">Upload File</Label>
//           </div>
//         </RadioGroup>
//       </div>

//       {formData.type === 'url' ? (
//         <div>
//           <Label htmlFor="video-url">Video URL</Label>
//           <Input
//             id="video-url"
//             value={formData.url}
//             onChange={(e) => setFormData({ ...formData, url: e.target.value })}
//             placeholder="https://www.youtube.com/embed/VIDEO_ID or https://example.com/video.mp4"
//             required
//           />
//         </div>
//       ) : (
//         <div className="space-y-4">
//           <div>
//             <Label htmlFor="video-file">Upload Video File</Label>
//             <div className="mt-2">
//               {!formData.file ? (
//                 <div
//                   onClick={() => fileInputRef.current?.click()}
//                   className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-400 transition-colors"
//                 >
//                   <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
//                   <p className="text-sm text-gray-600">
//                     Click to upload or drag and drop
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">
//                     MP4, WebM, OGG, AVI, MOV up to 100MB
//                   </p>
//                 </div>
//               ) : (
//                 <div className="border rounded-lg p-4 bg-gray-50">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <Play className="h-5 w-5 text-green-600" />
//                       <div>
//                         <p className="font-medium text-sm">{formData.file.name}</p>
//                         <p className="text-xs text-gray-500">
//                           {(formData.file.size / (1024 * 1024)).toFixed(2)} MB
//                           {formData.duration && ` • ${formData.duration}`}
//                         </p>
//                       </div>
//                     </div>
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="sm"
//                       onClick={removeFile}
//                     >
//                       <Trash2 className="h-3 w-3" />
//                     </Button>
//                   </div>
                  
//                   {uploadProgress > 0 && uploadProgress < 100 && (
//                     <div className="mt-3">
//                       <div className="bg-gray-200 rounded-full h-2">
//                         <div 
//                           className="bg-green-600 h-2 rounded-full transition-all duration-300"
//                           style={{ width: `${uploadProgress}%` }}
//                         ></div>
//                       </div>
//                       <p className="text-xs text-gray-600 mt-1">Uploading... {uploadProgress}%</p>
//                     </div>
//                   )}
//                 </div>
//               )}
              
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="video/*"
//                 onChange={handleFileChange}
//                 className="hidden"
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Preview Section */}
//       {previewUrl && (
//         <div>
//           <Label>Preview</Label>
//           <div className="mt-2 border rounded-lg overflow-hidden">
//             {formData.type === 'upload' ? (
//               <video 
//                 src={previewUrl} 
//                 controls 
//                 className="w-full max-h-64 bg-black"
//               />
//             ) : (
//               <div className="aspect-video bg-gray-100 flex items-center justify-center">
//                 {formData.url.includes('youtube.com') || formData.url.includes('youtu.be') ? (
//                   <iframe
//                     src={formData.url}
//                     className="w-full h-full"
//                     allowFullScreen
//                   />
//                 ) : (
//                   <video 
//                     src={formData.url} 
//                     controls 
//                     className="w-full h-full"
//                   />
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       <div className="flex gap-2 pt-4">
//         <Button 
//           type="submit" 
//           disabled={isLoading || (uploadProgress > 0 && uploadProgress < 100)}
//           className="bg-green-600 hover:bg-green-700"
//         >
//           {isLoading ? "Saving..." : video ? "Update Video" : "Add Video"}
//         </Button>
//         <Button type="button" variant="outline" onClick={onCancel}>
//           Cancel
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default VideoForm;




















// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// interface VideoFormProps {
//   video?: any;
//   onSubmit: (data: any) => Promise<void>;
//   onCancel: () => void;
//   isLoading?: boolean;
// }

// const VideoForm = ({ video, onSubmit, onCancel, isLoading }: VideoFormProps) => {
//   const [formData, setFormData] = useState({
//     title: video?.title || "",
//     url: video?.url || ""
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <Label htmlFor="title">Video Title</Label>
//         <Input
//           id="title"
//           value={formData.title}
//           onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//           required
//         />
//       </div>
      
//       <div>
//         <Label htmlFor="url">Video URL (YouTube embed or direct link)</Label>
//         <Input
//           id="url"
//           value={formData.url}
//           onChange={(e) => setFormData({ ...formData, url: e.target.value })}
//           placeholder="https://www.youtube.com/embed/VIDEO_ID"
//           required
//         />
//       </div>

//       <div className="flex gap-2">
//         <Button type="submit" disabled={isLoading}>
//           {isLoading ? "Saving..." : video ? "Update Video" : "Add Video"}
//         </Button>
//         <Button type="button" variant="outline" onClick={onCancel}>
//           Cancel
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default VideoForm;
