// lib/db.ts
import { PrismaClient } from "@prisma/client";

// globalThis çözümü development ortamında tekrar client oluşturmayı engeller
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"], // opsiyonel: SQL sorguları loglansın istiyorsan
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
