import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query")?.trim() || "";

  // Eğer query boşsa boş array döndür
  if (!query) {
    return NextResponse.json([]);
  }

  const products = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      reviews: true,
    },
  });

  return NextResponse.json(products);
}
