import type { Store } from "@/types/store";

/**
 * 選択店舗IDに応じて地図の中心座標・ズーム値を返すユーティリティ関数
 *
 * - 店舗リスト・選択店舗ID・デフォルト座標/ズームを受け取り、
 *   選択店舗があればその座標・ズーム（16）を返す。
 *   なければデフォルト座標・ズームを返す。
 *
 * @param stores 店舗リスト（Store型配列）
 * @param selectedStoreId 選択中の店舗ID（string|null）
 * @param defaultCenter デフォルト中心座標（未選択時に使う）
 * @param defaultZoom デフォルトズーム値（未選択時に使う、初期値13）
 * @returns { center, zoom } - 地図中心座標・ズーム値オブジェクト
 *   - center: { lat, lng }（選択店舗 or デフォルト）
 *   - zoom: number（選択店舗時は16、未選択時はdefaultZoom）
 */
export function getMapCenterAndZoom(
  stores: Store[],
  selectedStoreId?: string | null,
  defaultCenter?: { lat: number; lng: number },
  defaultZoom: number = 13
) {
  // 選択店舗IDが指定されている場合
  if (selectedStoreId) {
    // 店舗リストから該当IDの店舗を検索
    const selectedStore = stores.find((s) => s.id === selectedStoreId);
    if (selectedStore) {
      // 選択店舗が見つかった場合は、その座標・ズーム16で返す
      return {
        center: { lat: selectedStore.lat, lng: selectedStore.lng },
        zoom: 16,
      };
    }
  }
  // 選択店舗がない場合はデフォルト座標・ズームで返す
  return {
    center: defaultCenter,
    zoom: defaultZoom,
  };
}
