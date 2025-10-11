import type { Menu } from "@/types/menu";
import React from "react";

/**
 * MenuResultList（メニュー検索結果リスト）
 * - メニュー一覧を受け取り、各メニューを表示
 * - 今後の拡張で詳細表示やフィルタ連携も可能
 *
 * @param {Menu[]} menus メニューリスト配列
 */
type MenuResultListProps = {
  menus: Menu[];
  saltLimit?: number;
};

const MenuResultList: React.FC<MenuResultListProps> = ({
  menus,
  saltLimit,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  // 店舗IDやメニューリストが変わったときにスクロール位置を一番上に
  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [menus]);
  // mainかつ塩分量フィルタ
  const filteredMenus =
    menus?.filter(
      (menu) =>
        menu.type === "main" &&
        (typeof saltLimit !== "number" || menu.saltEquivalent_g <= saltLimit)
    ) ?? [];
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
      {filteredMenus.map((menu) => (
        <div key={menu.id} className="p-4 flex flex-col gap-1">
          <span className="font-semibold text-lg">{menu.name}</span>
          <span className="text-sm text-gray-600">
            塩分: {menu.saltEquivalent_g}g
          </span>
        </div>
      ))}
    </div>
  );
};

export default MenuResultList;
