/**
 * 現在地検索時に店舗選択を解除し、地図中心座標を更新するユーティリティ関数
 * @param setSelectedStoreId - 選択店舗IDの更新関数
 * @param handleCurrentLocationChange - 現在地座標変更時のコールバック
 * @param lat - 新しい緯度
 * @param lng - 新しい経度
 */
export function handleCurrentLocationChangeWithDeselect(
  setSelectedStoreId: (id: string | null) => void,
  handleCurrentLocationChange: (lat: number, lng: number) => void,
  lat: number,
  lng: number
) {
  setSelectedStoreId(null);
  handleCurrentLocationChange(lat, lng);
}
