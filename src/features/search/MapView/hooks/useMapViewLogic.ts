import type { Store } from "@/types/store";
import { useCallback, useEffect, useRef, useState } from "react";
import { getMapCenterAndZoom } from "../utils/getMapCenterAndZoom";

/**
 * 地図の中心座標・ズーム・GoogleMapインスタンス管理などのロジックを提供するカスタムフック
 *
 * @param {Store[]} filteredStores - 絞り込まれた店舗リスト（塩分量・エリアでフィルタ済み）
 * @param {string | null} [selectedStoreId] - 選択中の店舗ID（InfoWindow表示・地図ズーム用）
 * @returns {Object} - 地図表示に必要な状態・操作関数をまとめたオブジェクト
 *   - center: 現在の地図中心座標 { lat, lng }
 *   - zoom: 現在のズームレベル
 *   - setCenter: centerの更新関数
 *   - setZoom: zoomの更新関数
 *   - mapRef: GoogleMapインスタンス参照用ref
 *   - handleCenterChanged: onCenterChanged用コールバック
 */
export function useMapViewLogic(
  filteredStores: Store[],
  selectedStoreId?: string | null,
  externalCenter?: { lat: number; lng: number } | undefined
) {
  // 初期center/zoomは「東京駅」または選択店舗
  const initial = getMapCenterAndZoom(filteredStores, selectedStoreId);
  const [center, setCenter] = useState(initial.center);
  const [zoom, setZoom] = useState(initial.zoom);
  // 初回レンダリング判定用
  const isFirstRender = useRef(true);
  // GoogleMapインスタンス参照
  const mapRef = useRef<google.maps.Map | null>(null);

  // 店舗選択時・外部center変更時にcenter/zoomを更新
  useEffect(() => {
    if (externalCenter) {
      setCenter(externalCenter);
      setZoom(14); // どんなときでもzoom=14に強制
      return;
    }
    const { center: newCenter, zoom: newZoom } = getMapCenterAndZoom(
      filteredStores,
      selectedStoreId
    );
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setCenter(newCenter);
      setZoom(newZoom);
      return;
    }
    // 店舗選択時のみcenter/zoomを更新
    if (selectedStoreId && newCenter && newZoom) {
      setCenter(newCenter);
      setZoom(newZoom);
    }
  }, [filteredStores, selectedStoreId, externalCenter]);

  // onCenterChangedは無限ループ防止のため何もしない
  const handleCenterChanged = useCallback(() => {}, []);

  return {
    center,
    zoom,
    setCenter,
    setZoom,
    mapRef,
    handleCenterChanged,
  };
}
