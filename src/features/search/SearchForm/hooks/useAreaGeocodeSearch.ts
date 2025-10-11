import { fetchGeocode } from "@/features/search/MapView/api/geocoding";
import { useCallback } from "react";

/**
 * エリア名から座標を取得し、地図中心座標を更新するためのカスタムフック
 * @param {string} areaName - エリア名（地名・住所・駅名など）
 * @param {boolean} useCurrentLocation - 現在地検索ON/OFF
 * @param {(center: { lat: number; lng: number }) => void} setCenter - 地図中心座標の更新関数
 * @returns {(e: React.FormEvent) => Promise<void>} 検索ハンドラ関数
 */
export function useAreaGeocodeSearch(
  areaName: string,
  useCurrentLocation: boolean,
  setCenter: (center: { lat: number; lng: number }) => void
) {
  const handleAreaSearch = useCallback(
    async (e: React.FormEvent) => {
      // フォーム送信のデフォルト動作を無効化
      e.preventDefault();
      // 入力値・現在地検索ON時は何もしない
      if (!areaName || useCurrentLocation) return;
      try {
        // Geocoding APIで座標取得
        const coords = await fetchGeocode(areaName);
        // 取得した座標で地図中心を更新
        setCenter(coords);
      } catch (err: unknown) {
        // エラー時はアラート表示
        if (err instanceof Error) {
          window.alert(err.message);
        } else {
          window.alert("エリアの座標取得に失敗しました");
        }
      }
    },
    [areaName, useCurrentLocation, setCenter]
  );
  return handleAreaSearch;
}
