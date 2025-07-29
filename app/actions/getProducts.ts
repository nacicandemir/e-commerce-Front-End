import prisma from '@/libs/prismadb'

export interface IProductParams {
  category?: string | null
  search?: string | null
}

export default async function getProducts(params: IProductParams) {
  try {
    const { category, search } = params
    const searchString = search || ""

    const query: any = {}

    if (category) {
      query.category = category
    }

    const products = await prisma.product.findMany({
      where: {
        ...query,
        OR: [
          {
            name: {
              contains: searchString,
              mode: 'insensitive'
            }
          },
          {
            description: {
              contains: searchString,
              mode: 'insensitive'
            }
          }
        ]
      },
      include: {
        reviews: {
          include: {
            user: true
          },
          orderBy: {
            createdDate: 'desc'
          }
        }
      }
    })

    return products
  } catch (error: any) {
    console.error("🔥 Prisma getProducts hatası:", error)
    throw new Error("Ürünler alınırken bir hata oluştu.")
  }
}
