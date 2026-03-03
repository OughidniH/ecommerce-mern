import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";

const DELIVERY_PRICE = 600;

const quickOrderFormControls = [
  { name: "fullName", placeholder: "Full Name", type: "text" },
  { name: "phone", placeholder: "Phone Number", type: "text" },
  { name: "wilaya", placeholder: "Wilaya", type: "text" },
  { name: "commune", placeholder: "Commune", type: "text" },
  { name: "quantity", placeholder: "Quantity", type: "number", min: 1 },
];

const initialFormData = {
  fullName: "",
  phone: "",
  wilaya: "",
  commune: "",
  quantity: 1,
};

function QuickOrderPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/shop/products/get/${productId}`);
        setProduct(response.data.data);
      } catch (error) {
        toast({ title: "Failed to load product", variant: "destructive" });
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  
  const quantity = Number(formData.quantity) || 1;
  const subtotal = product.price * quantity;
  const totalPrice = subtotal + DELIVERY_PRICE;

  const handleSubmit = async (e) => {
    e.preventDefault();
      const quantity = Number(formData.quantity);

      if (quantity < 1) {
        toast({
          title: "Invalid quantity",
          description: "Quantity must be at least 1",
          variant: "destructive",
        });
        return;
      }

    try {
      setIsSubmitting(true);

      const response = await api.post("/quick-order", {
        productId,
        fullName: formData.fullName,
        phone: formData.phone,
        wilaya: formData.wilaya,
        commune: formData.commune,
        quantity,
      });

      toast({
        title:  response.data.message,
      });

      setFormData(initialFormData);
    } catch (error) {
     
      toast({
        title: "Failed to submit order",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () =>
    Object.values(formData).every((value) => value !== "");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl shadow-2xl rounded-2xl border bg-white overflow-hidden">
        
        {/* Product Section */}
        <div className="p-6 text-center border-b">
          <img
            src={product.image}
            alt={product.title}
            className="w-56 h-56 object-contain mx-auto"
          />

          <h1 className="text-2xl font-bold mt-4">
            {product.title}
          </h1>

          <p className="text-lg font-semibold mt-2 text-gray-700">
            {product.price} DZD
          </p>
        </div>

        {/* Order Summary */}
        <div className="px-6 py-4 bg-gray-50 border-b space-y-2">
          <div className="flex justify-between text-sm">
            <span>Sous-total</span>
            <span>{subtotal} DZD</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Livraison</span>
            <span>{DELIVERY_PRICE} DZD</span>
          </div>

          <div className="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Total</span>
            <span>{totalPrice} DZD</span>
          </div>
        </div>

        {/* Form */}
        <CardHeader className="pt-6">
          <CardTitle className="text-center text-lg font-semibold">
            Quick Order Form
          </CardTitle>
        </CardHeader>

        <CardContent className="px-6 pb-6">
          <CommonForm
            formControls={quickOrderFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={
              isSubmitting
                ? "Processing..."
                : `Confirm Order - ${totalPrice} DZD`
            }
            onSubmit={handleSubmit}
            isBtnDisabled={!isFormValid() || isSubmitting}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default QuickOrderPage;