"use client";
import { useState } from "react";
import { importAllProducts } from "@/app/actions/importAllProducts";
import AdminContainer from "../containers/AdminContainer";


const AdminClient = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setStatus("⏳ Ürünler içe aktarılıyor...");

    try {
      await importAllProducts();
      setStatus("✅ Ürünler başarıyla çekildi ve kaydedildi.");
    } catch (err) {
      console.error(err);
      setStatus("❌ Hata oluştu.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <AdminContainer>
      <div className="p-10">
        <button
          onClick={handleClick}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "İçe aktarılıyor..." : "Ürünleri İçe Aktar"}
        </button>
        <p className="mt-4">{status}</p>
      </div>
    </AdminContainer>
  );
};

export default AdminClient;
