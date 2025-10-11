import { fetchGeocode } from "@/features/search/MapView/api/geocoding";
import { useCallback } from "react";

/**
 * 検索ボタン押下時の一連の検索処理を管理するカスタムフック
 * - 検索中ローディング状態の管理（連打防止・ボタン無効化）
 * - エリア名から座標取得し地図中心・ズームを更新
 * - API失敗時はalertでエラー表示
 * - 副作用（setCenter, setZoom, setIsSearching）をまとめて制御
 * @param {Object} params - 検索処理に必要なパラメータ群
 * @param {string} params.areaName - エリア名（地名・住所・駅名など）
 * @param {boolean} params.useCurrentLocation - 現在地検索ON/OFF
 * @param {(center: { lat: number; lng: number }) => void} params.setCenter - 地図中心座標の更新関数
 * @param {(zoom: number) => void} params.setZoom - 地図ズーム倍率の更新関数
 * @param {boolean} params.isSearching - 検索中状態（ローディング制御）
 * @param {React.Dispatch<React.SetStateAction<boolean>>} params.setIsSearching - 検索中状態の更新関数
 * @returns {{ handleSearch: (e: React.FormEvent) => Promise<void> }} 検索処理を実行する関数を返す
 */
type SearchWithLoadingProps = {
  areaName: string;
  useCurrentLocation: boolean;
  setCenter: (center: { lat: number; lng: number }) => void;
  setZoom: (zoom: number) => void;
  isSearching: boolean;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useSearchWithLoading({
  areaName,
  useCurrentLocation,
  setCenter,
  setZoom,
  isSearching,
  setIsSearching,
}: SearchWithLoadingProps) {
  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      // フォーム送信のデフォルト動作を無効化
      e.preventDefault();
      // 入力・状態チェック
      if (!areaName || useCurrentLocation || isSearching) return;
      // ローディング開始
      setIsSearching(true);
      try {
        // エリア名から座標取得
        const coords = await fetchGeocode(areaName);
        if (coords) {
          // 地図中心座標を更新
          setCenter(coords);
          // 地図ズームを更新
          setZoom(14);
        }
      } catch (err: unknown) {
        // エラー時はアラート表示
        if (err instanceof Error) {
          window.alert(err.message);
        } else {
          window.alert("エリアの座標取得に失敗しました");
        }
      } finally {
        // ローディング終了
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
