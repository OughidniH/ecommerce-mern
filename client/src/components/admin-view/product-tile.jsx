import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Share2 } from "lucide-react";
import { useToast } from "../ui/use-toast";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  const { toast } = useToast();
  // QuickOrderShare
  const quickOrderUrl = product?._id
    ? `${window.location.origin}/order/${product._id}`
    : "";

  const handleShare = async () => {
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
    <>
      <Card className="w-full max-w-sm mx-auto">
        <div>
          <div className="relative">
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-[300px] object-cover rounded-t-lg"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleShare}
              className="absolute top-2 right-2"
            >
              <Share2 size={18} />
            </Button>
          </div>
          <CardContent>
            <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
            <div className="flex justify-between items-center mb-2">
              <span
                className={`${product?.salePrice > 0 ? "line-through" : ""
                  } text-lg font-semibold text-primary`}
              >
                {product?.price} DZD
              </span>
              {product?.salePrice > 0 ? (
                <span className="text-lg font-bold">{product?.salePrice} DZD</span>
              ) : null}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Button
              onClick={() => {
                setOpenCreateProductsDialog(true);
                setCurrentEditedId(product?._id);
                setFormData(product);
              }}
            >
              Edit
            </Button>
            <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
          </CardFooter>
        </div>
      </Card>
    </>
  );
}

export default AdminProductTile;
