import type { Menu } from "@/types/menu";
import React from "react";

/**
 * メニュー1件の表示コンポーネント
 * @param {Menu} menu メニュー情報
 */
const MenuListItem: React.FC<{ menu: Menu }> = ({ menu }) => (
  <div className="p-4 flex flex-col gap-1">
    {/* メニュー名表示 */}
    <span className="font-semibold text-lg">{menu.name}</span>
    {/* 塩分量表示 */}
    <span className="text-sm text-gray-600">
      塩分: {menu.saltEquivalent_g}g
    </span>
  </div>
);

export default MenuListItem;
