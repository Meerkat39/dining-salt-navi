import type { Menu } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

/**
 * GET /api/chainmenus
 * 全チェーンごとのメニュー一覧をChainMenus型で返すAPI
 * クエリ: ?chain_id=xxx で特定チェーンのみ取得可能
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chain_id = searchParams.get("chain_id") ?? undefined;

  // chain_id指定時のみ、そのチェーンのメニュー一覧を返す
  if (!chain_id) {
    return NextResponse.json([]);
  }
  const menus = await prisma.menu.findMany({
    where: { chain_id },
    orderBy: { sodiumEquivalent_g: "asc" },
  });
  const result = menus.map((m: Menu) => ({
    id: m.id,
    chain_id: m.chain_id,
    name: m.name,
    sodiumEquivalent_g: m.sodiumEquivalent_g,
    created_at:
      typeof m.created_at === "string"
        ? m.created_at
        : m.created_at.toISOString(),
    updated_at:
      typeof m.updated_at === "string"
        ? m.updated_at
        : m.updated_at.toISOString(),
  }));
  return NextResponse.json(result);
}
