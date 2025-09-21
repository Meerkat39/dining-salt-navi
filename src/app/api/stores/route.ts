import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

/**
 * 店舗一覧API
 * GET /api/stores
 * - 全店舗一覧を取得
 */
export async function GET() {
  const stores = await prisma.store.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(stores);
}
