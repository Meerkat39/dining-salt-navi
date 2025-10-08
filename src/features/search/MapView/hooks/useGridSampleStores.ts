import type { Store } from "@/types/store";

/**
 * グリッドサンプリングで店舗リストを間引くカスタムフック
 * @param {Store[]} stores - ビューポート内の店舗リスト
 * @param {number} zoom - GoogleMapのズームレベル
 * @returns {Store[]} sampledStores - グリッドサンプリング後の店舗リスト
 */
export function useGridSampleStores(stores: Store[], zoom: number): Store[] {
  // ズームレベルに応じてグリッドサイズを決定
  const getGridSize = (zoom: number): number => {
    if (zoom >= 18) return 0.0005; // 超拡大（駅周辺・建物単位）
    if (zoom >= 16) return 0.001; // 都市部（区・町単位）
    if (zoom >= 14) return 0.003; // 市区町村
    if (zoom >= 12) return 0.008; // 都道府県
    if (zoom >= 10) return 0.02; // 広域（関東・近畿など）
    return 0.05; // 全国（代表店舗のみ）
  };

  const gridSize = getGridSize(zoom);
  const gridMap = new Map<string, Store>();
  // 各グリッド（区画）につき1店舗だけ残す（代表店舗のみ表示）
  stores.forEach((store) => {
    const latKey = Math.floor(store.lat / gridSize); // 緯度をグリッド単位で丸める
    const lngKey = Math.floor(store.lng / gridSize); // 経度をグリッド単位で丸める
    const gridKey = `${latKey}_${lngKey}`; // グリッド区画のキー
    if (!gridMap.has(gridKey)) {
      gridMap.set(gridKey, store); // その区画で最初の店舗だけ残す
    }
  });
  // グリッドサンプリング後の店舗リストを返す
  return Array.from(gridMap.values());
}
