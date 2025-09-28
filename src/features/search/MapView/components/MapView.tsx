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

type MapViewProps = {
  filteredStores: Store[];
  selectedStoreId?: string | null;
  setSelectedStoreId?: React.Dispatch<React.SetStateAction<string | null>>;
  saltValue: number;
};

const MapView: React.FC<MapViewProps> = ({
  filteredStores,
  selectedStoreId,
  setSelectedStoreId,
  saltValue,
}) => {
  const { isLoaded, loadError } = useGoogleMapsLoader();
  const { center, zoom, mapRef, handleCenterChanged } = useMapViewLogic(
    filteredStores,
    selectedStoreId
  );

  if (loadError) return <MapLoadError />;
  if (!isLoaded) return <MapLoading />;

  // 地図本体と店舗マーカーを描画
  return (
    <div className="relative w-full h-full rounded overflow-hidden">
      {/* GoogleMap本体 */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={(map) => {
          mapRef.current = map as unknown as google.maps.Map;
        }}
        onUnmount={() => {
          mapRef.current = null;
        }}
        onCenterChanged={handleCenterChanged}
      >
        {/* 店舗ごとにマーカー＋InfoWindowを描画 */}
        {filteredStores.map((store) => (
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
