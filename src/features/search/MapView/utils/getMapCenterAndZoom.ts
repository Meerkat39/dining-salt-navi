import type { Store } from "@/types/store";

/**
 * 選択店舗IDに応じて地図の中心座標・ズーム値を返すユーティリティ関数
 *
 * - 店舗リスト・選択店舗ID・デフォルト座標/ズームを受け取り、
 *   選択店舗があればその座標・ズーム（16）を返す。
 *   なければデフォルト座標・ズームを返す。
 *
 * @param {Store[]} stores 店舗リスト（Store型配列）
 * @param {string|null} [selectedStoreId] 選択中の店舗ID（string|null）
 * @param {{ lat: number; lng: number }} [defaultCenter] デフォルト中心座標（未選択時に使う）
 * @param {number} [defaultZoom=13] デフォルトズーム値（未選択時に使う、初期値13）
 * @returns {{ center: { lat: number; lng: number }, zoom: number }} 地図中心座標・ズーム値オブジェクト
 *   - center: { lat, lng }（選択店舗 or デフォルト）
 *   - zoom: number（選択店舗時は16、未選択時はdefaultZoom）
 */
export function getMapCenterAndZoom(
  stores: Store[],
  selectedStoreId?: string | null
) {
  // 選択店舗IDが指定されている場合
  if (selectedStoreId) {
    const selectedStore = stores.find((s) => s.id === selectedStoreId);
    if (selectedStore) {
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
