import type { Store } from "@/types/store";
import React from "react";
import NoSearchResult from "./NoSearchResult";
import SearchResultItem from "./SearchResultItem";

/**
 * SearchResultList（検索結果リスト本体コンポーネント）
 * - 店舗リスト（stores）を受け取り、各店舗をSearchResultItemで表示
 * - 検索結果が0件の場合はNoSearchResultでメッセージ表示
 * - 項目クリック時にonStoreItemClickコールバックで選択IDを親へ通知
 * - selectedStoreIdで選択項目をハイライト（地図ピン連携）
 *
 * @param {Store[]} stores 店舗リスト配列（Store型）
 * @param {(storeId: string) => void} [onStoreItemClick] 項目クリック時のコールバック（選択ID通知用、任意）
 * @param {string|null} [selectedStoreId] 選択中の店舗ID（ハイライト・地図連携用、任意）
 */
type SearchResultListProps = {
  stores: Store[];
  onStoreItemClick?: (storeId: string) => void;
  selectedStoreId?: string | null;
};

const SearchResultList: React.FC<SearchResultListProps> = ({
  stores,
  onStoreItemClick,
  selectedStoreId,
}) => {
  if (stores.length === 0) {
    return <NoSearchResult />;
  }

  // 検索結果リスト本体（店舗ごとにSearchResultItemを表示）
  return (
    <div className="w-full bg-white rounded shadow divide-y">
      {stores.map((store) => (
        <div
          key={store.id}
          onClick={() => onStoreItemClick && onStoreItemClick(store.id)}
        >
          <SearchResultItem
            store={store}
            isSelected={selectedStoreId === store.id}
          />
        </div>
      ))}
    </div>
  );
};

export default SearchResultList;
