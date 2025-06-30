
import { Card, CardContent } from "@/components/ui/card";
import { useVideos } from "@/hooks/useVideos";
import { useSiteInfo } from "@/hooks/useSiteInfo";

const VideoSection = () => {
  const { videos, loading: videosLoading } = useVideos();
  const { siteInfo, loading: siteInfoLoading } = useSiteInfo();

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video) => (
            <Card key={video.id} className="shadow-2xl">
              <CardContent className="p-0">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={video.url}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-green-800">{video.title}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
