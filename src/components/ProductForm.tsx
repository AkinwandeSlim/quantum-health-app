
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';

interface Product {
  id?: string;
  title: string;
  description: string | null;
  image_url: string | null;
  video_url: string | null;
}

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Omit<Product, 'id'>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const ProductForm = ({ product, onSubmit, onCancel, isLoading = false }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    title: product?.title || '',
    description: product?.description || '',
    image_url: product?.image_url || '',
    video_url: product?.video_url || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{product ? 'Edit Product' : 'Add New Product'}</CardTitle>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Product Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter product title"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter product description"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              value={formData.image_url}
              onChange={(e) => handleChange('image_url', e.target.value)}
              placeholder="https://example.com/image.jpg"
              type="url"
            />
          </div>

          <div>
            <Label htmlFor="video_url">Video URL</Label>
            <Input
              id="video_url"
              value={formData.video_url}
              onChange={(e) => handleChange('video_url', e.target.value)}
              placeholder="https://example.com/video.mp4"
              type="url"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isLoading || !formData.title.trim()}>
              {isLoading ? 'Saving...' : (product ? 'Update Product' : 'Add Product')}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
