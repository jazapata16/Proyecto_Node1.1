import { useEffect } from "react";
import { useOrders } from "../context/ordersContext";
import { OrderCard } from "../components/orders/OrderCard";
import { ImFileEmpty } from "react-icons/im";

export function OrdersAdminPage() {
  const { orders, getAdminOrders } = useOrders();

  useEffect(() => {
    getAdminOrders();
  }, []);

  return (
    <>
      {orders.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No orders Admin yet, please add a new order
            </h1>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {orders.map((order) => (
          <OrderCard order={order} key={order._id} />
        ))}
      </div>
    </>
  );
}
export default OrdersAdminPage;