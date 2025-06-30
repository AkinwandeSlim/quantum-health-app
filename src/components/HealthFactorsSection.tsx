import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Shield, Zap, Leaf } from "lucide-react";

const HealthFactorsSection = () => {
  const healthFactors = [
    {
      icon: AlertTriangle,
      title: "Environmental Toxins",
      problem: "Daily exposure to chemicals, pollutants, and heavy metals that accumulate in our bodies",
      solution: "Quantum-enhanced detox formulas that safely eliminate toxins at the cellular level",
      color: "text-red-400"
    },
    {
      icon: Shield,
      title: "Weakened Immunity",
      problem: "Stress, poor diet, and lifestyle factors that compromise our natural defense systems",
      solution: "Immune-boosting quantum supplements that strengthen your body's natural defenses",
      color: "text-blue-400"
    },
    {
      icon: Zap,
      title: "Energy Depletion",
      problem: "Modern life drains our vital energy, leaving us tired and unable to function optimally",
      solution: "Quantum energy products that restore cellular ATP and revitalize your life force",
      color: "text-yellow-400"
    },
    {
      icon: Leaf,
      title: "Nutritional Deficiencies",
      problem: "Processed foods and depleted soils leave our bodies lacking essential nutrients",
      solution: "Quantum-enhanced superfoods with maximized bioavailability and absorption",
      color: "text-green-400"
    }
  ];

  return (
    <section 
      id="health-factors" 
      className="py-20 px-4 relative"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url("https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2000")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Health Factors That
            <span className="bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
              {" "}Affect Your Family
            </span>
          </h2>
          <p className="text-xl text-green-100 max-w-4xl mx-auto leading-relaxed">
            Understanding the root causes of health challenges and discovering natural quantum solutions 
            that address them at the source for lasting family wellness
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {healthFactors.map((factor, index) => (
            <Card 
              key={index} 
              className="bg-green-900/30 backdrop-blur-sm border-green-400/40 hover:bg-green-800/35 transition-all duration-300 group"
            >
              <CardContent className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <factor.icon className={`h-12 w-12 ${factor.color} group-hover:scale-110 transition-transform`} />
                  <h3 className="text-2xl font-bold text-white">{factor.title}</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-red-900/20 p-4 rounded-lg border-l-4 border-red-400">
                    <h4 className="text-red-300 font-semibold mb-2">The Problem:</h4>
                    <p className="text-red-100 text-sm leading-relaxed">{factor.problem}</p>
                  </div>
                  
                  <div className="bg-green-900/20 p-4 rounded-lg border-l-4 border-green-400">
                    <h4 className="text-green-300 font-semibold mb-2">Our Solution:</h4>
                    <p className="text-green-100 text-sm leading-relaxed">{factor.solution}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-green-800/40 to-emerald-800/40 backdrop-blur-sm rounded-2xl p-8 border border-green-400/30">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              The RaphaWellness Difference
            </h3>
            <p className="text-green-100 text-lg leading-relaxed max-w-4xl mx-auto">
              Our quantum-infused products don't just treat symptoms - they address the root causes of health 
              challenges, empowering your body's natural self-healing mechanisms to restore optimal wellness 
              for you and your entire family.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthFactorsSection;
