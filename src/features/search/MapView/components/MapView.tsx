"use client";
import type { Menu } from "@/types/menu";
import type { Store } from "@/types/store";
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
 * 店舗・メニュー地図表示（MapView）
 * - 店舗リストのピン表示
 * - 店舗ごとのメニュー情報（InfoWindow）
 * - 現在地中心表示（center指定時）
 * - 検索結果リストや地図ピン選択と連携し、選択店舗IDでInfoWindow表示・地図ズーム
 *
 * @typedef {Object} MapViewProps
 * @property {Store[]} stores - 店舗リスト配列
 * @property {Menu[]} menus - メニューリスト配列
 * @property {{ lat: number, lng: number }} [center] - 地図の中心座標（現在地検索時のみ指定、未指定時はデフォルト）
 * @property {string|null} [selectedStoreId] - 選択中の店舗ID（InfoWindow表示・地図ズーム用）
 * @property {(id: string|null) => void} [setSelectedStoreId] - 選択店舗IDの更新関数（ピン/リスト連携用）
 */
type MapViewProps = {
  stores: Store[];
  menus: Menu[];
  center?: { lat: number; lng: number };
  selectedStoreId?: string | null;
  setSelectedStoreId?: React.Dispatch<React.SetStateAction<string | null>>;
};

const MapView: React.FC<MapViewProps> = ({
  stores,
  menus,
  center,
  selectedStoreId,
  setSelectedStoreId,
}) => {
  // Google Maps APIのロード状態（isLoaded: 読み込み完了, loadError: 読み込み失敗）
  const { isLoaded, loadError } = useGoogleMapsLoader();
  // 地図中心・ズーム値をユーティリティで算出
  const { center: mapCenter, zoom: mapZoom } = getMapCenterAndZoom(
    stores,
    selectedStoreId,
    useMapCenter(center),
    13
  );

  // 地図ロード状態表示（エラー・ローディング）
  if (loadError) return <MapLoadError />;
  if (!isLoaded) return <MapLoading />;

  return (
    <div className="w-full h-96 max-w-2xl mx-auto rounded overflow-hidden">
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
        {stores.map((store) => (
          <StoreMarkerWithInfoWindow
            key={store.id}
            store={store}
            menus={menus}
            selectedStoreId={selectedStoreId || null}
            setSelectedStoreId={setSelectedStoreId!}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default MapView;
