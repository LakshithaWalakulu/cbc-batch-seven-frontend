


import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import OrderModal from "../../components/orderInfoModal";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const navigate = useNavigate();


useEffect(() => {
  if (isLoading) {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(import.meta.env.VITE_API_URL + "/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Raw response:", response.data);

        const data = response.data;
        let ordersArray = [];

        if (Array.isArray(data)) {
          ordersArray = data;
        } else if (Array.isArray(data.orders)) {
          ordersArray = data.orders;
        } else if (Array.isArray(data.data)) {
          ordersArray = data.data;
        } 
        // ✅ handle single order object case
        else if (typeof data === "object" && data.orderID) {
          ordersArray = [data];
        } 
        else {
          console.warn("Unexpected data format:", data);
        }

        console.log("Final orders array:", ordersArray);
        setOrders(ordersArray);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setIsLoading(false);
      });
  }
}, [isLoading]);


  return (
    <div className="w-full min-h-full">
      <OrderModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        selectedOrder={selectedOrder}
        refresh={() => {
          setIsLoading(true);
        }}
      />

      <div className="mx-auto max-w-7xl p-6">
        <div className="rounded-2xl border border-secondary/10 bg-primary shadow-sm">
          <div className="flex items-center justify-between gap-4 border-b border-secondary/10 px-6 py-4">
            <h1 className="text-lg font-semibold text-secondary">Orders</h1>
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              {orders.length} orders
            </span>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <Loader />
            ) : (
              <table className="w-full min-w-[880px] text-left">
                <thead className="bg-secondary text-white">
                  <tr>
                    <th className="px-4 py-3 text-xs font-semibold uppercase">Order ID</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase">Number of Items</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase">Customer Name</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase">Email</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase">Phone</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase">Address</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase">Total</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase text-center">Status</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase text-center">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary/10">
                 
                     {Array.isArray(orders) && orders.map((item) => {
                
									return (
										<tr
											key={item.orderID}
											className="odd:bg-white even:bg-primary hover:bg-accent/5 transition-colors"
                                            onClick={()=>{
                                                setSelectedOrder(item);
                                                setIsModalOpen(true);
                                            }}
										>
											
											<td className="px-4 py-3 font-mono text-sm text-secondary/80">
												{item.orderID}
											</td>
											<td className="px-4 py-3 font-medium text-secondary">
												{item.items.length} items
											</td>
											<td className="px-4 py-3 font-medium text-secondary">
												{item.customerName}
											</td>
											<td className="px-4 py-3 font-medium text-secondary">
												{item.email}
											</td>
											<td className="px-4 py-3 text-secondary/70">
												{item.phone}
											</td>
											<td className="px-4 py-3">
												{item.address}
											</td>
											<td className="px-4 py-3">
												{`LKR ${item.total.toFixed(2)}`}
											</td>
                                            <td className="px-4 py-3 text-center">
                                                {item.status}
                                            </td>
                                            <td className="px-4 py-3">
                                                {new Date(item.date).toLocaleDateString()}
                                            </td>
										</tr>
									);
								})}

                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
