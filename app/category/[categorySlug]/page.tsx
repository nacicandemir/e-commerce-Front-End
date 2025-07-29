import CategoryPage from "@/app/components/category/categoryPage";
import PageContainer from "@/app/components/containers/PageContainer";
import prisma from "@/libs/prismadb";

function formatCategoryName(slug: string): string {
  const mapping: Record<string, string> = {
    "kitaplar-müzikler": "Kitap & Müzik",
    "ev-yasam": "Ev & Yaşam",
    "elektronik": "Elektronik",
    "spor": "Spor",
    "kadin": "Kadın",
    "erkek": "Erkek",
  };

  return mapping[slug] ?? slug;
}


interface CategoryPageProps {
  params: {
    categorySlug: string; // bu aslında categorySlug
  };
}

export default async function DynamicCategoryPage({ params }: CategoryPageProps) {
  const categorySlug = params.categorySlug;
  const decodedSlug = decodeURIComponent(categorySlug);

  const firstProduct = await prisma.product.findFirst({
    where: {
      categorySlug: decodedSlug,
    },
    select: {
      category: true,
    },
  });

  const categoryName = firstProduct?.category ?? formatCategoryName(decodedSlug);

  return (
    <PageContainer>
      <CategoryPage category={categoryName} categorySlug={decodedSlug} />
    </PageContainer>
  );
}
