"use client";

import { GoogleMap } from "@react-google-maps/api";
import React from "react";
import { useGoogleMapsLoader } from "../api/googleMaps";
import {
  containerStyle,
  MapLoadError,
  MapLoading,
  useMapCenter,
} from "../utils/MapViewUtils";
import { getMapCenterAndZoom } from "../utils/getMapCenterAndZoom";
import { StoreMarkerWithInfoWindow } from "./StoreMarkerWithInfoWindow";

/**
 * 店舗・メニュー地図表示コンポーネント
 *
 * @param {Object} props - プロパティ
 * @param {Store[]} props.filteredStores - 絞り込まれた店舗リスト（塩分量・エリアでフィルタ済み）
 * @param {{ lat: number; lng: number }=} props.center - 地図の中心座標（エリア検索・現在地検索時に指定）
 * @param {string=} props.selectedStoreId - 選択中の店舗ID（InfoWindow表示・地図ズーム用）
 * @param {function=} props.setSelectedStoreId - 選択店舗IDの更新関数（ピン/リスト連携用）
 * @param {number} props.saltValue - 塩分量フィルタ値（g単位、スライダー連動）
 *
 * 地図上に店舗マーカーとInfoWindowを表示し、エリア検索時はcenterで地図中心を切り替える。
 * filteredStoresは塩分量・エリアで動的に変化する。
 */
import type { Store } from "@/types/store";
type MapViewProps = {
  filteredStores: Store[];
  center?: { lat: number; lng: number };
  selectedStoreId?: string | null;
  setSelectedStoreId?: React.Dispatch<React.SetStateAction<string | null>>;
  saltValue: number;
};

const MapView: React.FC<MapViewProps> = ({
  filteredStores,
  center,
  selectedStoreId,
  setSelectedStoreId,
  saltValue,
}) => {
  // Google Maps APIのロード状態（isLoaded: 読み込み完了, loadError: 読み込み失敗）
  const { isLoaded, loadError } = useGoogleMapsLoader();
  // 地図中心・ズーム値をユーティリティで算出
  const { center: mapCenter, zoom: mapZoom } = getMapCenterAndZoom(
    filteredStores,
    selectedStoreId,
    useMapCenter(center),
    13
  );

  // 地図ロード状態表示（エラー・ローディング）
  if (loadError) return <MapLoadError />;
  if (!isLoaded) return <MapLoading />;

  return (
    <div className="w-full h-full rounded overflow-hidden">
      {/* GoogleMap本体（地図を表示する） */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={mapZoom}
        onCenterChanged={() => {
          // 地図中心座標がユーザー操作で変更された場合の処理（現状は内部stateのみ更新）
        }}
      >
        {/* 店舗ごとにマーカー＋InfoWindowをサブコンポーネントで描画 */}
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
