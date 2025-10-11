import type { Menu } from "@/types/menu";
import React from "react";
import { filterMainMenus } from "../utils/filterMainMenus";
import MenuListItem from "./MenuListItem";

/**
 * メニュー検索結果リスト
 * メニュー一覧（menus）を受け取り、塩分量フィルタ（saltLimit）で絞り込んで表示する。
 * @param {Menu[]} menus メニューリスト配列
 * @param {number=} saltLimit 塩分量フィルタ（g単位、任意）
 */
type MenuResultListProps = {
  menus: Menu[];
  saltLimit?: number;
};

const MenuResultList: React.FC<MenuResultListProps> = ({
  menus,
  saltLimit,
}) => {
  // メニューリスト表示領域の参照（スクロール制御用）
  const containerRef = React.useRef<HTMLDivElement>(null);

  // 店舗IDやメニューリストが変わったときにスクロール位置を一番上に
  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [menus]);

  // メインメニュー＋塩分量フィルタで絞り込み
  const filteredMenus = filterMainMenus(menus, saltLimit);

  // 条件に合うメニューがない場合の表示
  if (!filteredMenus || filteredMenus.length === 0) {
    return (
      <div className="w-full bg-white rounded shadow p-4 text-gray-500 text-center">
        条件に合うメインメニューが見つかりません
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full bg-white rounded shadow divide-y overflow-y-auto"
      style={{ maxHeight: "100%" }}
    >
      {/* メニューリスト（名前・塩分量）を表示 */}
      {filteredMenus.map((menu) => (
        <MenuListItem key={menu.id} menu={menu} />
      ))}
    </div>
  );
};

export default MenuResultList;
