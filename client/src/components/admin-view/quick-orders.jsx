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
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import AdminQuickOrderDetailsView from "./quick-order-dtails"; 
import {
  getAllQuickOrdersForAdmin,
  getQuickOrderDetailsForAdmin,
  resetQuickOrderDetails,
} from "@/store/admin/quick-order-slice";

function AdminQuickOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { quickOrderList, quickOrderDetails } = useSelector(
    (state) => state.adminQuickOrder
  );
  const dispatch = useDispatch();

 
  function handleFetchQuickOrderDetails(id) {
    dispatch(getQuickOrderDetailsForAdmin(id));
  }

  
  useEffect(() => {
    dispatch(getAllQuickOrdersForAdmin());
  }, [dispatch]);

  
  useEffect(() => {
    if (quickOrderDetails !== null) setOpenDetailsDialog(true);
  }, [quickOrderDetails]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quickOrderList && quickOrderList.length > 0
              ? quickOrderList.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.productTitle}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.totalPrice} DZD</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 ${
                          order.orderStatus === "delivered"
                            ? "bg-green-500"
                            : order.orderStatus === "returned"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                        {order.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.fullName}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetQuickOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() => handleFetchQuickOrderDetails(order._id)}
                        >
                          View Details
                        </Button>
                        <AdminQuickOrderDetailsView orderDetails={quickOrderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500">
                    No quick orders found
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminQuickOrdersView;