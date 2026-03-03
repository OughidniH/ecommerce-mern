import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllProducts } from "@/store/admin/products-slice";
import { fetchAllCategories } from "@/store/admin/category-slice";
import { getAllOrdersForAdmin } from "@/store/admin/order-slice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AdminDashboard() {
  const dispatch = useDispatch();

  const { productList = [] } =
    useSelector((state) => state.adminProducts) || {};

  const { categoryList = [] } =
    useSelector((state) => state.adminCategory) || {};

  const orderList = useSelector(
    (state) => state.adminOrder?.orderList || []
  );

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllCategories());
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);



  const chartData = categoryList.map((category) => {
    const totalProducts = productList.filter(
      (product) => product.category === category._id
    ).length;

    return {
      name: category.nameCat,
      products: totalProducts,
    };
  });

const totalRevenue = orderList.reduce(
  (sum, order) => sum + (order?.totalAmount || 0),
  0
);
  return (
    <div className="p-6 space-y-8">
    
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {productList.length}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Total Category</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {categoryList.length}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
               <p className="text-3xl font-bold">{orderList.length}</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
               <p className="text-3xl font-bold">{totalRevenue.toFixed(2)} DZD</p>
          </CardContent>
        </Card>
      </div>

      {/* ===== CHART SECTION ===== */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Products by Category</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="products"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;