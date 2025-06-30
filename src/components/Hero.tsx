
import { Heart, Users, Leaf, Play, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=2000")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Quantum energy particles animation */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-emerald-400/15 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-teal-400/25 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-lime-400/20 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Heart className="h-16 w-16 text-green-400 animate-pulse" />
            <Leaf className="h-10 w-10 text-emerald-400 absolute -bottom-2 -left-2 animate-pulse delay-600" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Quantum Health
          </span>
          <br />
          <span className="text-3xl md:text-4xl">Knowledge & Transformation</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-green-100 mb-4 leading-relaxed">
          Are you seeking natural healing solutions that actually work?
        </p>
        <p className="text-lg md:text-xl text-green-200 mb-8 leading-relaxed max-w-4xl mx-auto">
          Discover <span className="font-semibold text-green-300">evidence-based quantum healing insights</span>, 
          real transformation stories, and natural health solutions that are changing lives across Nigeria and beyond
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-green-400/30">
            <BookOpen className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold">Expert Insights</h3>
            <p className="text-green-200 text-sm">Latest research & breakthrough discoveries</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-green-400/30">
            <Heart className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold">Real Stories</h3>
            <p className="text-green-200 text-sm">Genuine transformation testimonials</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-green-400/30">
            <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold">Community</h3>
            <p className="text-green-200 text-sm">Join 5000+ families on this journey</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Explore Products
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-green-400 text-green-300 hover:bg-green-400 hover:text-green-900 px-8 py-6 text-lg backdrop-blur-sm bg-white/10"
          >
            <Play className="h-5 w-5 mr-2" />
            Watch Testimonials
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center opacity-80">
          <div>
            <div className="text-2xl font-bold text-green-400">150+</div>
            <div className="text-green-200 text-sm">Products Available</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-400">5000+</div>
            <div className="text-green-200 text-sm">Happy Customers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-teal-400">25K+</div>
            <div className="text-green-200 text-sm">Lives Transformed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-lime-400">98%</div>
            <div className="text-green-200 text-sm">Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
