// app/api/category/[category]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(_req: Request, { params }: { params: { category: string } }) {
  const categorySlug = params.category;

  const products = await prisma.product.findMany({
    where: {
      categorySlug: categorySlug, // ❗ Burada "category" yerine "categorySlug" olmalı
    },
  });

  return NextResponse.json(products);
}
