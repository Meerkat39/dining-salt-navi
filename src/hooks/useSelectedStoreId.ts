import { useState } from "react";

/**
 * useSelectedStoreId
 * 検索結果リスト・地図連携用：選択店舗IDの状態管理フック
 * - 選択店舗IDの状態と更新関数を提供
 * - リスト項目クリック時のハンドラも返却
 * @returns { selectedStoreId, setSelectedStoreId, handleStoreItemClick }
 */
export function useSelectedStoreId() {
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

  // 検索結果リスト項目クリック時のハンドラ
  const handleStoreItemClick = (storeId: string) => {
    setSelectedStoreId(storeId);
  };

  return {
    selectedStoreId,
    setSelectedStoreId,
    handleStoreItemClick,
  };
}
