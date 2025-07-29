// scripts/deleteAllProducts.ts
import prisma from "@/libs/prismadb";

async function main() {
  try {
    await prisma.product.deleteMany({});
    console.log("✅ Tüm ürünler başarıyla silindi.");
  } catch (error) {
    console.error("❌ Ürün silme hatası:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
