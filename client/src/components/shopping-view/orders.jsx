import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllOrdersByUserId(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (orderDetails?._id) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);


  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList && orderList.length > 0
                ? orderList.map((orderItem) => (
                  <TableRow key={orderItem._id}>
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate?.split?.("T")?.[0] || "-"}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 ${orderItem?.orderStatus?.toLowerCase() === "delivered"
                          ? "bg-green-500"
                          : orderItem?.orderStatus?.toLowerCase() === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                          }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{orderItem?.totalAmount} DZD</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          setSelectedOrderId(orderItem._id);
                          handleFetchOrderDetails(orderItem?._id);
                        }}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
                : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No orders found
                    </TableCell>
                  </TableRow>
                )}

            </TableBody>
          </Table>
          <Dialog
            open={openDetailsDialog}
            onOpenChange={() => {
              setOpenDetailsDialog(false);
              dispatch(resetOrderDetails());
              setSelectedOrderId(null);
            }}
          >
            <ShoppingOrderDetailsView orderDetails={orderDetails} />
          </Dialog>
        </CardContent>
      </Card>
    </>
  );
}

export default ShoppingOrders;
