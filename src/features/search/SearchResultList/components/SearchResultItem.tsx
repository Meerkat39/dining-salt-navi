import type { Store } from "@/types/store";
import React from "react";

/**
 * SearchResultItem（検索結果リストの1項目表示コンポーネント）
 * - 店舗名・住所をシンプルに表示
 * - isSelected=trueの場合はハイライト（青背景）
 *
 * @param {Store} store 店舗情報（Store型）
 * @param {boolean} [isSelected] 選択状態（地図ピン連携・ハイライト用、任意）
 */
type SearchResultItemProps = {
  store: Store;
  isSelected?: boolean;
};

const SearchResultItem: React.FC<SearchResultItemProps> = ({
  store,
  isSelected,
}) => {
  // 選択状態で背景色を変更
  return (
    <div
      className={`flex flex-col gap-1 p-4 cursor-pointer ${
        // isSelected=trueなら地図ピン連携でハイライト（青背景）、falseなら通常のホバー色
        isSelected ? "bg-blue-100" : "hover:bg-gray-50"
      }`}
    >
      {/* 店舗名 */}
      <div className="font-bold text-base">{store.name}</div>
      {/* 店舗の緯度・経度 */}
      <div className="text-sm text-gray-600">
        緯度: {store.lat}, 経度: {store.lng}
      </div>
    </div>
  );
};

export default SearchResultItem;
