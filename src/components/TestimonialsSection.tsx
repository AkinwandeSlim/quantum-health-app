
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useTestimonials } from "@/hooks/useTestimonials";

const TestimonialsSection = () => {
  const { testimonials, loading } = useTestimonials();

  if (loading) {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-lg text-gray-600">Loading testimonials...</div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            Real Stories from Real People
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Testimonials will appear here once they are added by an administrator.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            Real Stories from Real People
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how quantum healing has transformed lives across Nigeria
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border border-green-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {testimonial.photo_url ? (
                    <img 
                      src={testimonial.photo_url} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mr-4">
                      <span className="text-green-600 text-xl font-bold">
                        {testimonial.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-green-800">{testimonial.name}</h4>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <Quote className="h-6 w-6 text-green-400 mb-2" />
                <p className="text-gray-700 leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
