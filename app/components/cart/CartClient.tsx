"use client";

import UseCart from "@/hooks/useCart";
import PageContainer from "../containers/PageContainer";
import Image from "next/image";
import Button from "../general/Button";
import { useEffect, useState } from "react";
import Counter from "../general/Counter";
import { BsFillBasket2Fill } from "react-icons/bs";
import toast from "react-hot-toast";

const CartClient = () => {
  const {
    cartPrdcts,
    removeFromCart,
    removeCart,
    addtoBasketIncrease,
    addtoBasketDecrease,
    isReady, // ⬅️ Eklenen kontrol
  } = UseCart();

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (Array.isArray(cartPrdcts)) {
      const price = cartPrdcts.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setTotalPrice(price);
    }
  }, [cartPrdcts]);

  // 🔁 Sepet verisi henüz hazır değilse loading göster
  if (!isReady) {
    return (
      <div className="my-3 md:my-10">
        <PageContainer>
          <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-lg shadow-md text-gray-600">
            <p className="text-xl font-semibold mb-4 text-center">
              Sepetiniz yükleniyor...
            </p>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        </PageContainer>
      </div>
    );
  }

  // 🛒 Sepet boşsa
  if (!cartPrdcts || cartPrdcts.length === 0) {
    return (
      <div className="my-3 md:my-10">
        <PageContainer>
          <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-lg shadow-md text-gray-600 space-y-3">
            <BsFillBasket2Fill size={50} />
            <p className="text-xl font-semibold mb-4 text-center">
              Sepetinizde henüz hiçbir ürün bulunmamaktadır.
            </p>
            <Button
              text="Alışverişe Başla"
              onClick={() => (window.location.href = "/")}
            />
          </div>
        </PageContainer>
      </div>
    );
  }

  // ✅ Sepette ürün varsa
  return (
    <div className="my-3 md:my-10">
      <PageContainer>
        {/* Başlıklar - Sadece Masaüstü */}
        <div className="hidden md:flex items-center text-center font-semibold text-gray-700 border-b border-gray-200 py-3 mb-4">
          <div className="w-1/4">Ürün</div>
          <div className="w-1/4">Ürün Miktarı</div>
          <div className="w-1/4">Ürün Fiyatı</div>
          <div className="w-1/4"></div>
        </div>

        {/* Ürün Listesi */}
        <div className="flex flex-col gap-4">
          {cartPrdcts.map((cart) => (
            <div
              className="flex flex-col md:flex-row items-center justify-between text-center
                         my-2 p-4 bg-white rounded-lg shadow-sm
                         md:my-0 md:p-0 md:bg-transparent md:rounded-none md:shadow-none md:border-b md:border-gray-100 md:pb-4"
              key={cart.id}
            >
              {/* Ürün Resmi ve Adı */}
              <div className="w-full md:w-1/5 flex flex-col md:flex-row items-center justify-center mb-3 md:mb-0">
                <Image
                  src={`https://cdn.dsmcdn.com${cart.images.trim()}`}
                  width={80}
                  height={80}
                  alt={cart.name}
                  className="rounded-md shadow-sm mb-2 md:mb-0 md:mr-4"
                />
                <span className="font-medium text-gray-800 text-lg md:text-base">
                  {cart.name}
                </span>
              </div>

              {/* Miktar */}
              <div className="w-full md:w-1/5 mb-3 md:mb-0 flex flex-col items-center">
                <p className="md:hidden text-sm text-gray-500 mb-1">Miktar:</p>
                <Counter
                  cardProduct={cart}
                  increaseFunc={() => addtoBasketIncrease(cart)}
                  decreaseFunc={() => addtoBasketDecrease(cart)}
                />
              </div>

              {/* Fiyat */}
              <div className="w-full md:w-1/5 mb-3 md:mb-0">
                <p className="md:hidden text-sm text-gray-500 mb-1">Fiyat:</p>
                <span className="text-green-600 font-bold text-xl md:text-lg">
                  {(cart.price * cart.quantity).toFixed(3)} TL
                </span>
              </div>

              {/* Sil Butonu */}
              <div className="w-full md:w-1/5 flex items-center justify-center mt-3 md:mt-0">
                <Button
                  text="Ürünü Sil"
                  onClick={() => removeFromCart(cart)}
                  small
                  outline
                />
              </div>
            </div>
          ))}
        </div>

        {/* Alt Toplam ve Sepeti Temizle */}
        <div className="flex flex-col md:flex-row items-center justify-between my-5 py-5 border-t border-gray-200">
          <button
            onClick={() => removeCart()}
            className="w-full md:w-1/5 text-center md:text-left underline text-sm cursor-pointer hover:text-red-700 transition-colors duration-200 mb-4 md:mb-0"
          >
            Tüm Sepeti Temizle
          </button>
          <div className="w-full md:w-1/3 flex justify-center md:justify-end text-xl md:text-2xl font-bold text-green-500">
            Toplam Fiyat: {totalPrice.toFixed(3)} TL
          </div>
        </div>
        {/* Sipariş Oluştur Butonu */}
        <div className="w-full flex justify-center md:justify-end mt-4">
          <div className="w-1/4">
            <Button
              text="Sipariş Oluştur"
              onClick={async () => {
                console.log("📦 Gönderilen veri:", {
                  cartItems: cartPrdcts,
                  totalPrice: totalPrice,
                });

                const res = await fetch("/api/orders", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    cartItems: cartPrdcts,
                    totalPrice: totalPrice,
                  }),
                });

                if (res.ok) {
                  toast.success("Siparişiniz oluşturuldu 🎉");
                  removeCart(); // sepeti temizle
                  window.location.href = "/admin/order";
                } else {
                  toast.error("Sipariş oluşturulamadı");
                }
              }}
            />
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default CartClient;
