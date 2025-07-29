import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export const dynamic = "force-dynamic"; // cache problemi yaşamamak için

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cartItems, totalPrice } = body;

    console.log("🔵 POST isteği geldi");
    console.log("📦 Gelen veri:", { cartItems, totalPrice });

    const currentUser = await getCurrentUser();
    console.log("👤 Kullanıcı:", currentUser);

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: "Boş sepet" }, { status: 400 });
    }

    // Siparişi oluştur
    const order = await prisma.order.create({
      data: {
        userId: currentUser.id,
        totalPrice,
        items: cartItems.map((item: any) => ({
          externalId: item.externalId,
          productId: item.id,
          name: item.name,
          image: (item.image || item.images)?.trim(),
          price: item.price,
          quantity: item.quantity,
        })),
      },
    });

    console.log("✅ Sipariş oluşturuldu:", order);
    return NextResponse.json(order);
  } catch (error: any) {
    console.error("❌ Sipariş oluşturulamadı:", error.message);
    console.error("📦 Hata detayı:", error);
    return NextResponse.json(
      { error: error.message || "Sunucu hatası" },
      { status: 500 }
    );
  }
}
