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
  // クエリパラメータからchain_idを取得
  const { searchParams } = new URL(request.url);
  const chain_id = searchParams.get("chain_id") ?? undefined;

  // chain_id未指定なら空配列を返す（全チェーン取得は不可）
  if (!chain_id) {
    return NextResponse.json([]);
  }

  // 指定チェーンのメニュー一覧をDBから取得（塩分量昇順）
  const menus = await prisma.menu.findMany({
    where: { chain_id },
    orderBy: { saltEquivalent_g: "asc" },
  });

  // 日付型をISO文字列に変換して返却
  const result = menus.map((m: Menu) => ({
    id: m.id,
    chain_id: m.chain_id,
    name: m.name,
    saltEquivalent_g: m.saltEquivalent_g,
    created_at:
      typeof m.created_at === "string"
        ? m.created_at
        : m.created_at.toISOString(),
    updated_at:
      typeof m.updated_at === "string"
        ? m.updated_at
        : m.updated_at.toISOString(),
  }));

  // メニュー一覧をJSONで返す
  return NextResponse.json(result);
}
