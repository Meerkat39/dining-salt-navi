"use client";

import type { Store } from "@/types/store";
import { GoogleMap } from "@react-google-maps/api";
import React from "react";
import { useGoogleMapsLoader } from "../api/googleMaps";
import { useGridSampleStores } from "../hooks/useGridSampleStores";
import { useMapViewLogic } from "../hooks/useMapViewLogic";
import { useViewportStores } from "../hooks/useViewportStores";
import {
  containerStyle,
  MapLoadError,
  MapLoading,
} from "../utils/MapViewUtils";
import LoadingOverlay from "./LoadingOverlay";
import { StoreMarkerWithInfoWindow } from "./StoreMarkerWithInfoWindow";

/**
 * 店舗・メニュー地図表示コンポーネント
 *
 * @param {Store[]} filteredStores - 絞り込まれた店舗リスト（塩分量・エリアでフィルタ済み）
 * @param {string|null} [selectedStoreId] - 選択中の店舗ID（InfoWindow表示・地図ズーム用）
 * @param {React.Dispatch<React.SetStateAction<string|null>>} [setSelectedStoreId] - 選択店舗IDの更新関数（ピン/リスト連携用）
 * @param {number} saltValue - 塩分量フィルタ値（g単位、スライダー連動）
 * @param {{ lat: number; lng: number }} [center] - 地図の初期中心座標（任意）
 * @param {boolean} [loading] - ローディング状態（任意）
 *
 * 地図上に店舗マーカー（バーチャライズ＋グリッドサンプリング）とInfoWindowを表示。
 * 店舗選択時はcenter/zoomが切り替わり、filteredStoresは塩分量・エリアで動的に変化する。
 */
// 型定義はコンポーネント宣言の直前に配置

type MapViewProps = {
  filteredStores: Store[];
  selectedStoreId?: string | null;
  setSelectedStoreId?: React.Dispatch<React.SetStateAction<string | null>>;
  // saltValue: number; // 未使用のため削除
  center?: { lat: number; lng: number } | undefined;
  loading?: boolean;
};
const MapView: React.FC<MapViewProps> = ({
  filteredStores,
  selectedStoreId,
  setSelectedStoreId,
  center,
  // saltValue, // 未使用のため削除
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

  // useViewportStoresフックでビューポート内店舗リストを管理
  const { viewportStores, updateViewportStores } = useViewportStores(
    filteredStores,
    mapRef,
    mapZoom,
    effectiveCenter
  );
  // ズーム・中心変更時にビューポート店舗リストも更新
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

  // useGridSampleStoresフックでグリッドサンプリング適用
  const sampledStores = useGridSampleStores(viewportStores, mapZoom);

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
  return (
    <div className="relative w-full h-full rounded overflow-hidden">
      {/* ローディングオーバーレイ */}
      {loading && <LoadingOverlay />}
      {/* GoogleMap本体 */}
      <GoogleMap
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
        {/* 店舗ごとにマーカー＋InfoWindowを描画（バーチャライズ＋グリッドサンプリング） */}
        {sampledStores.map((store) => (
          <StoreMarkerWithInfoWindow
            key={store.id}
            store={store}
            selectedStoreId={selectedStoreId || null}
            setSelectedStoreId={setSelectedStoreId!}
          />
        ))}
      </GoogleMap>
    </div>
  );
};
export default MapView;
