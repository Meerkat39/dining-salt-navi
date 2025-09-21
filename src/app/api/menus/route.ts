import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

/**
 * メニューAPIルート
 * GET /api/menus
 * - 全メニュー一覧を取得
 * - chain_id, min_salt, max_salt, nameでフィルタ可能
 * - 例: /api/menus?chain_id=xxx&min_salt=0.5&max_salt=2.0&name=ハンバーガー
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
  const chain_id = searchParams.get("chain_id") ?? undefined;
  const min_salt = searchParams.get("min_salt")
    ? Number(searchParams.get("min_salt"))
    : undefined;
  const max_salt = searchParams.get("max_salt")
    ? Number(searchParams.get("max_salt"))
    : undefined;
  const name = searchParams.get("name") ?? undefined;

  // Prismaの検索条件（型安全）
  const where: Prisma.MenuWhereInput = {};
  if (chain_id) where.chain_id = chain_id;
  if (name) where.name = { contains: name };
  if (min_salt || max_salt) {
    where.salt = {};
    if (min_salt) where.salt.gte = min_salt;
    if (max_salt) where.salt.lte = max_salt;
  }

  // メニュー一覧を取得（塩分量昇順）
  const menus = await prisma.menu.findMany({
    where,
    orderBy: { salt: "asc" },
  });

  // JSONレスポンスで返却
  return NextResponse.json(menus);
}
