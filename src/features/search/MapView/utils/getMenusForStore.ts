import type { ChainMenus } from "@/types/chainmenus";
import type { Menu } from "@/types/menu";
import type { Store } from "@/types/store";

/**
 * chainMenusListからstore.chain_idに一致するmenus配列を取得する関数
 * @param {ChainMenus[]} chainMenusList ChainMenus型配列
 * @param {Store} store Store型
 * @returns {Menu[]} Menu型配列（該当なしの場合は空配列）
 */
export function getMenusForStore(
  chainMenusList: ChainMenus[],
  store: Store
): Menu[] {
  return (
    chainMenusList.find((cm) => cm.chain_id === store.chain_id)?.menus ?? []
  );
}
