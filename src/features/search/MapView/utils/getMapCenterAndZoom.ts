import type { Store } from "@/types/store";

/**
 * 店舗リスト・選択店舗IDから地図の中心座標・ズーム値を決定するユーティリティ関数
 * - 選択店舗があればその座標・ズーム（16）を返す
 * - なければデフォルト座標（東京駅）・ズーム（11）を返す
 * @param {Store[]} stores - 店舗リスト（Store型配列）
 * @param {string|null} [selectedStoreId] - 選択中の店舗ID（string|null）
 * @returns {{ center: { lat: number; lng: number }, zoom: number }} 地図中心座標・ズーム値オブジェクト
 *   center: { lat, lng }（選択店舗 or デフォルト）
 *   zoom: number（選択店舗時は16、未選択時は11）
 */
export function getMapCenterAndZoom(
  stores: Store[],
  selectedStoreId?: string | null
) {
  // 選択店舗IDが指定されている場合
  if (selectedStoreId) {
    // 店舗リストから選択店舗を検索
    const selectedStore = stores.find((s) => s.id === selectedStoreId);
    if (selectedStore) {
      // 選択店舗の座標・ズームを返す
      return {
        center: { lat: selectedStore.lat, lng: selectedStore.lng },
        zoom: 16,
      };
    }
  }
  // デフォルトcenter/zoom（東京駅）
  return {
    center: { lat: 35.681236, lng: 139.767125 },
    zoom: 11,
  };
}
