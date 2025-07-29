"use client";

import { useEffect, useState } from "react";
import Heading from "../general/Heading";
import ProductCard from "../Home/ProductCards";
import { Box, CircularProgress } from "@mui/material";

export default function CategoryPage({category , categorySlug }: {category:string , categorySlug: string }) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchCategoryProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/category/${categorySlug}`);
      const data = await res.json();
      console.log("✅ Gelen veri:", data); // ⬅️ Burayı kontrol et
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error("❌ API yanlış veri döndü:", data);
        setProducts([]); // fallback
      }
    } catch (err) {
      console.error("Ürünler getirilemedi:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchCategoryProducts();
}, [categorySlug]);



  return (
    <div className="p-4">
      <Heading
        className="font-bold text-xl mb-3"
        text={`${category} Ürünleri`}
      />
      {loading ? (
        <div className="flex items-center justify-center text-center py-10">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      ) : products.length === 0 ? (
        <p>Bu kategoride ürün bulunamadı.</p>
      ) : (
        <div className="flex items-center flex-wrap gap-3 md:gap-5 px-3 md:px-5">
          {Array.isArray(products) &&
            products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </div>
  );
}
