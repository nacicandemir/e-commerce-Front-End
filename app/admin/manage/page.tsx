import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getProducts from "@/app/actions/getProducts";
import ManageClient from "@/app/components/admin/ManageClient";
import AdminContainer from "@/app/components/containers/AdminContainer";
import { redirect } from "next/navigation";

const Manage = async () => {
  const products = await getProducts({ category: null });
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return redirect("/login");
  }
  return (
    <div className="w-full m-2">
      <ManageClient products={products} />
    </div>
  );
};

export default Manage;
