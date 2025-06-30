import { Card, CardContent } from "@/components/ui/card";
import { Sun, Heart, Leaf } from "lucide-react";

const QuantumEnergySection = () => {
  const quantumPrinciples = [
    {
      icon: Sun,
      title: "Vibrational Frequency Healing",
      description: "Every cell in your body vibrates at specific frequencies. Our quantum energy technology harmonizes these frequencies to restore optimal cellular function and promote natural healing."
    },
    {
      icon: Heart,
      title: "Energetic Field Balance",
      description: "Your body's energetic field influences physical health. Quantum energy helps balance and strengthen your biofield, creating conditions for spontaneous healing and vitality."
    },
    {
      icon: Leaf,
      title: "Cellular Coherence Restoration",
      description: "Quantum coherence at the cellular level enhances communication between cells, optimizes metabolic processes, and activates your body's innate self-repair mechanisms."
    }
  ];

  return (
    <section 
      id="quantum" 
      className="py-20 px-4 relative"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url("https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=2000")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            The Science of
            <span className="bg-gradient-to-r from-green-300 to-teal-300 bg-clip-text text-transparent">
              {" "}Quantum Healing
            </span>
          </h2>
          <p className="text-xl text-green-100 max-w-4xl mx-auto leading-relaxed">
            Understanding how quantum energy works with your body's natural intelligence 
            to create profound healing and transformation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {quantumPrinciples.map((principle, index) => (
            <Card 
              key={index} 
              className="bg-green-900/30 backdrop-blur-sm border-green-400/40 hover:bg-green-800/35 transition-all duration-300 group"
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <principle.icon className="h-16 w-16 text-green-400 group-hover:text-green-300 transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{principle.title}</h3>
                <p className="text-green-100 leading-relaxed">{principle.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-green-800/40 to-emerald-800/40 backdrop-blur-sm rounded-2xl p-8 border border-green-400/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">
                Your Body's Natural Healing Intelligence
              </h3>
              <p className="text-green-100 leading-relaxed mb-4">
                Every human body possesses an extraordinary capacity for self-healing. Quantum energy 
                acts as a catalyst, amplifying and directing this innate intelligence to restore balance, 
                eliminate dysfunction, and optimize wellness at every level.
              </p>
              <p className="text-green-100 leading-relaxed">
                Through precise quantum frequencies, we help your body remember its perfect blueprint 
                and guide it back to optimal health naturally, without harmful side effects.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                <div className="text-green-200">Quantum field alignment active</div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-emerald-400 rounded-full animate-pulse delay-200"></div>
                <div className="text-green-200">Cellular frequency optimization</div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-teal-400 rounded-full animate-pulse delay-500"></div>
                <div className="text-green-200">Natural healing acceleration</div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-lime-400 rounded-full animate-pulse delay-700"></div>
                <div className="text-green-200">Energetic balance restoration</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuantumEnergySection;
