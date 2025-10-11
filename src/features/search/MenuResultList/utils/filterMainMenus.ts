import type { Menu } from "@/types/menu";

/**
 * メインメニュー＋塩分量フィルタで絞り込むユーティリティ関数
 * @param {Menu[]} menus メニューリスト配列
 * @param {number=} saltLimit 塩分量フィルタ（g単位、任意）
 * @returns {Menu[]} 絞り込まれたメインメニュー配列
 */
export function filterMainMenus(menus: Menu[], saltLimit?: number): Menu[] {
  return (
    menus?.filter(
      (menu) =>
        menu.type === "main" &&
        (typeof saltLimit !== "number" || menu.saltEquivalent_g <= saltLimit)
    ) ?? []
  );
}
