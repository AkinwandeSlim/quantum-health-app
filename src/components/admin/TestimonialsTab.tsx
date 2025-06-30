
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useTestimonials } from "@/hooks/useTestimonials";
import TestimonialForm from "@/components/TestimonialForm";

const TestimonialsTab = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useTestimonials();
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTestimonialSubmit = async (testimonialData: any) => {
    setIsSubmitting(true);
    try {
      if (editingTestimonial) {
        await updateTestimonial(editingTestimonial.id, testimonialData);
      } else {
        await addTestimonial(testimonialData);
      }
      setShowTestimonialForm(false);
      setEditingTestimonial(null);
    } catch (error) {
      console.error('Error saving testimonial:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditTestimonial = (testimonial: any) => {
    setEditingTestimonial(testimonial);
    setShowTestimonialForm(true);
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      await deleteTestimonial(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Testimonials Management</h2>
        <Button
          onClick={() => setShowTestimonialForm(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {showTestimonialForm && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <TestimonialForm
            testimonial={editingTestimonial}
            onSubmit={handleTestimonialSubmit}
            onCancel={() => {
              setShowTestimonialForm(false);
              setEditingTestimonial(null);
            }}
            isLoading={isSubmitting}
          />
        </div>
      )}

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                  <p className="text-gray-600 mt-1">"{testimonial.quote}"</p>
                  {testimonial.photo_url && (
                    <p className="text-sm text-gray-500 mt-1">📷 Photo included</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditTestimonial(testimonial)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {testimonials.length === 0 && (
          <p className="text-gray-500 text-center py-8">
            No testimonials yet. Add your first testimonial to get started.
          </p>
        )}
      </div>
    </div>
  );
};

export default TestimonialsTab;
