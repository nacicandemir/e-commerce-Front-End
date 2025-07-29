import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function DELETE() {
  try {
    await prisma.product.deleteMany({});
    return NextResponse.json({ message: "Tüm ürünler başarıyla silindi." }, { status: 200 });
  } catch (error) {
    console.error("Tüm ürünleri silme hatası:", error);
    return NextResponse.json({ message: "Hata oluştu." }, { status: 500 });
  }
}
