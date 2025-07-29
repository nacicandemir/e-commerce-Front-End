"use client";

import { Product } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ManageClientProps {
  products: Product[];
}

const ManageClient: React.FC<ManageClientProps> = ({ products }) => {
  const router = useRouter();

  const [rows, setRows] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false); // 👈 mounting kontrolü

  useEffect(() => {
    setMounted(true); // component mount edildi
  }, []);

  useEffect(() => {
    if (products && mounted) {
      const formatted = products.map((product) => ({
        id: product.id,
        name: product.name,
        price: `${product.price} TL`,
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        image: product.image,
      }));
      setRows(formatted);
    }
  }, [products, mounted]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 225 },
    { field: "name", headerName: "Ad", width: 375 },
    { field: "price", headerName: "Ücret", width: 100 },
    { field: "category", headerName: "Kategori", width: 200 },
    { field: "brand", headerName: "Marka", width: 100 },
    {
      field: "inStock",
      headerName: "Stok",
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            {params.row.inStock == true ? "Stokta Mevcut" : "Stokta Yoktur"}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <button
            onClick={() => handleDelete(params.row.id)}
            className="flex justify-center text-red-500 cursor-pointer rounded-2xl mx-4"
          >
            Sil❌
          </button>
        );
      },
    },
  ];

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/product/${id}`);
      toast.success("Silme işlemi başarılı!");
      router.refresh();
    } catch (error) {
      console.error("Silme hatası:", error);
      toast.error("Silme sırasında bir hata oluştu.");
    }
  };
  const handleDeleteAll = async () => {
    try {
      await axios.delete("/api/product/deleteAll");
      toast.success("Tüm ürünler silindi!");
      router.refresh();
    } catch (error) {
      console.error("Toplu silme hatası:", error);
      toast.error("Tüm ürünleri silerken bir hata oluştu.");
    }
  };

  return (
    <>
      <Paper sx={{ height: 450, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
      <div className="w-full flex justify-end mt-2">
        <button
          onClick={handleDeleteAll}
          className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Tüm Ürünleri Sil
        </button>
      </div>
    </>
  );
};

export default ManageClient;
