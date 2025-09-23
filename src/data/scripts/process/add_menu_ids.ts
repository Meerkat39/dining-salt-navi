import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

/**
 * メニューデータにid/chain_idを自動付与するスクリプト
 *
 * 実行例:
 *   npx ts-node src/data/scripts/add_menu_ids.ts マクドナルド
 *
 * 必要ファイル:
 *   src/data/chains.json
 *   src/data/チェーン名/menus.json
 *
 * 変換後:
 *   src/data/チェーン名/menus.json（id/chain_id付きで上書き）
 */

const CHAIN_NAME = process.argv[2];
if (!CHAIN_NAME) {
  console.error(
    "チェーン名をコマンドライン引数で指定してください。例: npx ts-node src/data/scripts/add_menu_ids.ts マクドナルド"
  );
  process.exit(1);
}
const CHAINS_PATH = path.join("src", "data", "chains.json");
const MENUS_PATH = path.join("src", "data", CHAIN_NAME, "menus.json");

// チェーンID取得
let chains: { id: string; name: string }[] = [];
if (fs.existsSync(CHAINS_PATH)) {
  try {
    const raw = fs.readFileSync(CHAINS_PATH, "utf-8");
    chains = raw.trim() ? JSON.parse(raw) : [];
    if (!Array.isArray(chains)) chains = [];
  } catch {
    chains = [];
  }
}
const chain = chains.find((c) => c.name === CHAIN_NAME);
if (!chain) {
  console.error(
    `chains.jsonにチェーン名『${CHAIN_NAME}』が見つかりません。先に店舗スクリプトを実行してください。`
  );
  process.exit(1);
}

// メニューデータ読み込み
if (!fs.existsSync(MENUS_PATH)) {
  console.error(`menus.jsonが見つかりません: ${MENUS_PATH}`);
  process.exit(1);
}
const menusRaw = fs.readFileSync(MENUS_PATH, "utf-8");
const menusJson = JSON.parse(menusRaw);
const menus = Array.isArray(menusJson.menus) ? menusJson.menus : [];

// メニュー型定義
type Menu = {
  name: string;
  salt: number;
};

// id/chain_id付与
const newMenus = (menus as Menu[]).map((menu) => ({
  id: uuidv4(),
  chain_id: chain.id,
  name: menu.name,
  salt: menu.salt,
}));

// 上書き保存（元の構造を維持）
const result = {
  chain: CHAIN_NAME,
  menus: newMenus,
};
fs.writeFileSync(MENUS_PATH, JSON.stringify(result, null, 2), "utf-8");
console.log(`menus.jsonをid/chain_id付きで上書きしました: ${MENUS_PATH}`);
