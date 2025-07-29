import { getCurrentUser } from "../actions/getCurrentUser";
import { redirect } from "next/navigation";
import AdminClient from "../components/admin/AdminClient";

const AdminPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    redirect("/login");
  }

  return <AdminClient />;
};

export default AdminPage;
