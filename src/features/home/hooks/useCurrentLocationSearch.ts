import { useCallback, useState } from "react";

/**
 * 現在地取得・管理用カスタムフック
 * @returns {{
 *   useCurrentLocation: boolean,
 *   setUseCurrentLocation: (checked: boolean) => void,
 *   center: { lat: number; lng: number } | undefined,
 *   handleCurrentLocationChange: (lat: number, lng: number) => void
 * }}
 */
export function useCurrentLocationSearch() {
  // 現在地取得ON/OFF状態
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  // 現在地（中心座標）情報
  const [center, setCenter] = useState<
    { lat: number; lng: number } | undefined
  >(undefined);
  // zoom倍率（検索・現在地取得時は14で強制）
  const [zoom, setZoom] = useState<number>(14);

  /**
   * 現在地取得時のコールバック
   * - centerに座標をセット
   * - useCurrentLocationをOFFに（トグル解除）
   * - 0.5秒後にcenterをクリア（地図の一時的な中心移動用）
   */
  const handleCurrentLocationChange = useCallback(
    (lat: number, lng: number) => {
      // 取得した座標をcenterにセット
      setCenter({ lat, lng });
      setZoom(14);
      // 現在地トグルをOFFに（1回限りの動作）
      setUseCurrentLocation(false);
      // 0.5秒後にcenterをクリア（地図の一時的な中心移動用）
      setTimeout(() => setCenter(undefined), 500);
    },
    []
  );

  return {
    useCurrentLocation,
    setUseCurrentLocation,
    center,
    zoom,
    handleCurrentLocationChange,
    setCenter,
    setZoom,
  };
}
