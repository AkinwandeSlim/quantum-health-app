
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Users, Star, Phone, Mail, MapPin, Search, Calendar, Tag } from "lucide-react";

const BlogSidebar = () => {
  const recentPosts = [
    {
      title: "5 Natural Ways to Boost Your Immune System",
      date: "Dec 20, 2024",
      views: "1,234"
    },
    {
      title: "Quantum Energy: The Future of Medicine",
      date: "Dec 18, 2024", 
      views: "2,156"
    },
    {
      title: "Healing Diabetes Naturally: A Complete Guide",
      date: "Dec 15, 2024",
      views: "3,421"
    },
    {
      title: "Understanding Energy Medicine in Africa",
      date: "Dec 12, 2024",
      views: "1,876"
    }
  ];

  const categories = [
    { name: "Quantum Healing", count: 24 },
    { name: "Natural Health", count: 18 },
    { name: "Energy Medicine", count: 15 },
    { name: "Wellness Tips", count: 12 },
    { name: "Success Stories", count: 9 },
    { name: "Product Reviews", count: 6 }
  ];

  const testimonials = [
    {
      name: "Amaka Okafor",
      location: "Enugu",
      text: "Quantum healing changed my family's life completely!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b6e5?q=80&w=100"
    },
    {
      name: "Dr. Bola Adeyemi", 
      location: "Lagos",
      text: "As a doctor, I now recommend quantum therapy to my patients.",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=100"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card className="bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Search Articles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input placeholder="Search health topics..." className="flex-1" />
            <Button className="bg-green-600 hover:bg-green-700">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center">
            <Heart className="h-5 w-5 mr-2" />
            About RaphaWellness
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <img 
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=100" 
              alt="Dr. Funmilayo"
              className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-green-300"
            />
            <h4 className="font-bold text-green-800">Dr. Funmilayo Oladunjoye</h4>
            <p className="text-sm text-green-600">Quantum Health Specialist</p>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            With over 15 years of experience in natural healing, I've helped thousands of families 
            across Nigeria discover the power of quantum medicine.
          </p>
          <div className="flex justify-center gap-2">
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <Card className="bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Recent Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPosts.map((post, index) => (
              <div key={index} className="border-b border-green-100 pb-3 last:border-b-0">
                <h5 className="font-medium text-green-800 text-sm leading-tight mb-2 hover:text-green-600 cursor-pointer">
                  {post.title}
                </h5>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{post.date}</span>
                  <span>{post.views} views</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className="bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center">
            <Tag className="h-5 w-5 mr-2" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((category, index) => (
              <div key={index} className="flex justify-between items-center py-1 hover:bg-green-50 px-2 rounded cursor-pointer">
                <span className="text-sm text-gray-700">{category.name}</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Testimonials */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Quick Testimonials
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/70 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div>
                    <div className="font-medium text-sm text-blue-800">{testimonial.name}</div>
                    <div className="text-xs text-blue-600">{testimonial.location}</div>
                  </div>
                </div>
                <p className="text-xs text-gray-700 italic">"{testimonial.text}"</p>
                <div className="flex text-yellow-400 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card className="bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Phone className="h-5 w-5 mr-2" />
            Get In Touch
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-green-200" />
              <span>+234 805 546 2822</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-green-200" />
              <span>info@raphawellness.ng</span>
            </div>
            <div className="flex items-start">
              <MapPin className="h-4 w-4 mr-2 mt-0.5 text-green-200" />
              <span>4, Adegbola Street, Anifowose, Ikeja, Lagos</span>
            </div>
          </div>
          <Button className="w-full mt-4 bg-white text-green-700 hover:bg-green-50">
            Book Consultation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogSidebar;
