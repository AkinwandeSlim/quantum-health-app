import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Play } from "lucide-react";
import { useVideos } from "@/hooks/useVideos";
import VideoForm from "@/components/VideoForm";

const VideosTab = () => {
  const { videos, addVideo, updateVideo, deleteVideo } = useVideos();
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const handleVideoSubmit = async (data: { title: string; type: 'url' | 'upload'; urlOrFile: string | File; duration?: string }) => {
    setIsSubmitting(true);
    try {
      if (editingVideo) {
        await updateVideo(editingVideo.id, data.title, data.type, data.urlOrFile, data.duration);
      } else {
        await addVideo(data.title, data.type, data.urlOrFile, data.duration);
      }
      setShowVideoForm(false);
      setEditingVideo(null);
    } catch (error) {
      console.error('Error saving video:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditVideo = (video: any) => {
    setEditingVideo(video);
    setShowVideoForm(true);
  };

  const handleDeleteVideo = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial video?')) {
      await deleteVideo(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Testimonial Videos Management</h2>
        <Button
          onClick={() => setShowVideoForm(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Video
        </Button>
      </div>
      {showVideoForm && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <VideoForm
            video={editingVideo}
            onSubmit={handleVideoSubmit}
            onCancel={() => {
              setShowVideoForm(false);
              setEditingVideo(null);
            }}
            isLoading={isSubmitting}
          />
        </div>
      )}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div
                className="relative w-full h-48 bg-gray-200 flex items-center justify-center cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                <Play className="h-12 w-12 text-white bg-green-600/80 rounded-full p-3" />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditVideo(video);
                    }}
                    className="bg-white"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteVideo(video.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg truncate">{video.title}</h3>
                {video.duration && (
                  <p className="text-gray-600 text-sm">Duration: {video.duration}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {videos.length === 0 && (
          <p className="text-gray-500 text-center py-8 col-span-full">
            No testimonial videos yet. Add your first video to get started.
          </p>
        )}
      </div>

      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {selectedVideo?.type === 'url' && (selectedVideo.url.includes('youtube.com') || selectedVideo.url.includes('youtu.be')) ? (
              <iframe
                src={selectedVideo.url}
                className="w-full aspect-video"
                allowFullScreen
              />
            ) : (
              <video
                src={selectedVideo?.url}
                controls
                autoPlay
                className="w-full max-h-[60vh] bg-black"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideosTab;
















// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Plus, Edit, Trash2 } from "lucide-react";
// import { useVideos } from "@/hooks/useVideos";
// import VideoForm from "@/components/VideoForm";

// const VideosTab = () => {
//   const { videos, addVideo, updateVideo, deleteVideo } = useVideos();
//   const [showVideoForm, setShowVideoForm] = useState(false);
//   const [editingVideo, setEditingVideo] = useState<any>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleVideoSubmit = async (videoData: any) => {
//     setIsSubmitting(true);
//     try {
//       if (editingVideo) {
//         await updateVideo(editingVideo.id, videoData);
//       } else {
//         await addVideo(videoData);
//       }
//       setShowVideoForm(false);
//       setEditingVideo(null);
//     } catch (error) {
//       console.error('Error saving video:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleEditVideo = (video: any) => {
//     setEditingVideo(video);
//     setShowVideoForm(true);
//   };

//   const handleDeleteVideo = async (id: string) => {
//     if (window.confirm('Are you sure you want to delete this video?')) {
//       await deleteVideo(id);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-bold">Videos Management</h2>
//         <Button
//           onClick={() => setShowVideoForm(true)}
//           className="bg-green-600 hover:bg-green-700"
//         >
//           <Plus className="h-4 w-4 mr-2" />
//           Add Video
//         </Button>
//       </div>

//       {showVideoForm && (
//         <div className="border rounded-lg p-4 bg-gray-50">
//           <VideoForm
//             video={editingVideo}
//             onSubmit={handleVideoSubmit}
//             onCancel={() => {
//               setShowVideoForm(false);
//               setEditingVideo(null);
//             }}
//             isLoading={isSubmitting}
//           />
//         </div>
//       )}

//       <div className="grid gap-4">
//         {videos.map((video) => (
//           <Card key={video.id}>
//             <CardContent className="p-4">
//               <div className="flex justify-between items-start">
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-lg">{video.title}</h3>
//                   <p className="text-gray-600 mt-1 text-sm">{video.url}</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     onClick={() => handleEditVideo(video)}
//                   >
//                     <Edit className="h-3 w-3" />
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="destructive"
//                     onClick={() => handleDeleteVideo(video.id)}
//                   >
//                     <Trash2 className="h-3 w-3" />
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//         {videos.length === 0 && (
//           <p className="text-gray-500 text-center py-8">
//             No videos yet. Add your first video to get started.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VideosTab;
