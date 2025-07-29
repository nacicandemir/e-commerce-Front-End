"use client";

import AdminSidebarItem from "./AdminSidebarItem";
import { MdDashboard } from "react-icons/md";
import { IoMdReorder } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { AiFillProduct } from "react-icons/ai";

const AdminSidebar = () => {
  const pathname = usePathname();
  const adminPanel = [
    {
      name: "Özetler",
      icon: MdDashboard,
      url: "/admin",
    },
    {
      name: "Ürün Oluştur",
      icon: IoCreateOutline,
      url: "/admin/create",
    },
    {
      name: "Ürünleri Yönet",
      icon: AiFillProduct,
      url: "/admin/manage",
    },
    {
      name: "Siparişlerim",
      icon: IoMdReorder,
      url: "/admin/order",
    },
  ];
  return (
    <div className="w-1/6 border-r min-h-screen p-4 bg-gray-100">
      <div className="space-y-8">
        {adminPanel.map((admin, i) => (
          <AdminSidebarItem
            key={i}
            selected={pathname == admin.url}
            icon={admin.icon}
            name={admin.name}
            url={admin.url}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
