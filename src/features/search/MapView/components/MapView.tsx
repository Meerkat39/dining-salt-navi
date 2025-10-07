"use client";

import type { Store } from "@/types/store";
import { GoogleMap } from "@react-google-maps/api";
import React from "react";
import { useGoogleMapsLoader } from "../api/googleMaps";
import { useMapViewLogic } from "../hooks/useMapViewLogic";
import {
  containerStyle,
  MapLoadError,
  MapLoading,
} from "../utils/MapViewUtils";
import { StoreMarkerWithInfoWindow } from "./StoreMarkerWithInfoWindow";

/**
 * 店舗・メニュー地図表示コンポーネント
 *
 * @param {Object} props - プロパティ
 * @param {Store[]} props.filteredStores - 絞り込まれた店舗リスト（塩分量・エリアでフィルタ済み）
 * @param {string=} props.selectedStoreId - 選択中の店舗ID（InfoWindow表示・地図ズーム用）
 * @param {function=} props.setSelectedStoreId - 選択店舗IDの更新関数（ピン/リスト連携用）
 * @param {number} props.saltValue - 塩分量フィルタ値（g単位、スライダー連動）
 *
 * 地図上に店舗マーカーとInfoWindowを表示し、店舗選択時はcenter/zoomが切り替わる。
 * filteredStoresは塩分量・エリアで動的に変化する。
 */
// 型定義はコンポーネント宣言の直前に配置

type MapViewProps = {
  filteredStores: Store[];
  selectedStoreId?: string | null;
  setSelectedStoreId?: React.Dispatch<React.SetStateAction<string | null>>;
  saltValue: number;
  center?: { lat: number; lng: number } | undefined;
  loading?: boolean;
};
const MapView: React.FC<MapViewProps> = ({
  filteredStores,
  selectedStoreId,
  setSelectedStoreId,
  center,
  saltValue,
  loading = false,
}) => {
  const { isLoaded, loadError } = useGoogleMapsLoader();
  const {
    center: mapCenter,
    zoom: mapZoom,
    mapRef,
    handleCenterChanged,
    setZoom,
  } = useMapViewLogic(filteredStores, selectedStoreId, center);

  // center/zoomがundefinedの場合はGoogleMapを描画しない
  const effectiveCenter = center ?? mapCenter;

  // バーチャライズ: ビューポート内のみマーカー描画
  const [viewportStores, setViewportStores] =
    React.useState<Store[]>(filteredStores);
  const updateViewportStores = React.useCallback(() => {
    const map = mapRef.current;
    if (!map) {
      setViewportStores(filteredStores);
      return;
    }
    const bounds = map.getBounds();
    if (!bounds) {
      setViewportStores(filteredStores);
      return;
    }
    const storesInBounds = filteredStores.filter((store) =>
      bounds.contains(new window.google.maps.LatLng(store.lat, store.lng))
    );
    setViewportStores(storesInBounds);
  }, [filteredStores, mapRef]);
  React.useEffect(() => {
    updateViewportStores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredStores, mapRef.current, mapZoom, effectiveCenter]);
  const handleZoomChanged = () => {
    if (mapRef.current) {
      const newZoom = mapRef.current.getZoom();
      if (typeof newZoom === "number" && newZoom !== mapZoom) {
        if (typeof setZoom === "function") setZoom(newZoom);
      }
      updateViewportStores();
    }
  };
  const handleCenterChangedWithViewport = () => {
    handleCenterChanged();
    updateViewportStores();
  };

  // グリッドサンプリング: ズームレベルに応じてグリッドサイズを決定
  const getGridSize = (zoom: number): number => {
    // 例: ズーム値ごとに段階的に分割幅を調整
    if (zoom >= 18) return 0.0005; // 超拡大（駅周辺・建物単位）
    if (zoom >= 16) return 0.001; // 都市部（区・町単位）
    if (zoom >= 14) return 0.003; // 市区町村
    if (zoom >= 12) return 0.008; // 都道府県
    if (zoom >= 10) return 0.02; // 広域（関東・近畿など）
    return 0.05; // 全国（代表店舗のみ）
  };

  // グリッドサンプリング適用関数
  const gridSampleStores = (stores: Store[], zoom: number): Store[] => {
    const gridSize = getGridSize(zoom);
    const gridMap = new Map<string, Store>();
    stores.forEach((store) => {
      const latKey = Math.floor(store.lat / gridSize);
      const lngKey = Math.floor(store.lng / gridSize);
      const gridKey = `${latKey}_${lngKey}`;
      if (!gridMap.has(gridKey)) {
        gridMap.set(gridKey, store);
      }
    });
    return Array.from(gridMap.values());
  };

  // center/zoomが未定義なら地図情報なしを表示（Hooksより後に配置）
  if (!effectiveCenter || typeof mapZoom !== "number") {
    return (
      <div className="relative w-full h-full rounded bg-gray-200 flex items-center justify-center">
        地図情報がありません
      </div>
    );
  }

  if (loadError) return <MapLoadError />;
  if (!isLoaded) return <MapLoading />;

  // 地図本体と店舗マーカーを描画（バーチャライズ＋グリッドサンプリング適用）
  const sampledStores = gridSampleStores(viewportStores, mapZoom);
  return (
    <div className="relative w-full h-full rounded overflow-hidden">
      {/* ローディングオーバーレイ */}
      {loading && (
        <div className="absolute inset-0 z-20 bg-black/50 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-2">
            <svg
              className="animate-spin h-8 w-8 text-blue-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            <span className="text-white text-lg font-semibold drop-shadow">
              位置情報・エリア取得中...
            </span>
          </div>
        </div>
      )}
      {/* GoogleMap本体 */}
      <GoogleMap
        key={`${effectiveCenter.lat}-${effectiveCenter.lng}-${mapZoom}`}
        mapContainerStyle={containerStyle}
        center={effectiveCenter}
        zoom={mapZoom}
        onLoad={(map) => {
          mapRef.current = map as unknown as google.maps.Map;
          updateViewportStores();
        }}
        onUnmount={() => {
          mapRef.current = null;
        }}
        onCenterChanged={handleCenterChangedWithViewport}
        onZoomChanged={handleZoomChanged}
      >
        {/* 店舗ごとにマーカー＋InfoWindowを描画（バーチャライズ＋グリッドサンプリング済み） */}
        {sampledStores.map((store) => (
          <StoreMarkerWithInfoWindow
            key={store.id}
            store={store}
            selectedStoreId={selectedStoreId || null}
            setSelectedStoreId={setSelectedStoreId!}
            saltValue={saltValue}
          />
        ))}
      </GoogleMap>
    </div>
  );
};
export default MapView;
