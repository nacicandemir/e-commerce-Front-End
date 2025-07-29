"use client";

import Image from "next/image";
import PageContainer from "../containers/PageContainer";
import { Rating } from "@mui/material";
import Counter from "../general/Counter";
import { useEffect, useState } from "react";
import Button from "../general/Button";
import Comment from "./Comment";
import Heading from "../general/Heading";
import UseCart from "@/hooks/useCart";
import { useRouter } from "next/navigation";

export type CardProductProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: string;
  inStock: boolean;
};

const DetailClient = ({
  product,
  currentUser,
}: {
  product: any;
  currentUser: any;
}) => {
  const { productCartQty, addToBasket, cartPrdcts } = UseCart();
  const [displayButton, setDisplayButton] = useState(false);
  const router = useRouter();

  const [cardProduct, setCardProduct] = useState<CardProductProps>({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: 1,
    images: product.image,
    inStock: product.inStock,
  });

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const exists =
      Array.isArray(cartPrdcts) &&
      cartPrdcts.some((cart) => cart.id === product.id);
    setDisplayButton(exists);
  }, [cartPrdcts, product.id]);

  const productRating =
    product?.reviews?.length > 0
      ? product.reviews.reduce(
          (acc: number, item: any) => acc + parseFloat(item.rating),
          0
        ) / product.reviews.length
      : 0;

  const increaseFunc = () => {
    if (cardProduct.quantity === 10) return;
    setCardProduct((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  };

  const decreaseFunc = () => {
    if (cardProduct.quantity === 1) return;
    setCardProduct((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !comment) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          comment,
          rating,
        }),
      });

      setComment("");
      setRating(null);

       router.refresh(); // ✅ Sorunsuz sayfa yenileme
    } catch (err) {
      console.error("Yorum gönderme hatası:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="my-6 sm:my-10">
      <PageContainer>
        <div className="min-h-screen flex flex-wrap items-start justify-center py-6 sm:py-10">
          <div className="max-w-6xl w-full px-4 sm:px-8 flex flex-col md:flex-row gap-6 sm:gap-10">
            <div className="relative w-full md:w-[424px] aspect-[3/4] bg-gray-100">
              <Image
                src={`https://cdn.dsmcdn.com${product.image}`}
                fill
                alt="ürün"
                className="object-contain"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold mb-2">
                {product?.name}
              </h1>

              <div className="flex items-center mb-2">
                <div>{productRating}</div>
                <Rating
                  name="read-only"
                  value={productRating}
                  readOnly
                  precision={0.5}
                />
                <div className="text-sm text-gray-600">
                  ({product.reviews.length} değerlendirme)
                </div>
              </div>

              <p className="mb-2 text-sm sm:text-base whitespace-pre-line">
                {product?.description}
              </p>

              <div className="text-xl sm:text-2xl font-semibold mb-4">
                {product?.price} ₺
              </div>

              <div className="mb-4">
                <div className="text-sm sm:text-base font-medium">
                  Stok Durumu:
                </div>
                {product.inStock ? (
                  <div className="text-green-500 text-sm sm:text-base">
                    Ürün Stokta Mevcut.
                  </div>
                ) : (
                  <div className="text-red-500 text-sm sm:text-base">
                    Ürün Stokta Yok.
                  </div>
                )}
                {displayButton ? (
                  <Button
                    text="Ürün Sepete Eklendi..."
                    small
                    outline
                    onClick={() => {}}
                  />
                ) : (
                  <div className="mt-4">
                    <Counter
                      cardProduct={cardProduct}
                      increaseFunc={increaseFunc}
                      decreaseFunc={decreaseFunc}
                    />
                    <Button
                      text="Sepete Ekle"
                      small
                      onClick={() => addToBasket(cardProduct)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="max-w-6xl w-full px-6 sm:px-8 mt-10">
            <Heading text="Yorumlar:" />
            {product?.reviews?.length ? (
              product.reviews.map((prd: any) => (
                <Comment currentUser={currentUser} key={prd.id} prd={prd} />
              ))
            ) : (
              <div className="text-sm text-gray-600">
                Henüz yorum yapılmamış.
              </div>
            )}
          </div>

          {currentUser ? (
            <div className="max-w-6xl w-full px-4 sm:px-8 mt-10">
              <Heading text="Yorum Yap" />
              <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-xl p-6 space-y-4 mt-4 border border-gray-200"
              >
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Puanınız
                  </label>
                  <Rating
                    name="user-rating"
                    value={rating}
                    onChange={(_, newValue) => setRating(newValue)}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Yorumunuz
                  </label>
                  <textarea
                    className="w-full h-28 p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
                    placeholder="Yorumunuzu yazın..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  />
                </div>
                <Button
                  text={isSubmitting ? "Gönderiliyor..." : "Gönder"}
                  disabled={isSubmitting}
                  type="submit"
                />
              </form>
            </div>
          ) : (
            <div className="text-sm text-gray-600 mt-6">
              Yorum yapmak için{" "}
              <span
                onClick={() => router.push("/register")}
                className="text-blue-600 font-medium cursor-pointer"
              >
                giriş yapın
              </span>
              .
            </div>
          )}
        </div>
      </PageContainer>
    </div>
  );
};

export default DetailClient;
