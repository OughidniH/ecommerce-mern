import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch } from "react-redux";
import {
  getAllQuickOrdersForAdmin,
  getQuickOrderDetailsForAdmin,
  updateQuickOrderStatus,
} from "@/store/admin/quick-order-slice";
import { useToast } from "../ui/use-toast";

const initialFormData = {
  status: "",
};

function AdminQuickOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateQuickOrderStatus({
        id: orderDetails?._id,
        orderStatus: status,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getQuickOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllQuickOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">

        {/* ===== BASIC INFO ===== */}
        <div className="grid gap-2">
          <div className="flex mt-4 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Created At</p>
            <Label>
              {orderDetails?.createdAt?.split("T")[0]}
            </Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "delivered"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "returned"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>

        <Separator />

        {/* ===== PRODUCT INFO ===== */}
        <div className="grid gap-2">
          <div className="font-medium">Product Info</div>

          <div className="flex justify-between">
            <span>Title:</span>
            <span>{orderDetails?.productTitle}</span>
          </div>

          <div className="flex justify-between">
            <span>Unit Price:</span>
            <span>{orderDetails?.price} DZD</span>
          </div>

          <div className="flex justify-between">
            <span>Quantity:</span>
            <span>{orderDetails?.quantity}</span>
          </div>

          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>{orderDetails?.subtotal} DZD</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery:</span>
            <span>{orderDetails?.deliveryPrice} DZD</span>
          </div>

          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>{orderDetails?.totalPrice} DZD</span>
          </div>
        </div>

        <Separator />

        {/* ===== CUSTOMER INFO ===== */}
        <div className="grid gap-2">
          <div className="font-medium">Customer Info</div>

          <div className="grid gap-0.5 text-muted-foreground">
            <span>Name: {orderDetails?.fullName}</span>
            <span>Phone: {orderDetails?.phone}</span>
            <span>Wilaya: {orderDetails?.wilaya}</span>
            <span>Commune: {orderDetails?.commune}</span>
          </div>
        </div>

        <Separator />

        {/* ===== UPDATE STATUS ===== */}
        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "onDelivery", label: "On Delivery" },
                  { id: "delivered", label: "Delivered" },
                  { id: "paid", label: "Paid" },
                  { id: "returned", label: "Returned" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>

      </div>
    </DialogContent>
  );
}

export default AdminQuickOrderDetailsView;