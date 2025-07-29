"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Heading from "../components/general/Heading";
import ProductCard from "../components/Home/ProductCards";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") || "";
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?query=${query}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Arama hatası:", err);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) fetchData();
  }, [query]);

  return (
    <div className="p-6">
      <Heading
        className="font-bold text-black pt-25"
        text={`Arama Sonuçları: "${query}" araması için ${results.length} sonuç listeleniyor`}
      />

      {isLoading ? (
        <div className="text-center py-10">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      ) : results.length > 0 ? (
        <div className="flex flex-wrap gap-4 justify-start mt-6">
          {results.map((prd) => (
            <ProductCard key={prd.id} product={prd} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Sonuç bulunamadı.</p>
      )}
    </div>
  );
};

export default SearchPage;
