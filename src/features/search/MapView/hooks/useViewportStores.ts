import type { Store } from "@/types/store";
import { useCallback, useEffect, useState } from "react";

/**
 * GoogleMapのビューポート内のみ店舗マーカーを描画するためのカスタムフック
 * @param {Store[]} filteredStores - 絞り込まれた店舗リスト
 * @param {React.RefObject<google.maps.Map|null>} mapRef - GoogleMapインスタンスのref
 * @param {number} mapZoom - 現在のズームレベル
 * @param {{ lat: number; lng: number }} effectiveCenter - 現在の地図中心座標
 * @returns {Store[]} viewportStores - ビューポート内の店舗リスト
 * @returns {() => void} updateViewportStores - ビューポート内店舗リスト更新関数
 */
export function useViewportStores(
  filteredStores: Store[],
  mapRef: React.RefObject<google.maps.Map | null>,
  mapZoom: number,
  effectiveCenter: { lat: number; lng: number }
) {
  // viewportStores: 現在の地図ビューポート内に存在する店舗リスト
  const [viewportStores, setViewportStores] = useState<Store[]>(filteredStores);

  /**
   * updateViewportStores:
   * GoogleMapの現在の表示範囲（bounds）内に存在する店舗のみ抽出し、viewportStoresにセットする
   * - map未ロード時やbounds取得不可時は全店舗をセット
   */
  const updateViewportStores = useCallback(() => {
    const map = mapRef.current;
    if (!map) {
      // 地図未ロード時は全店舗表示
      setViewportStores(filteredStores);
      return;
    }
    const bounds = map.getBounds();
    if (!bounds) {
      // bounds取得不可時も全店舗表示
      setViewportStores(filteredStores);
      return;
    }
    // bounds内の店舗のみ抽出
    const storesInBounds = filteredStores.filter((store) =>
      bounds.contains(new window.google.maps.LatLng(store.lat, store.lng))
    );
    setViewportStores(storesInBounds);
  }, [filteredStores, mapRef]);

  /**
   * filteredStores/mapRef/mapZoom/centerが変化したタイミングでviewportStoresを更新
   */
  useEffect(() => {
    updateViewportStores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredStores, mapRef.current, mapZoom, effectiveCenter]);

  /**
   * 返り値:
   * - viewportStores: 現在の地図ビューポート内の店舗リスト
   * - updateViewportStores: ビューポート内店舗リストの手動更新関数
   */
  return { viewportStores, updateViewportStores };
}
