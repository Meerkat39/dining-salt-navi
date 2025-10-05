import { fetchGeocode } from "@/features/search/MapView/api/geocoding";
import { useCallback } from "react";

/**
 * 検索ボタンの連打防止・ローディング管理付きカスタムフック
 * - 検索中はボタン無効化
 * - エリア名から座標取得しsetCenterで地図中心更新
 * - エラー時はalert表示
 * @param {string} areaName - エリア名
 * @param {boolean} useCurrentLocation - 現在地検索ON/OFF
 * @param {(center: { lat: number; lng: number }) => void} setCenter - 地図中心座標更新関数
 */
export function useSearchWithLoading({
  areaName,
  useCurrentLocation,
  setCenter,
  setZoom,
  isSearching,
  setIsSearching,
}: {
  areaName: string;
  useCurrentLocation: boolean;
  setCenter: (center: { lat: number; lng: number }) => void;
  setZoom: (zoom: number) => void;
  isSearching: boolean;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!areaName || useCurrentLocation || isSearching) return;
      setIsSearching(true);
      try {
        const coords = await fetchGeocode(areaName);
        if (coords) {
          setCenter(coords);
          setZoom(14);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          window.alert(err.message);
        } else {
          window.alert("エリアの座標取得に失敗しました");
        }
      } finally {
        setIsSearching(false);
      }
    },
    [
      areaName,
      useCurrentLocation,
      setCenter,
      setZoom,
      isSearching,
      setIsSearching,
    ]
  );

  return { handleSearch };
}
