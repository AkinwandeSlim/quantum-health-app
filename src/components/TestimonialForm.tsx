
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface TestimonialFormProps {
  testimonial?: any;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const TestimonialForm = ({ testimonial, onSubmit, onCancel, isLoading }: TestimonialFormProps) => {
  const [formData, setFormData] = useState({
    name: testimonial?.name || "",
    quote: testimonial?.quote || "",
    photo_url: testimonial?.photo_url || ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="quote">Quote/Testimonial</Label>
        <Textarea
          id="quote"
          value={formData.quote}
          onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
          rows={4}
          required
        />
      </div>

      <div>
        <Label htmlFor="photo_url">Photo URL (optional)</Label>
        <Input
          id="photo_url"
          value={formData.photo_url}
          onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
          placeholder="https://example.com/photo.jpg"
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : testimonial ? "Update Testimonial" : "Add Testimonial"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default TestimonialForm;
