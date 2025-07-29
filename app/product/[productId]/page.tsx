import { notFound } from "next/navigation";
import DetailClient from "@/app/components/detail/DetailClient";
import getProductsId from "@/app/actions/getProductsId";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

interface DetailPageProps {
  params: {
    productId?: string;
  };
}

const DetailPage = async ({ params }: DetailPageProps) => {
  if (!params?.productId) {
    return notFound(); // ✅ bu daha güvenli
  }

  const product = await getProductsId({ productId: params.productId });
  const currentUser = await getCurrentUser();

  if (!product) {
    return notFound(); // ✅ ürün de yoksa 404
  }

  return <DetailClient product={product} currentUser={currentUser} />;
};

export default DetailPage;
