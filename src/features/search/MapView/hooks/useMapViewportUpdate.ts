import { MutableRefObject } from "react";

/**
 * 地図のズーム・中心変更時にビューポート店舗リストを更新するロジックを分離
 * @param mapRef GoogleMapインスタンス参照
 * @param mapZoom 現在のズーム倍率
 * @param setZoom ズーム倍率の更新関数
 * @param updateViewportStores ビューポート店舗リストの更新関数
 * @param handleCenterChanged 地図中心変更時の処理
 * @returns { handleZoomChanged, handleCenterChangedWithViewport }
 */
export function useMapViewportUpdate(
  mapRef: MutableRefObject<google.maps.Map | null>,
  mapZoom: number,
  setZoom?: (zoom: number) => void,
  updateViewportStores?: () => void,
  handleCenterChanged?: () => void
) {
  // ズーム変更時のロジック
  const handleZoomChanged = () => {
    if (mapRef.current) {
      const newZoom = mapRef.current.getZoom();
      if (typeof newZoom === "number" && newZoom !== mapZoom) {
        if (typeof setZoom === "function") setZoom(newZoom);
      }
      if (typeof updateViewportStores === "function") updateViewportStores();
    }
  };
  // 中心変更時のロジック
  const handleCenterChangedWithViewport = () => {
    if (typeof handleCenterChanged === "function") handleCenterChanged();
    if (typeof updateViewportStores === "function") updateViewportStores();
  };
  return { handleZoomChanged, handleCenterChangedWithViewport };
}
