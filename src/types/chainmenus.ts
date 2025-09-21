// チェーンごとのメニュー一覧型（ChainMenus）
import type { Menu } from "./menu";

/**
 * ChainMenus型
 * - chain_id: チェーンID
 * - menus: Menu[]（そのチェーンのメニュー一覧）
 */
export type ChainMenus = {
  chain_id: string;
  created_at: string;
  updated_at: string;
  menus: Menu[];
};
