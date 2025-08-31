import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Play } from "lucide-react";
import { useVideos } from "@/hooks/useVideos";
import { useSiteInfo } from "@/hooks/useSiteInfo";

const VideoSection = () => {
  const { videos, loading: videosLoading } = useVideos();
  const { siteInfo, loading: siteInfoLoading } = useSiteInfo();
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  if (videosLoading || siteInfoLoading) {
    return (
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-lg text-gray-600">Loading videos...</div>
        </div>
      </section>
    );
  }

  const headline = siteInfo.video_headline || "Watch Real Transformation Stories";
  const description = siteInfo.video_description || "See how quantum healing has changed lives across Nigeria. Watch testimonials from real people who experienced remarkable health improvements.";

  if (videos.length === 0) {
    return (
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
            {headline}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Videos will appear here once they are added by an administrator.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
            {headline}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <Card key={video.id} className="shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                <div
                  className="relative w-full h-48 bg-gray-200 flex items-center justify-center cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                >
                  <Play className="h-12 w-12 text-white bg-green-600/80 rounded-full p-3" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-green-800 truncate">{video.title}</h3>
                  {video.duration && (
                    <p className="text-gray-600 text-sm">Duration: {video.duration}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
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
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
    </section>
  );
};

export default VideoSection;

