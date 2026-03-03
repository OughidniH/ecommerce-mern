import { useState } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "../ui/dialog";
function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const isLoggedIn = !!user;

  const [showLoginModal, setShowLoginModal] = useState(false);
  return (
    <>
      <Card className="w-full max-w-sm mx-auto">
        <div onClick={() => handleGetProductDetails(product?._id)}>
          <div className="relative">
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-[300px] object-cover rounded-t-lg"
            />
            {product?.totalStock === 0 ? (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                Out Of Stock
              </Badge>
            ) : product?.totalStock < 10 ? (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                {`Only ${product?.totalStock} items left`}
              </Badge>
            ) : product?.salePrice > 0 ? (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                Sale
              </Badge>
            ) : null}
          </div>
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[16px] text-muted-foreground">
                {categoryOptionsMap[product?.category]}
              </span>
              <span className="text-[16px] text-muted-foreground">
                {brandOptionsMap[product?.brand]}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span
                className={`${product?.salePrice > 0 ? "line-through" : ""
                  } text-lg font-semibold text-primary`}
              >
                {product?.price} DZD
              </span>
              {product?.salePrice > 0 ? (
                <span className="text-lg font-semibold text-primary">
                  {product?.salePrice} DZD
                </span>
              ) : null}
            </div>
          </CardContent>
        </div>
        <CardFooter className="flex flex-col gap-2 p-4">
          {product?.totalStock === 0 ? (
            <Button className="w-full opacity-60 cursor-not-allowed">
              Out Of Stock
            </Button>
          ) : (
            <>
              <Button
                className="w-full"
                onClick={() => {
                  if (isLoggedIn) {
                    handleAddtoCart(product?._id, product?.totalStock);
                  } else {
                    setShowLoginModal(true);
                  }
                }}
              >
                Add to Cart
              </Button>

              <Button
                className="w-full"
                variant="outline"
                onClick={() => navigate(`/order/${product?._id}`)}
              >
                Quick Order
              </Button>

            </>
          )}
        </CardFooter>
      </Card>


      <Dialog
        open={showLoginModal}
        onOpenChange={() => setShowLoginModal(false)}
      >
        <DialogContent className="w-[90vw] max-w-md p-6">
          <h2 className="text-xl font-bold mb-4">Veuillez vous connecter svp</h2>
          <div className="flex gap-3">
            <Button onClick={() => navigate("/auth/login")}>Connexion</Button>
            <Button variant="outline" onClick={() => setShowLoginModal(false)}>
              Annuler
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </>
  );
}

export default ShoppingProductTile;
