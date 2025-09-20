import type { Store } from "@/types/store";
import React from "react";
import NoSearchResult from "./NoSearchResult";
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
    return <NoSearchResult />;
  }

  // 検索結果リスト本体（店舗ごとにSearchResultItemを表示）
  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded shadow divide-y">
      {stores.map((store) => (
        <SearchResultItem key={store.id} store={store} />
      ))}
    </div>
  );
};

export default SearchResultList;
