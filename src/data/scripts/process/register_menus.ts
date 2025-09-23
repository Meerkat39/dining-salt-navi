/**
 * chainmenus.json（name, saltのみ）をMenuテーブルに一括登録するスクリプト雛形
 * - 指定チェーン名からchain_idを取得
 * - id, created_at, updated_atは自動生成
 * - Prisma Client使用
 *
 * 実行例: npx ts-node src/data/scripts/register_menus.ts マクドナルド
 */
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

/**
 * Prisma Clientインスタンス生成
 */
const prisma = new PrismaClient();

/**
 * コマンドライン引数からチェーン名を取得
 */
const CHAIN_NAME = process.argv[2];
if (!CHAIN_NAME) {
  console.error("チェーン名を指定してください");
  process.exit(1);
}

/**
 * データファイルのパス定義
 * chainmenus.json: 手動収集メニュー一覧
 */
const MENUS_PATH = path.join("src", "data", CHAIN_NAME, "menus.json");

/**
 * 必要なデータファイルの存在チェック
 */
if (!fs.existsSync(MENUS_PATH)) {
  console.error(`menus.jsonが見つかりません: ${MENUS_PATH}`);
  process.exit(1);
}

/**
 * DBから指定チェーン名のchain_idを取得
 */
async function getChainId(chainName: string): Promise<string> {
  const chain = await prisma.chain.findFirst({ where: { name: chainName } });
  if (!chain) {
    console.error(`チェーンがDBに存在しません: ${chainName}`);
    process.exit(1);
  }
  return chain.id;
}

/**
 * メニュー一覧データ（name, saltのみ）を読み込み
 */
const menus = JSON.parse(fs.readFileSync(MENUS_PATH, "utf-8"));

/**
 * メニュー一覧をMenuテーブルに一括登録
 * - idはuuidで自動生成
 * - chain_idでチェーン紐付け
 * - created_at/updated_atはPrisma側で自動付与
 */
async function registerMenus() {
  const chain_id = await getChainId(CHAIN_NAME);
  for (const menu of menus) {
    await prisma.menu.create({
      data: {
        id: uuidv4(),
        chain_id,
        name: menu.name,
        salt: menu.salt,
        // created_at/updated_atは省略（Prismaで自動管理）
      },
    });
    console.log("登録:", menu.name);
  }
  console.log(`全メニュー登録完了: ${menus.length}件`);
}

/**
 * メイン処理実行
 */
registerMenus()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
