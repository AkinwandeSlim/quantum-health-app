
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, Eye, ArrowRight, Edit, Plus } from "lucide-react";
import { useState } from "react";

const BlogSection = () => {
  const [editMode, setEditMode] = useState(false);

  const blogPosts = [
    {
      id: 1,
      title: "The Science Behind Quantum Healing: How Energy Medicine Works",
      excerpt: "Discover the revolutionary scientific principles that make quantum healing possible and why traditional medicine is taking notice of energy-based treatments.",
      author: "Dr. Sarah Adebayo",
      date: "2024-06-20",
      readTime: "8 min read",
      views: 1250,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=600",
      category: "Science",
      featured: true
    },
    {
      id: 2,
      title: "5 Natural Ways to Boost Your Family's Immune System",
      excerpt: "Learn practical, natural methods to strengthen your family's immunity using quantum-enhanced nutrition and lifestyle changes that really work.",
      author: "Grace Okonkwo",
      date: "2024-06-18",
      readTime: "6 min read",
      views: 980,
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=600",
      category: "Health Tips",
      featured: false
    },
    {
      id: 3,
      title: "Overcoming Chronic Fatigue: A Personal Journey with Quantum Therapy",
      excerpt: "A mother of three shares her incredible transformation from chronic exhaustion to vibrant health through quantum energy healing methods.",
      author: "Amaka Johnson",
      date: "2024-06-15",
      readTime: "10 min read",
      views: 2100,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b6e5?q=80&w=600",
      category: "Success Stories",
      featured: true
    },
    {
      id: 4,
      title: "Understanding Cellular Regeneration Through Quantum Energy",
      excerpt: "Explore how quantum energy activates your body's natural healing mechanisms at the cellular level for lasting health improvements.",
      author: "Dr. Michael Adeyemi",
      date: "2024-06-12",
      readTime: "12 min read",
      views: 1780,
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=600",
      category: "Science",
      featured: false
    },
    {
      id: 5,
      title: "Detoxing Your Home: Creating a Quantum-Clean Environment",
      excerpt: "Simple steps to eliminate toxins from your living space and create an environment that supports natural healing and family wellness.",
      author: "Elizabeth Nkem",
      date: "2024-06-10",
      readTime: "7 min read",
      views: 1350,
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=600",
      category: "Lifestyle",
      featured: false
    },
    {
      id: 6,
      title: "Children's Health Revolution: Natural Healing for the Next Generation",
      excerpt: "How quantum-enhanced natural healing is transforming children's health outcomes and giving families hope for a healthier future.",
      author: "Pastor David Olumide",
      date: "2024-06-08",
      readTime: "9 min read",
      views: 2450,
      image: "https://images.unsplash.com/photo-1519374348-7e80beb8eb60?q=80&w=600",
      category: "Family Health",
      featured: true
    }
  ];

  const categories = ["All", "Science", "Health Tips", "Success Stories", "Lifestyle", "Family Health"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <section 
      id="blog" 
      className="py-20 px-4 relative"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2000")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Admin Controls */}
        {editMode && (
          <div className="mb-8 bg-green-900/50 backdrop-blur-sm border border-green-400/30 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-green-300 font-semibold">Blog Management</h3>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Post
              </Button>
            </div>
          </div>
        )}

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Quantum Health
            <span className="bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
              {" "}Blog & Insights
            </span>
          </h2>
          <p className="text-xl text-green-100 max-w-4xl mx-auto leading-relaxed mb-8">
            Discover the latest insights, success stories, and scientific breakthroughs in quantum healing 
            and natural wellness for you and your family
          </p>

          {/* Edit Mode Toggle */}
          <Button
            onClick={() => setEditMode(!editMode)}
            variant="outline"
            className="border-green-400/40 text-green-400 hover:bg-green-800/30 mb-8"
          >
            <Edit className="h-4 w-4 mr-2" />
            {editMode ? "Exit Edit Mode" : "Edit Content"}
          </Button>
        </div>

        {/* Featured Posts */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Featured Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPosts.slice(0, 3).map((post) => (
              <Card 
                key={post.id}
                className="bg-green-900/30 backdrop-blur-sm border-green-400/40 hover:bg-green-800/35 transition-all duration-300 group hover:scale-105"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 left-4 bg-green-600/80 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                      {post.category}
                    </div>
                    {editMode && (
                      <Button
                        size="sm"
                        className="absolute top-4 right-4 bg-blue-600/80 hover:bg-blue-700"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-green-300 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-green-100 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-green-300 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {post.views}
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full border-green-400/40 text-green-400 hover:bg-green-800/30"
                    >
                      Read Article
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={selectedCategory === category 
                ? "bg-green-600 hover:bg-green-700 text-white" 
                : "border-green-400/40 text-green-400 hover:bg-green-800/30"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* All Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Card 
              key={post.id}
              className="bg-green-900/20 backdrop-blur-sm border-green-400/30 hover:bg-green-800/25 transition-all duration-300 group hover:scale-105"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-3 left-3 bg-green-600/80 backdrop-blur-sm px-2 py-1 rounded text-white text-xs">
                    {post.category}
                  </div>
                  {post.featured && (
                    <div className="absolute top-3 right-3 bg-yellow-500/80 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-bold">
                      Featured
                    </div>
                  )}
                  {editMode && (
                    <Button
                      size="sm"
                      className="absolute bottom-3 right-3 bg-blue-600/80 hover:bg-blue-700"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                
                <div className="p-4">
                  <h4 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-green-300 transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-green-100 text-sm mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-green-300 mb-3">
                    <span>{post.readTime}</span>
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {post.views}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-green-400">
                      By {post.author}
                    </div>
                    <Button 
                      size="sm"
                      variant="ghost" 
                      className="text-green-400 hover:text-green-300 p-1"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-green-800/40 to-emerald-800/40 backdrop-blur-sm rounded-2xl p-8 border border-green-400/30 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Stay Updated with Quantum Health Insights
          </h3>
          <p className="text-green-100 text-lg leading-relaxed max-w-3xl mx-auto mb-6">
            Subscribe to our newsletter for weekly health tips, latest research, and exclusive content 
            about quantum healing and natural wellness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-green-400/30 text-white placeholder-green-300 focus:outline-none focus:border-green-400"
            />
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
