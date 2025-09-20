import type { Store } from "@/types/store";
import React from "react";

/**
 * SearchResultItem（検索結果リストの1項目）
 * - 店舗名・住所のみ表示（シンプル版）
 * @param store 店舗情報
 */
type SearchResultItemProps = {
  store: Store;
};

const SearchResultItem: React.FC<SearchResultItemProps> = ({ store }) => {
  // 店舗名・座標を表示するUI
  return (
    <div className="flex flex-col gap-1 p-4 hover:bg-gray-50 cursor-pointer">
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
