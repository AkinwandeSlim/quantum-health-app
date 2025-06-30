
import { Heart, Calendar, User, Eye } from "lucide-react";

const BlogHeader = () => {
  return (
    <div className="relative">
      {/* Hero Image Section */}
      <div 
        className="h-96 bg-cover bg-center relative"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=2000")',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-4xl px-4">
            <div className="flex justify-center mb-4">
              <Heart className="h-12 w-12 text-green-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Quantum Health
              </span>
            </h1>
            <p className="text-xl text-green-100 mb-6">
              Transform Your Life with Quantum Healing Technology
            </p>
          </div>
        </div>
      </div>

      {/* Blog Post Header */}
      <div className="bg-green-900/95 backdrop-blur-sm py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-4">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Health & Wellness
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            The Complete Guide to Quantum Healing: How Energy Medicine is Revolutionizing Health in Nigeria
          </h2>
          <div className="flex flex-wrap items-center gap-6 text-green-200 text-sm">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>Dr. Funmilayo Oladunjoye</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>December 24, 2024</span>
            </div>
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-2" />
              <span>2,847 views</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
