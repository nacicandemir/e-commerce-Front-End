import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Giriş yapmalısınız." },
        { status: 401 }
      );
    }


    const orders = await prisma.order.findMany({
      where: {
        userId: currentUser.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders);
  } catch (error: any) {
    console.error("❌ Sipariş oluşturulamadı:", error.message);
    console.error("📦 Hata detayı:", error);
    return NextResponse.json(
      { error: error.message || "Sunucu hatası" },
      { status: 500 }
    );
  }
}
