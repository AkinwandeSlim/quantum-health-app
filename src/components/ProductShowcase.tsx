
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Sun, Heart, Upload, Play, Video, ShoppingCart, Zap } from "lucide-react";
import { useState } from "react";

const ProductShowcase = () => {
  const [uploadingSolution, setUploadingSolution] = useState<number | null>(null);

  const solutions = [
    {
      icon: Zap,
      title: "Quantum Light Therapy Machine",
      description: "Revolutionary 7-light quantum energy system that activates your body's natural healing mechanisms at the cellular level. Features Calcium, Red, Green, Blue, Purple, Yellow, and Orange therapeutic lights.",
      benefits: ["Cellular Regeneration", "Pain Relief", "Immune Boost", "Mental Clarity", "Energy Restoration", "Chronic Disease Support"],
      price: "₦850,000",
      conditions: ["Diabetes", "Hypertension", "Arthritis", "Chronic Fatigue", "Depression", "Autoimmune Disorders"],
      videoUrl: null
    },
    {
      icon: Sun,
      title: "Quantum Energy Bracelets",
      description: "Wearable quantum technology that continuously balances your body's energy field, enhances metabolism, and provides 24/7 health protection through bio-energy optimization.",
      benefits: ["Energy Balance", "Stress Reduction", "Better Sleep", "Enhanced Focus", "EMF Protection", "Circulation Boost"],
      price: "₦45,000",
      conditions: ["Stress", "Insomnia", "Fatigue", "Anxiety", "Poor Circulation", "EMF Sensitivity"],
      videoUrl: null
    },
    {
      icon: Heart,
      title: "Quantum Underwear Collection",
      description: "Quantum-infused intimate wear that promotes reproductive health, hormonal balance, and overall wellness through direct contact with quantum energy fields.",
      benefits: ["Hormonal Balance", "Reproductive Health", "Comfort Enhancement", "Antibacterial Properties", "Circulation Support", "Energy Flow"],
      price: "₦25,000",
      conditions: ["Hormonal Imbalance", "Reproductive Issues", "Poor Circulation", "Discomfort", "Bacterial Infections"],
      videoUrl: null
    },
    {
      icon: Leaf,
      title: "Quantum Tableware Set",
      description: "Quantum-enhanced plates, cups, and utensils that purify food and water at the molecular level, removing toxins while enhancing nutritional absorption.",
      benefits: ["Food Purification", "Water Enhancement", "Toxin Removal", "Nutrient Boost", "Better Digestion", "Family Health"],
      price: "₦120,000",
      conditions: ["Digestive Issues", "Food Sensitivities", "Toxin Buildup", "Poor Nutrition", "Water Quality Issues"],
      videoUrl: null
    }
  ];

  const handleVideoUpload = (solutionIndex: number) => {
    setUploadingSolution(solutionIndex);
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log(`Video uploaded for ${solutions[solutionIndex].title}:`, file.name);
        alert(`Video "${file.name}" ready to upload for ${solutions[solutionIndex].title}`);
      }
      setUploadingSolution(null);
    };
    input.click();
  };

  return (
    <section 
      id="solutions" 
      className="py-20 px-4 relative"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url("https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=2000")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Quantum
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              {" "}Healing Products
            </span>
          </h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed mb-8">
            Transform your health with our revolutionary quantum-enhanced products that work at the cellular level 
            to activate your body's natural healing power and restore optimal wellness
          </p>
          
          {/* Problem statement */}
          <div className="bg-red-900/20 backdrop-blur-sm border border-red-400/30 rounded-lg p-6 max-w-4xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-red-300 mb-4">Are You Suffering From These Health Challenges?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-red-200">• Chronic fatigue</div>
              <div className="text-red-200">• Diabetes</div>
              <div className="text-red-200">• High blood pressure</div>
              <div className="text-red-200">• Arthritis pain</div>
              <div className="text-red-200">• Poor sleep</div>
              <div className="text-red-200">• Stress & anxiety</div>
              <div className="text-red-200">• Digestive issues</div>
              <div className="text-red-200">• Immune problems</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {solutions.map((solution, index) => (
            <Card 
              key={index} 
              className="bg-green-900/20 backdrop-blur-sm border-green-400/30 hover:bg-green-800/25 transition-all duration-300 hover:scale-105 group hover:shadow-2xl hover:shadow-green-500/20"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <solution.icon className="h-12 w-12 text-green-400 group-hover:text-emerald-300 transition-colors" />
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">{solution.price}</div>
                    <div className="text-sm text-green-300">Starting Price</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{solution.title}</h3>
                <p className="text-green-100 mb-4 leading-relaxed text-sm">{solution.description}</p>
                
                {/* Benefits */}
                <div className="mb-4">
                  <h4 className="text-green-300 font-semibold mb-2">Key Benefits:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {solution.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center text-xs text-green-200">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conditions treated */}
                <div className="mb-4">
                  <h4 className="text-green-300 font-semibold mb-2">Helps With:</h4>
                  <div className="flex flex-wrap gap-1">
                    {solution.conditions.map((condition, idx) => (
                      <span key={idx} className="bg-green-800/30 text-green-200 px-2 py-1 rounded text-xs">
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Order Now
                  </Button>

                  {/* Video Upload Section */}
                  <div className="border-t border-green-400/20 pt-3">
                    {solution.videoUrl ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Play className="h-4 w-4 text-green-400 mr-2" />
                          <span className="text-green-300 text-sm">Demo Video Available</span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-400 border-green-400/40 hover:bg-green-800/30"
                          onClick={() => handleVideoUpload(index)}
                        >
                          <Upload className="h-3 w-3 mr-1" />
                          Replace
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full text-green-400 border-green-400/40 hover:bg-green-800/30"
                        onClick={() => handleVideoUpload(index)}
                        disabled={uploadingSolution === index}
                      >
                        <Video className="h-4 w-4 mr-2" />
                        {uploadingSolution === index ? "Uploading..." : "Add Demo Video"}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Solution promise */}
        <div className="bg-gradient-to-r from-green-800/40 to-emerald-800/40 backdrop-blur-sm rounded-2xl p-8 border border-green-400/30 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            The Quantum Solution to Your Health Problems
          </h3>
          <p className="text-green-100 text-lg leading-relaxed max-w-4xl mx-auto mb-6">
            Our quantum-enhanced products work by activating your body's natural healing frequencies, 
            restoring cellular balance, and eliminating the root causes of chronic health issues. 
            Experience the transformation that thousands of families worldwide have already discovered.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 p-4 rounded-lg">
              <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <h4 className="text-white font-semibold">Instant Activation</h4>
              <p className="text-green-200 text-sm">Feel the energy shift within minutes of use</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <Heart className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <h4 className="text-white font-semibold">Cellular Healing</h4>
              <p className="text-green-200 text-sm">Repair and regenerate at the deepest level</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <Leaf className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h4 className="text-white font-semibold">Natural & Safe</h4>
              <p className="text-green-200 text-sm">No side effects, only pure healing energy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
