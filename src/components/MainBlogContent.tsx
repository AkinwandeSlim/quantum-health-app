
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Bookmark, ThumbsUp, MessageCircle, Zap, Heart, Leaf } from "lucide-react";

const MainBlogContent = () => {
  return (
    <div className="lg:col-span-2">
      <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
        <CardContent className="p-8">
          {/* Social Actions */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-green-100">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="text-green-600 border-green-200">
                <ThumbsUp className="h-4 w-4 mr-2" />
                124 Likes
              </Button>
              <Button variant="outline" size="sm" className="text-green-600 border-green-200">
                <MessageCircle className="h-4 w-4 mr-2" />
                18 Comments
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Are you tired of conventional medicine failing to address your chronic health issues? 
              Discover how quantum healing technology is transforming lives across Nigeria and providing 
              hope for those seeking natural, effective healing solutions.
            </p>

            <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
              <Zap className="h-6 w-6 mr-2 text-yellow-500" />
              What is Quantum Healing?
            </h3>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Quantum healing operates on the principle that everything in the universe, including our bodies, 
              is made up of energy vibrating at different frequencies. When these frequencies become imbalanced 
              due to stress, toxins, or emotional trauma, illness manifests. Quantum healing devices work by 
              restoring optimal frequency patterns, allowing the body to heal itself naturally.
            </p>

            <div className="bg-green-50 p-6 rounded-lg mb-8 border-l-4 border-green-500">
              <h4 className="font-bold text-green-800 mb-3">Key Benefits of Quantum Healing:</h4>
              <ul className="space-y-2 text-green-700">
                <li>• Cellular regeneration and repair</li>
                <li>• Enhanced immune system function</li>
                <li>• Reduced inflammation and pain</li>
                <li>• Improved energy levels and mental clarity</li>
                <li>• Balanced hormones and metabolism</li>
                <li>• Better sleep and stress management</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
              <Heart className="h-6 w-6 mr-2 text-red-500" />
              Real Success Stories from Nigeria
            </h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              Mrs. Sarah Adebayo from Lagos had suffered from diabetes for 15 years. Within 6 months of using 
              our Quantum Light Therapy Machine, her blood sugar levels normalized, and she was able to reduce 
              her medication by 80%. "I never believed natural healing could be this powerful," she says.
            </p>

            <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
              <Leaf className="h-6 w-6 mr-2 text-green-500" />
              Our Quantum Products
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="border border-green-200">
                <CardContent className="p-4">
                  <h4 className="font-bold text-green-800 mb-2">Quantum Light Therapy Machine</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    7-light quantum energy system for cellular healing
                  </p>
                  <div className="text-lg font-bold text-green-600">₦850,000</div>
                </CardContent>
              </Card>
              
              <Card className="border border-green-200">
                <CardContent className="p-4">
                  <h4 className="font-bold text-green-800 mb-2">Quantum Energy Bracelets</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    24/7 energy balance and EMF protection
                  </p>
                  <div className="text-lg font-bold text-green-600">₦45,000</div>
                </CardContent>
              </Card>
            </div>

            <h3 className="text-2xl font-bold text-green-800 mb-4">Scientific Foundation</h3>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Quantum healing is rooted in quantum physics principles discovered by Nobel Prize winners. 
              Research published in the Journal of Alternative and Complementary Medicine shows significant 
              improvements in patients using frequency-based healing technologies.
            </p>

            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h4 className="font-bold text-blue-800 mb-3">Ready to Transform Your Health?</h4>
              <p className="text-blue-700 mb-4">
                Don't let chronic illness control your life. Our quantum healing experts are ready to guide 
                you on your journey to optimal health.
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Get Free Consultation
              </Button>
            </div>
          </article>
        </CardContent>
      </Card>
    </div>
  );
};

export default MainBlogContent;
