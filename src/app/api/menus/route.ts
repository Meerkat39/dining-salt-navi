import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

/**
 * メニューAPIルート
 * GET /api/menus
 * - 全メニュー一覧を取得
 * - chain_id, min_saltEquivalent_g, max_saltEquivalent_g, nameでフィルタ可能
 * - 例: /api/menus?chain_id=xxx&min_saltEquivalent_g=0.5&max_saltEquivalent_g=2.0&name=ハンバーガー
 */
const prisma = new PrismaClient();

/**
 * GET /api/menus
 * 全メニュー一覧を取得（チェーンID・塩分量・メニュー名でフィルタ可能）
 * クエリ例: ?chain_id=xxx&min_salt=0.5&max_salt=2.0&name=ハンバーガー
 */
export async function GET(request: Request) {
  // クエリパラメータ取得
  const { searchParams } = new URL(request.url);
  let chain_id = searchParams.get("chain_id") ?? undefined;
  const store_id = searchParams.get("store_id") ?? undefined;
  const min_saltEquivalent_g = searchParams.get("min_saltEquivalent_g")
    ? Number(searchParams.get("min_saltEquivalent_g"))
    : undefined;
  const max_saltEquivalent_g = searchParams.get("max_saltEquivalent_g")
    ? Number(searchParams.get("max_saltEquivalent_g"))
    : undefined;
  const name = searchParams.get("name") ?? undefined;

  // store_idが指定された場合はDBからchain_idを取得
  if (!chain_id && store_id) {
    const store = await prisma.store.findUnique({
      where: { id: store_id },
      select: { chain_id: true },
    });
    chain_id = store?.chain_id ?? undefined;
  }

  // Prismaの検索条件（型安全）
  const where: Prisma.MenuWhereInput = {};
  if (chain_id) where.chain_id = chain_id;
  if (name) where.name = { contains: name };
  if (min_saltEquivalent_g || max_saltEquivalent_g) {
    where.saltEquivalent_g = {};
    if (min_saltEquivalent_g) where.saltEquivalent_g.gte = min_saltEquivalent_g;
    if (max_saltEquivalent_g) where.saltEquivalent_g.lte = max_saltEquivalent_g;
  }

  // メニュー一覧を取得（塩分量昇順）
  const menus = await prisma.menu.findMany({
    where,
    orderBy: { saltEquivalent_g: "asc" },
  });

  // JSONレスポンスで返却
  return NextResponse.json(menus);
}
