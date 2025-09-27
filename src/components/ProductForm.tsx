import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Product {
  id?: string;
  title: string;
  description: string | null;
  image_url: string | null;
  video_url: string | null;
}

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: { title: string; description?: string; image?: File | null; video_url?: string }) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const ProductForm = ({ product, onSubmit, onCancel, isLoading = false }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    title: product?.title || '',
    description: product?.description || '',
    image: null as File | null,
    image_url: product?.image_url || '',
    video_url: product?.video_url || '',
  });
  const [previewUrl, setPreviewUrl] = useState<string>(product?.image_url || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (!allowedTypes.includes(file.type)) {
        toast({ title: "Error", description: "Please select a valid image file (PNG, JPEG)", variant: "destructive" });
        return;
      }
      if (file.size > maxSize) {
        toast({ title: "Error", description: "Image size must be less than 10MB", variant: "destructive" });
        return;
      }

      setFormData({ ...formData, image: file, image_url: '' });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, image: null, image_url: '' });
    setPreviewUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast({ title: "Error", description: "Product title is required", variant: "destructive" });
      return;
    }
    await onSubmit({
      title: formData.title,
      description: formData.description || undefined,
      image: formData.image_url ? null : formData.image, // If image_url exists, send null to clear image
      video_url: formData.video_url || undefined,
    });
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
            <Label htmlFor="image">Product Image</Label>
            <div className="mt-2">
              {!formData.image && !formData.image_url ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-400 transition-colors"
                >
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPEG up to 10MB
                  </p>
                </div>
              ) : (
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ImageIcon className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-sm">{formData.image?.name || 'Current Image'}</p>
                        {formData.image && (
                          <p className="text-xs text-gray-500">
                            {(formData.image.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={removeImage}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            {previewUrl && (
              <div className="mt-2">
                <Label>Image Preview</Label>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="mt-2 w-full max-h-64 object-contain rounded-lg"
                />
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="video_url">Video URL</Label>
            <Input
              id="video_url"
              value={formData.video_url}
              onChange={(e) => handleChange('video_url', e.target.value)}
              placeholder="https://www.youtube.com/embed/VIDEO_ID"
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




// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { X } from 'lucide-react';

// interface Product {
//   id?: string;
//   title: string;
//   description: string | null;
//   image_url: string | null;
//   video_url: string | null;
// }

// interface ProductFormProps {
//   product?: Product;
//   onSubmit: (product: Omit<Product, 'id'>) => Promise<void>;
//   onCancel: () => void;
//   isLoading?: boolean;
// }

// const ProductForm = ({ product, onSubmit, onCancel, isLoading = false }: ProductFormProps) => {
//   const [formData, setFormData] = useState({
//     title: product?.title || '',
//     description: product?.description || '',
//     image_url: product?.image_url || '',
//     video_url: product?.video_url || ''
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await onSubmit(formData);
//   };

//   const handleChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   return (
//     <Card className="w-full max-w-2xl">
//       <CardHeader className="flex flex-row items-center justify-between">
//         <CardTitle>{product ? 'Edit Product' : 'Add New Product'}</CardTitle>
//         <Button variant="ghost" size="sm" onClick={onCancel}>
//           <X className="h-4 w-4" />
//         </Button>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Label htmlFor="title">Product Title *</Label>
//             <Input
//               id="title"
//               value={formData.title}
//               onChange={(e) => handleChange('title', e.target.value)}
//               placeholder="Enter product title"
//               required
//             />
//           </div>

//           <div>
//             <Label htmlFor="description">Description</Label>
//             <Textarea
//               id="description"
//               value={formData.description}
//               onChange={(e) => handleChange('description', e.target.value)}
//               placeholder="Enter product description"
//               rows={4}
//             />
//           </div>

//           <div>
//             <Label htmlFor="image_url">Image URL</Label>
//             <Input
//               id="image_url"
//               value={formData.image_url}
//               onChange={(e) => handleChange('image_url', e.target.value)}
//               placeholder="https://example.com/image.jpg"
//               type="url"
//             />
//           </div>

//           <div>
//             <Label htmlFor="video_url">Video URL</Label>
//             <Input
//               id="video_url"
//               value={formData.video_url}
//               onChange={(e) => handleChange('video_url', e.target.value)}
//               placeholder="https://example.com/video.mp4"
//               type="url"
//             />
//           </div>

//           <div className="flex gap-2 pt-4">
//             <Button type="submit" disabled={isLoading || !formData.title.trim()}>
//               {isLoading ? 'Saving...' : (product ? 'Update Product' : 'Add Product')}
//             </Button>
//             <Button type="button" variant="outline" onClick={onCancel}>
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProductForm;
