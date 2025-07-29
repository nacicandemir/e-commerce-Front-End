"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { debounce } from "../utils/debounce";

const Search = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchResults = debounce(async (value: string) => {
    if (!value.trim()) {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(`/api/search?query=${value}`);
      const data = await res.json();
      setResults(data);
      setShowDropdown(true);
    } catch (err) {
      console.error("Arama hatası:", err);
    }
  }, 300);

  useEffect(() => {
    fetchResults(query);
  }, [query]);

  // Dışarı tıklanınca popup'ı kapat
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      router.push(`/search?query=${query}`);
      setShowDropdown(false);
    }
  };

  return (
    <div
      className="hidden md:flex flex-1 relative bg-[#f3f3f3] rounded border-2 border-transparent focus-within:border-orange-600"
      ref={containerRef}
    >
      <div className="flex items-center w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Aradığınız ürün, kategori veya markayı yazınız"
          className="w-full px-4 py-2 outline-none"
        />
        <div className="px-3 text-gray-500">
          <FaSearch />
        </div>
      </div>

      {showDropdown && results.length > 0 && (
        <div className="absolute top-full left-0 z-10 w-full  bg-white border border-gray-300 rounded-md shadow-md max-h-64 overflow-y-auto">
          {results.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 px-3 py-2 border hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                router.push(`/product/${item.id}`);
                setShowDropdown(false);
              }}
            >
              <div className="w-12 h-12 relative flex-shrink-0">
                <img
                  src={`https://cdn.dsmcdn.com${item.image}`}
                  alt={item.name}
                  className="w-full h-full object-contain rounded"
                />
              </div>
              <div className="flex flex-col text-sm">
                <span className="font-medium text-gray-800 line-clamp-1">
                  {item.name}
                </span>
                <span className="text-orange-600 font-semibold text-xs">
                  {item.price} TL
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
