const AboutSection = () => {
  return (
    <section 
      id="about" 
      className="py-20 px-4 relative"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url("https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2000")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Pioneering
              <span className="bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
                {" "}Family Wellness
              </span>
            </h2>
            
            <p className="text-lg text-green-100 mb-6 leading-relaxed">
              At RaphaWellnessOptimization, we believe every family deserves access to natural, effective 
              health solutions that work with your body's innate healing wisdom. Our quantum-enhanced 
              products represent the perfect fusion of ancient healing knowledge and cutting-edge science.
            </p>
            
            <p className="text-lg text-green-100 mb-8 leading-relaxed">
              Founded on the principle that the body has an extraordinary capacity for self-healing when given 
              the right support, we've dedicated ourselves to creating products that activate your cellular 
              regeneration and restore optimal health naturally—without harmful side effects.
            </p>

            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">15+</div>
                <div className="text-green-200">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">5000+</div>
                <div className="text-green-200">Families Healed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-400 mb-2">50+</div>
                <div className="text-green-200">Health Conditions</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-green-700/40 to-emerald-800/40 rounded-2xl p-8 backdrop-blur-sm border border-green-400/30">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Our Quantum Wellness Approach
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full mt-1.5"></div>
                  <div>
                    <div className="text-green-200 font-semibold">Cellular Regeneration</div>
                    <div className="text-green-300 text-sm">Quantum frequencies that activate natural healing</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full mt-1.5"></div>
                  <div>
                    <div className="text-green-200 font-semibold">Toxin Elimination</div>
                    <div className="text-green-300 text-sm">Safe detox that preserves essential nutrients</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-teal-400 rounded-full mt-1.5"></div>
                  <div>
                    <div className="text-green-200 font-semibold">Immune Strengthening</div>
                    <div className="text-green-300 text-sm">Natural defense system optimization</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-lime-400 rounded-full mt-1.5"></div>
                  <div>
                    <div className="text-green-200 font-semibold">Energy Restoration</div>
                    <div className="text-green-300 text-sm">Vital life force enhancement</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mt-1.5"></div>
                  <div>
                    <div className="text-green-200 font-semibold">Family-Safe Formulas</div>
                    <div className="text-green-300 text-sm">Gentle yet effective for all ages</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
