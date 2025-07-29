"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AuthContainer from "@/app/components/containers/AuthContainer";

interface OrderItem {
  externalId: number;
  productId: number;
  name: string;
  image: string;
  images: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  createdAt: string;
  totalPrice: number;
  items: OrderItem[];
}

const Order = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders/user");
        const data = await res.json();
        setOrders(data);
        console.log("🧾 Gelen Siparişler:", data);
      } catch (error) {
        console.error("Siparişler alınamadı:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <AuthContainer>
      <div>
        <h1 className="text-2xl font-bold mb-6 text-center">Siparişlerim</h1>

        {orders.length === 0 ? (
          <p className="text-gray-600">
            Henüz hiç sipariş vermediniz.
          </p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 mb-6 shadow-sm"
            >
              <div className="mb-3 text-sm text-gray-600">
                <p>
                  <strong>Sipariş Tarihi:</strong>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Toplam Tutar:</strong> {order.totalPrice.toFixed(2)}{" "}
                  TL
                </p>
              </div>

              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-6 border rounded-md hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => router.push(`/product/${item.productId}`)}
                  >
                    <div className="relative w-25 h-25 flex-shrink-0">
                      {item.image ? (
                        <Image
                          src={`https://cdn.dsmcdn.com${item.image}`}
                          fill
                          alt={item.name}
                          className="object-cover rounded"
                        />
                      ) : (
                        <Image
                          src={`https://cdn.dsmcdn.com${item.images}`}
                          fill
                          alt={item.name}
                          className="object-cover rounded"
                        />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800">
                        {item.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {item.quantity} x {item.price.toFixed(2)} TL ={" "}
                        {(item.price * item.quantity).toFixed(2)} TL
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </AuthContainer>
  );
};

export default Order;
