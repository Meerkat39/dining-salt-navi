import { fetchGeocode } from "@/features/search/MapView/api/geocoding";
import { useCallback } from "react";

/**
 * エリア名から座標取得＆地図中心更新用フック
 * - areaNameを指定してGeocoding APIで座標取得
 * - setCenterで地図中心座標を更新
 * - エラー時はalert表示
 * @returns 検索ハンドラ関数
 */
export function useAreaGeocodeSearch(
  areaName: string,
  useCurrentLocation: boolean,
  setCenter: (center: { lat: number; lng: number }) => void
) {
  const handleAreaSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!areaName || useCurrentLocation) return;
      try {
        const coords = await fetchGeocode(areaName);
        setCenter(coords);
      } catch (err: unknown) {
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
