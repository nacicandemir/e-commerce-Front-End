"use client";

import UseCart from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { SlBasket } from "react-icons/sl";

const CardCount = () => {
  const { cartPrdcts } = UseCart();
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/cart")}
      className="hidden md:flex cursor-pointer relative border:none bg-slate-300 py-2 px-3 rounded-xl select-none"
    >
      <div className="flex items-center justify-center gap-1">
        <SlBasket size={20} />
        Sepetim
      </div>
      {cartPrdcts &&
        cartPrdcts.length > 0 && ( // Conditional rendering for the notification
          <div className="absolute text-xs top-0 right-0 text-white bg-orange-600 w-4 h-4 flex items-center justify-center rounded-full">
            {cartPrdcts.length}
          </div>
        )}
    </div>
  );
};

export default CardCount;
