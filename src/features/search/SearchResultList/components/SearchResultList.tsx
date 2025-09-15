import type { Store } from "@/types/store";
import React from "react";
import SearchResultItem from "./SearchResultItem";

/**
 * SearchResultList（検索結果リスト本体）
 * - 店舗リスト（stores）を受け取り、各店舗をSearchResultItemで表示
 * - 検索結果が0件の場合はメッセージ表示
 * @param stores 店舗リスト配列
 */
type SearchResultListProps = {
  stores: Store[];
};

const SearchResultList: React.FC<SearchResultListProps> = ({ stores }) => {
  if (stores.length === 0) {
    return (
      <div className="w-full max-w-xl mx-auto p-4 text-center text-gray-500 border rounded bg-white shadow">
        検索結果がありません
      </div>
    );
  }
  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded shadow divide-y">
      {stores.map((store) => (
        <SearchResultItem key={store.id} store={store} />
      ))}
    </div>
  );
};

export default SearchResultList;
