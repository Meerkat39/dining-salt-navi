import type { Store } from "@/types/store";
import { useCallback, useEffect, useRef, useState } from "react";
import { getMapCenterAndZoom } from "../utils/getMapCenterAndZoom";

/**
 * 地図の中心座標・ズーム・GoogleMapインスタンス・選択店舗の状態管理をまとめて行うカスタムフック
 * - 店舗リスト・選択店舗・外部centerから地図の中心座標・ズームを決定
 * - GoogleMapインスタンス参照・onCenterChangedコールバックも提供
 * @param {Store[]} filteredStores - 絞り込み済み店舗リスト（塩分量・エリアでフィルタ済み）
 * @param {string | null} [selectedStoreId] - 選択中の店舗ID（InfoWindow表示・地図ズーム用）
 * @param {{ lat: number; lng: number } | undefined} [externalCenter] - 外部から指定された地図中心座標（優先適用）
 * @returns {{
 *   center: { lat: number; lng: number }, // 現在の地図中心座標
 *   zoom: number, // 現在のズームレベル
 *   setCenter: (center: { lat: number; lng: number }) => void, // centerの更新関数
 *   setZoom: (zoom: number) => void, // zoomの更新関数
 *   mapRef: React.RefObject<google.maps.Map | null>, // GoogleMapインスタンス参照用ref
 *   handleCenterChanged: () => void // onCenterChanged用コールバック
 * }} 地図表示に必要な状態・操作関数まとめ
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
    // 店舗リスト・選択店舗からcenter/zoomを算出
    const { center: newCenter, zoom: newZoom } = getMapCenterAndZoom(
      filteredStores,
      selectedStoreId
    );
    // 初回レンダリング時は初期値でcenter/zoomをセット
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
