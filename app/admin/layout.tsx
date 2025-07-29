import React from "react"
import AdminSidebar from "../components/admin/AdminSidebar"


const AdminLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="flex min-h-screen gap-3 pt-28">
        <AdminSidebar/>
        {children}
    </div>
  )
}

export default AdminLayout