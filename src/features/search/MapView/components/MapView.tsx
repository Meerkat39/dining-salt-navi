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
import { StoreMarkerWithInfoWindow } from "./StoreMarkerWithInfoWindow";

/**
 * 店舗・メニュー地図表示（MapView）
 * - 店舗リストのピン表示
 * - 店舗ごとのメニュー情報（InfoWindow）
 * - 現在地中心表示（center指定時）
 *
 * @typedef {Object} MapViewProps
 * @property {Store[]} stores - 店舗リスト配列
 * @property {Menu[]} menus - メニューリスト配列
 * @property {{ lat: number, lng: number }} [center] - 地図の中心座標（現在地検索時のみ指定、未指定時はデフォルト）
 */
type MapViewProps = {
  stores: Store[];
  menus: Menu[];
  center?: { lat: number; lng: number };
};

const MapView: React.FC<MapViewProps> = ({ stores, menus, center }) => {
  // Google Maps APIのロード状態（isLoaded: 読み込み完了, loadError: 読み込み失敗）
  const { isLoaded, loadError } = useGoogleMapsLoader();
  // 選択中の店舗ID（InfoWindow表示用）
  const [selectedStoreId, setSelectedStoreId] = React.useState<string | null>(
    null
  );
  // center管理（props反映）
  const mapCenter = useMapCenter(center);

  // 地図ロード状態表示（エラー・ローディング）
  if (loadError) return <MapLoadError />;
  if (!isLoaded) return <MapLoading />;

  return (
    <div className="w-full h-96 max-w-2xl mx-auto rounded overflow-hidden">
      {/* GoogleMap本体（地図を表示する） */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={13}
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
            selectedStoreId={selectedStoreId}
            setSelectedStoreId={setSelectedStoreId}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default MapView;
