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
  return (
    <div className="flex flex-col gap-1 p-4 hover:bg-gray-50 cursor-pointer">
      <div className="font-bold text-base">{store.name}</div>
      <div className="text-sm text-gray-600">{store.address}</div>
    </div>
  );
};

export default SearchResultItem;
