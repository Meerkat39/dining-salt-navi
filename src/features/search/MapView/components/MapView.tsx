"use client";

import type { Store } from "@/types/store";
import { GoogleMap } from "@react-google-maps/api";
import React from "react";
import { useGoogleMapsLoader } from "../api/googleMaps";
import { useGridSampleStores } from "../hooks/useGridSampleStores";
import { useMapViewLogic } from "../hooks/useMapViewLogic";
import { useMapViewportUpdate } from "../hooks/useMapViewportUpdate";
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
 * 地図上に店舗マーカー（バーチャライズ＋グリッドサンプリング）とInfoWindowを表示。
 * 店舗選択時はcenter/zoomが切り替わり、filteredStoresは塩分量・エリアで動的に変化する。
 *
 * @param {Store[]} filteredStores - 絞り込まれた店舗リスト（塩分量・エリアでフィルタ済み）
 * @param {string|null} [selectedStoreId] - 選択中の店舗ID（InfoWindow表示・地図ズーム用）
 * @param {React.Dispatch<React.SetStateAction<string|null>>} [setSelectedStoreId] - 選択店舗IDの更新関数（ピン/リスト連携用）
 * @param {{ lat: number; lng: number }} [center] - 地図の初期中心座標（任意）
 * @param {boolean} [loading] - ローディング状態（任意）
 */
type MapViewProps = {
  filteredStores: Store[];
  selectedStoreId?: string | null;
  setSelectedStoreId?: React.Dispatch<React.SetStateAction<string | null>>;
  center?: { lat: number; lng: number } | undefined;
  loading?: boolean;
};
const MapView: React.FC<MapViewProps> = ({
  filteredStores,
  selectedStoreId,
  setSelectedStoreId,
  center,
  loading = false,
}) => {
  // Google Maps APIのロード状態・エラー情報を管理
  const {
    isLoaded, // Google Maps APIのロード完了フラグ
    loadError, // ロード失敗時のエラーオブジェクト
  } = useGoogleMapsLoader();

  // 地図の中心座標・ズーム・参照・イベントハンドラを管理
  const {
    center: mapCenter, // 地図の中心座標
    zoom: mapZoom, // 地図のズーム倍率
    mapRef, // GoogleMapインスタンス参照
    handleCenterChanged, // 地図中心変更時の処理
    setZoom, // ズーム倍率の更新関数
  } = useMapViewLogic(filteredStores, selectedStoreId, center);

  // 地図の中心座標（propsのcenter優先、なければmapCenter）
  const effectiveCenter = center ?? mapCenter;

  // ビューポート内の店舗リストと更新関数を管理
  const {
    viewportStores, // ビューポート内の店舗リスト
    updateViewportStores, // ビューポート内店舗リストの更新関数
  } = useViewportStores(filteredStores, mapRef, mapZoom, effectiveCenter);

  // ズーム・中心変更時の地図ロジックを専用フックで管理
  const { handleZoomChanged, handleCenterChangedWithViewport } =
    useMapViewportUpdate(
      mapRef, // GoogleMapインスタンス参照
      mapZoom, // 現在のズーム倍率
      setZoom, // ズーム倍率の更新関数
      updateViewportStores, // ビューポート内店舗リストの更新関数
      handleCenterChanged // 地図中心変更時のコールバック
    );

  // グリッドサンプリング適用
  const sampledStores = useGridSampleStores(viewportStores, mapZoom);

  // center/zoomが未定義なら地図情報なしを表示
  if (!effectiveCenter || typeof mapZoom !== "number") {
    return (
      <div className="relative w-full h-full rounded bg-gray-200 flex items-center justify-center">
        地図情報がありません
      </div>
    );
  }

  // Google Maps APIのロードエラー時
  if (loadError) return <MapLoadError />;
  // Google Maps API未ロード時
  if (!isLoaded) return <MapLoading />;

  // 地図本体と店舗マーカーを描画（バーチャライズ＋グリッドサンプリング適用）
  return (
    <div className="relative w-full h-full rounded overflow-hidden">
      {/* ローディングオーバーレイ */}
      {loading && <LoadingOverlay />}
      {/* GoogleMap本体 */}
      <GoogleMap
        mapContainerStyle={containerStyle} // 地図コンテナのサイズ・スタイル指定
        center={effectiveCenter}
        zoom={mapZoom}
        onLoad={(map) => {
          mapRef.current = map as unknown as google.maps.Map;
          updateViewportStores();
        }}
        onUnmount={() => {
          mapRef.current = null; // 地図コンポーネントのアンマウント時にGoogleMap参照をクリア
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
