
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Gift, Plus, Edit, Trash2, Video, Image } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import ProductForm from "@/components/ProductForm";

const IncludedSection = () => {
  const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts();
  const { isAdmin } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (productData: any) => {
    setIsSubmitting(true);
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await addProduct(productData);
      }
      setShowForm(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-lg text-gray-600">Loading products...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800">
              What You'll Get
            </h2>
            {isAdmin && (
              <Button
                onClick={() => setShowForm(true)}
                className="bg-green-600 hover:bg-green-700"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            )}
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our quantum healing products designed to transform your health
          </p>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <ProductForm
              product={editingProduct}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={isSubmitting}
            />
          </div>
        )}

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No products available yet.</p>
            {isAdmin && (
              <Button
                onClick={() => setShowForm(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add First Product
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="border-2 border-green-200 hover:border-green-400 transition-all duration-300 shadow-lg hover:shadow-xl">
                <CardContent className="p-0">
                  <div className="relative">
                    {product.image_url ? (
                      <img 
                        src={product.image_url} 
                        alt={product.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                        <Image className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    
                    {isAdmin && (
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleEdit(product)}
                          className="bg-white/90 hover:bg-white"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-500/90 hover:bg-red-500"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-green-800 mb-2">
                      {product.title}
                    </h3>
                    {product.description && (
                      <p className="text-gray-600 mb-4">
                        {product.description}
                      </p>
                    )}
                    
                    {product.video_url && (
                      <div className="flex items-center gap-2 text-green-700 mb-4">
                        <Video className="h-4 w-4" />
                        <span className="text-sm">Video demonstration available</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-gray-600">Premium Quality Product</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <div className="bg-green-100 p-6 rounded-lg max-w-3xl mx-auto">
            <Gift className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-green-800 mb-2">
              Limited Time Bonus
            </h3>
            <p className="text-green-700">
              Order now and receive FREE shipping across Nigeria + 30-day money-back guarantee!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IncludedSection;
