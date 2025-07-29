import prisma from "@/libs/prismadb";

interface IParams {
  productId?: string;
}

export default async function getProductsId(params: IParams) {
  const { productId } = params;

  // Önce ürünü çek
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) return null;

  // Sonra yorumları ayrı çek (sıralı şekilde)
  const reviews = await prisma.review.findMany({
    where: { productId: productId! },
    include: { user: true },
    orderBy: { createdDate: "desc" },
  });

  // İkisini birleştir
  return {
    ...product,
    reviews,
  };
}
