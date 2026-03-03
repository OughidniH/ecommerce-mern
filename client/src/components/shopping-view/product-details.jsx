import { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { User, Phone, MapPin, Building2, Package } from "lucide-react";
const DELIVERY_API = "http://localhost:5001/api/delivery";
const ORDER_API = "http://localhost:5001/api/quick-order";

function ProductDetailsDialog({ open, setOpen, productDetails }) {

  const [quantity, setQuantity] = useState(1);
  const [deliveryType, setDeliveryType] = useState("home");
  const [currentImage, setCurrentImage] = useState(0);
  const [wilayas, setWilayas] = useState([]);
  const [selectedWilaya, setSelectedWilaya] = useState("");
  const [selectedCommune, setSelectedCommune] = useState("");
  const [deliveryData, setDeliveryData] = useState(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loadingWilayas, setLoadingWilayas] = useState(false);
  const [loadingDelivery, setLoadingDelivery] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();


  useEffect(() => {
    if (!open) {
      setQuantity(1);
      setDeliveryType("home");
      setSelectedWilaya("");
      setSelectedCommune("");
      setDeliveryData(null);
      setFullName("");
      setPhone("");
      setError("");
    }
  }, [open, productDetails]);

  useEffect(() => {
    const fetchWilayas = async () => {
      try {
        setLoadingWilayas(true);
        const { data } = await axios.get(`${DELIVERY_API}/wilayas`);
        setWilayas(data);
      } catch {
        setError("Erreur chargement wilayas");
      } finally {
        setLoadingWilayas(false);
      }
    };
    fetchWilayas();
  }, []);

  const handleWilayaChange = async (wilaya) => {
    setSelectedWilaya(wilaya);
    setSelectedCommune("");
    setDeliveryData(null);

    if (!wilaya) return;

    try {
      setLoadingDelivery(true);
      const { data } = await axios.get(`${DELIVERY_API}/wilayas/${wilaya}`);
      setDeliveryData(data);
    } catch {
      setError("Erreur chargement livraison");
    } finally {
      setLoadingDelivery(false);
    }
  };

  if (!productDetails) return null;

  const images =
    productDetails?.images?.length > 0
      ? productDetails.images
      : [productDetails?.image];

  const productPrice =
    productDetails?.salePrice > 0
      ? productDetails.salePrice
      : productDetails?.price || 0;

  const deliveryPrice =
    deliveryType === "home"
      ? deliveryData?.homePrice || 0
      : deliveryData?.officePrice || 0;

  const subtotal = productPrice * quantity;
  const total = subtotal + deliveryPrice;

  const isFormValid =
    fullName &&
    phone &&
    selectedWilaya &&
    selectedCommune &&
    quantity > 0;

  const handleOrder = async () => {
    if (!isFormValid) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await axios.post(ORDER_API, {
        productId: productDetails._id,
        fullName,
        phone,
        wilaya: selectedWilaya,
        commune: selectedCommune,
        quantity,
        deliveryType,
        deliveryPrice,
        totalPrice: total,
      });

      toast({
        title: "Quick Order",
        description: "Commande envoyée avec succès !",
      });
    } catch {
      setError("Erreur envoi commande");
    } finally {
      setSubmitting(false);
    }
  };


  const handleShare = async () => {
    const quickOrderUrl = `${window.location.origin}/order/${productDetails?._id}`;
    if (!quickOrderUrl) return;
    try {
      await navigator.clipboard.writeText(quickOrderUrl);

      toast({
        title: "Link copied!",
        description: "Quick order link copied to clipboard",
      });
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[95vw] max-w-7xl p-0 rounded-2xl overflow-hidden">



        {/* WRAPPER FIX HAUTEUR */}
        <div className="grid md:grid-cols-2 bg-white max-h-[90vh]">

          {/* LEFT SIDE */}
          <div className="bg-gray-200 flex flex-col items-center justify-center p-10">
            <img
              src={images[currentImage]}
              alt="product"
              className="max-h-[550px] object-contain"
            />

            <div className="flex gap-2 mt-6">
              {images.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`w-2.5 h-2.5 rounded-full cursor-pointer ${currentImage === i ? "bg-black" : "bg-gray-400"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col h-[90vh]" dir="rtl">

            {/* HEADER */}
            <div className="flex justify-between items-center p-8 border-b bg-white shrink-0">
              <div className="text-sm text-gray-500">
                13 يشاهدون الصفحة الآن
              </div>
              <button onClick={handleShare} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition" > <Share2 size={20} /> مشاركة </button>
            </div>

            {/* SCROLL AREA */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              {/* PRODUCT TITLE */}
              <h1 className="text-2xl font-bold text-gray-800 leading-snug">
                {productDetails.title}
              </h1>

              {/* PRICE */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-black">
                  {productPrice} DZD
                </span>

                {productDetails?.salePrice > 0 && (
                  <span className="text-gray-400 line-through text-lg">
                    {productDetails.price} DZD
                  </span>
                )}
              </div>

              {/* PRODUCT BOX */}
              <div className="relative border-2 border-dashed border-cyan-400 rounded-2xl p-4 bg-cyan-50">

                <span className="absolute -top-3 right-4 bg-red-500 text-white text-xs px-4 py-1 rounded-full shadow">
                  تخفيض لمدة محدودة
                </span>

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">
                    <img
                      src={images[0]}
                      className="w-16 h-16 object-contain bg-white rounded-lg p-1 shadow-sm"
                    />
                    <div className="text-sm font-semibold text-gray-800 leading-snug max-w-[180px]">
                      {productDetails.title}
                    </div>
                  </div>

                  <div className="bg-blue-600 text-white px-5 py-2 rounded-full font-bold text-sm shadow">
                    {total} DZD
                  </div>

                </div>
              </div>

              {/* FORM */}
              <div className="space-y-4">

                {/* FULL NAME */}
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    الاسم الكامل *
                  </label>
                  <div className="relative mt-1">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-500" size={18} />
                    <input
                      type="text"
                      placeholder="ادخل اسمك كاملا"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full h-12 pr-10 pl-4 rounded-xl border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition"
                    />
                  </div>
                </div>

                {/* PHONE */}
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    الهاتف *
                  </label>
                  <div className="relative mt-1">
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-500" size={18} />
                    <input
                      type="tel"
                      placeholder="ادخل رقم هاتفك"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-12 pr-10 pl-4 rounded-xl border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition"
                    />
                  </div>
                </div>

                {/* QUANTITY */}
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    الكمية *
                  </label>
                  <div className="relative mt-1">
                    <Package className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-500" size={18} />
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, Number(e.target.value)))
                      }
                      className="w-full h-12 pr-10 pl-4 rounded-xl border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition"
                    />
                  </div>
                </div>

                {/* WILAYA */}
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    الولاية *
                  </label>
                  <div className="relative mt-1">
                    <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-500" size={18} />
                    <select
                      value={selectedWilaya}
                      onChange={(e) => handleWilayaChange(e.target.value)}
                      className="w-full h-12 pr-10 pl-4 rounded-xl border border-gray-300 bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none appearance-none"
                    >
                      <option value="">
                        {loadingWilayas ? "تحميل..." : "اختر الولاية"}
                      </option>
                      {wilayas.map((w) => (
                        <option key={w._id} value={w.wilaya}>
                          {w.wilaya}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* COMMUNE */}
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    البلدية *
                  </label>
                  <div className="relative mt-1">
                    <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-500" size={18} />
                    <select
                      value={selectedCommune}
                      onChange={(e) => setSelectedCommune(e.target.value)}
                      disabled={!deliveryData}
                      className="w-full h-12 pr-10 pl-4 rounded-xl border border-gray-300 bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none appearance-none disabled:bg-gray-100"
                    >
                      <option value="">
                        {loadingDelivery ? "تحميل..." : "اختر البلدية"}
                      </option>
                      {deliveryData?.communes?.map((commune, index) => (
                        <option key={index} value={commune}>
                          {commune}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* DELIVERY TYPE */}
                {deliveryData && (
                  <div className="space-y-3">

                    <div
                      onClick={() => setDeliveryType("home")}
                      className={`p-4 rounded-xl border cursor-pointer transition flex justify-between ${deliveryType === "home"
                        ? "border-cyan-600 bg-cyan-50"
                        : "border-gray-300"
                        }`}
                    >
                      <span>توصيل إلى المنزل</span>
                      <span>{deliveryData.homePrice} DZD</span>
                    </div>

                    <div
                      onClick={() => setDeliveryType("office")}
                      className={`p-4 rounded-xl border cursor-pointer transition flex justify-between ${deliveryType === "office"
                        ? "border-cyan-600 bg-cyan-50"
                        : "border-gray-300"
                        }`}
                    >
                      <span>استلام من المكتب</span>
                      <span>{deliveryData.officePrice} DZD</span>
                    </div>

                  </div>
                )}

                {/* TOTAL BOX */}
                <div className="bg-gray-100 rounded-2xl p-5 space-y-3 text-sm shadow-inner">

                  <div className="flex justify-between text-gray-600">
                    <span>المجموع الفرعي</span>
                    <span>{subtotal} DZD</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>التوصيل</span>
                    <span>{deliveryPrice || "--"}</span>
                  </div>

                  <div className="border-t pt-3 flex justify-between font-bold text-lg text-gray-800">
                    <span>المجموع</span>
                    <span>{total} DZD</span>
                  </div>

                </div>

                {/* BUTTON */}
                <button
                  disabled={!isFormValid || submitting}
                  onClick={handleOrder}
                  className="w-full h-14 rounded-2xl text-lg font-bold text-white
             bg-gradient-to-r from-cyan-400 to-blue-600
             hover:from-cyan-500 hover:to-blue-700
             transition shadow-md disabled:opacity-50 flex flex-col items-center justify-center"
                >
                  {submitting ? (
                    "جاري المعالجة..."
                  ) : (
                    <>
                      <span>اطلب الآن</span>
                      <span className="text-sm font-normal">
                        الدفع عند الاستلام
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;