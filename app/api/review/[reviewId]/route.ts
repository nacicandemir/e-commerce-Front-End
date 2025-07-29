import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function DELETE(
  req: Request,
  { params }: { params: { reviewId: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: "Yetkisiz erişim" },
      { status: 401 }
    );
  }

  const review = await prisma.review.findUnique({
    where: { id: params.reviewId },
  });

  if (!review) {
    return NextResponse.json(
      { error: "Yorum bulunamadı" },
      { status: 404 }
    );
  }

  // Sadece yorum sahibi ya da admin silebilir
  if (
    review.userId !== currentUser.id &&
    currentUser.role !== "ADMIN"
  ) {
    return NextResponse.json(
      { error: "Bu yorumu silme yetkiniz yok" },
      { status: 403 }
    );
  }

  await prisma.review.delete({
    where: { id: params.reviewId },
  });

  return NextResponse.json({ success: true });
}
