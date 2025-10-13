import type { Menu } from "@/types/menu";
import React from "react";
import { filterMainMenus } from "../utils/filterMainMenus";
import MenuListItem from "./MenuListItem";

/**
 * メニュー検索結果リストのprops定義
 * @param {Menu[]} menus メニューリスト配列
 * @param {number=} saltLimit 塩分量フィルタ（g単位、任意）
 * @param {string|null=} selectedStoreId 選択中の店舗ID（未選択時はnull）
 * @param {boolean=} loading メニュー取得中フラグ（trueならローディング表示）
 * @param {string|null=} error メニュー取得エラー内容（エラー時はエラー表示）
 */
export type MenuResultListProps = {
  menus: Menu[];
  saltLimit?: number;
  selectedStoreId?: string | null;
  loading?: boolean;
  error?: string | null;
};

const MenuResultList: React.FC<MenuResultListProps> = ({
  menus,
  saltLimit,
  selectedStoreId,
  loading = false,
  error = null,
}) => {
  // メニューリスト表示領域の参照（スクロール制御用）
  const containerRef = React.useRef<HTMLDivElement>(null);

  // 店舗IDやメニューリストが変わったときにスクロール位置を一番上に
  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [menus]);

  // 店舗未選択時は案内文のみ表示
  if (!selectedStoreId) {
    return (
      <div className="w-full bg-white rounded shadow p-4 text-gray-500 text-center">
        地図の店舗を選ぶと右にメニューが表示されます。
      </div>
    );
  }

  // メニュー取得中
  if (loading) {
    return (
      <div className="w-full bg-white rounded shadow p-4 text-gray-500 text-center">
        メニューを読み込み中です…
      </div>
    );
  }

  // メニュー取得エラー
  if (error) {
    return (
      <div className="w-full bg-white rounded shadow p-4 text-red-500 text-center">
        メニュー情報の取得に失敗しました
        <br />
        {error}
      </div>
    );
  }

  // メインメニュー＋塩分量フィルタで絞り込み
  const filteredMenus = filterMainMenus(menus, saltLimit);

  // 条件に合うメニューがない場合の表示（ローディング・エラー以外）
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
