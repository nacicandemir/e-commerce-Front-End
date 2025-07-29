"use server";

import prisma from "@/libs/prismadb";
import {
  fetchMenProducts,
  fetchBooksAndMusics,
  fetchElectronics,
  fetchWomenProducts,
  fetchHomeAndLife,
  fetchSports,
} from "./fetch/getProductsTrendyol";
import { fetchProductDescription } from "./fetch/getProductsDetail";


export async function importAllProducts() {
  const allGroups = [
    ...(await fetchMenProducts()),
    ...(await fetchWomenProducts()),
    ...(await fetchElectronics()),
    ...(await fetchHomeAndLife()),
    ...(await fetchSports()),
    ...(await fetchBooksAndMusics()),
  ];

  console.log("🔍 Toplam kategori grubu:", allGroups.length);
  console.log("👕 Örnek ürün:", allGroups?.[0]?.products?.[0]);

  for (let index = 0; index < allGroups.length; index++) {
    const group = allGroups[index];
    if (!group.products?.length) continue;

    const categoryName = group.name ?? `Kategori-${index}`;
    const categoryId = group.id ?? `id-${index}`;
    const categorySlug = group.slug ?? `kategori-${index}`;

    for (const product of group.products) {
      try {
        const existingProduct = await prisma.product.findUnique({
          where: { externalId: product.id },
        });

        if (existingProduct) {
          console.log(`⏭️ Zaten var: ${product.name}`);
          continue;
        }

        // ✅ Açıklamayı ayrı API'den çekiyoruz
        const description = await fetchProductDescription(product.id);

        await prisma.product.create({
          data: {
            externalId: product.id,
            name: product.name,
            price: product.price?.discountedPrice ?? 0,
            image: product.imageUrl ?? "",
            category: categoryName,
            categorySlug: categorySlug,
            categoryId: categoryId,
            description: description, // satır satır açıklama
            brand: product.brand ?? "Bilinmiyor",
            inStock: true,
          },
        });

        console.log(`✅ Kaydedildi: ${product.name}`);
      } catch (err) {
        console.error(`❌ Hata (${product.name}):`, err);
      }
    }
  }

  console.log("🎉 Tüm kategoriler başarıyla kaydedildi.");
}
