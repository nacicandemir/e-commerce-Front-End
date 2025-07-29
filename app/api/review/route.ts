import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Giriş yapmanız gerekiyor" }, { status: 401 });
    }

    const body = await req.json();

    console.log("Gelen body verisi:", body); // ✅ DEBUG log

    const { productId, comment, rating } = body;

    if (!productId || !comment || rating === null || rating === undefined) {
      return NextResponse.json({ error: "Eksik alanlar" }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        userId: currentUser.id,
        productId,
        comment,
        rating: rating.toString(), // çünkü schema'da String
      },
    });

    return NextResponse.json(review);
  } catch (error: any) {
    console.error("REVIEW POST ERROR:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
