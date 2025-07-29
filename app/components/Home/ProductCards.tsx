"use client";

import { Rating } from "@mui/material";
import Image from "next/image";
import textClip from "../utils/TextClip";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProductCard = ({ product }: { product: any }) => {
  let productRating = product?.reviews?.length
    ? product.reviews.reduce(
        (acc: number, item: any) => acc + parseFloat(item.rating),
        0
      ) / product.reviews.length
    : 0;

  return (
    <Link href={`/product/${product.id}`}>
      <div className="w-[240px] cursor-pointer flex flex-col shadow-lg p-4 rounded-md ml-4">
        <div className="relative w-full h-[250px]">
          <Image
            src={`https://cdn.dsmcdn.com${product.image}`}
            fill
            alt={product.name}
            className="object-contain"
          />
        </div>

        <div>
          <div className="text-center mt-2 space-y-1">
            {textClip(product.name)}
          </div>
          <div className="flex justify-center">
            <div>{productRating}</div>
            <Rating name="read-only" value={productRating} readOnly />
            <div className="text-sm text-gray-600">
              ({product.reviews?.length || 0})
            </div>
          </div>
          <div className="text-center text-orange-600 font-bold text-lg md:text-xl">
            {product.price} TL
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
