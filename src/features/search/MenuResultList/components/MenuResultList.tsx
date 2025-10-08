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
};

const MenuResultList: React.FC<MenuResultListProps> = ({ menus }) => {
  if (!menus || menus.length === 0) {
    return (
      <div className="w-full bg-white rounded shadow p-4 text-gray-500 text-center">
        メニューが見つかりません
      </div>
    );
  }
  return (
    <div className="w-full bg-white rounded shadow divide-y">
      {menus.map((menu) => (
        <div key={menu.id} className="p-4 flex flex-col gap-1">
          <span className="font-semibold text-lg">{menu.name}</span>
          <span className="text-sm text-gray-600">
            塩分: {menu.saltEquivalent_g}g
          </span>
          {/* 必要に応じて他の情報も表示可能 */}
        </div>
      ))}
    </div>
  );
};

export default MenuResultList;
