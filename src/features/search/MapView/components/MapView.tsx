"use client";
import { GoogleMap } from "@react-google-maps/api";
import React from "react";
import { useGoogleMapsLoader } from "../api/googleMaps";
import InfoWindow from "./InfoWindow";
import Marker from "./Marker";

/**
 * MapView（Google Map本体表示）
 * - 店舗リスト（stores）をpropsで受け取り、今後ピン表示予定
 * - まずは地図本体のみ表示
 * @param stores 店舗リスト配列
 */

// 仮データを直接利用するためpropsは不要

const containerStyle = {
  width: "100%",
  height: "400px",
};

import type { Menu } from "@/types/menu";
import type { Store } from "@/types/store";

/**
 * MapViewProps
 * @param stores 店舗リスト配列
 * @param center 地図の中心座標（lat/lng）
 * @param onCenterChanged 地図中心変更時のコールバック
 */
/**
 * MapViewProps
 * @param stores 店舗リスト配列
 * @param center 地図の中心座標（lat/lng）: 現在地検索時のみ渡す（undefined可）
 */
type MapViewProps = {
  stores: Store[];
  menus: Menu[];
  center?: { lat: number; lng: number };
};

const DEFAULT_CENTER = { lat: 35.6895, lng: 139.6917 };

const MapView: React.FC<MapViewProps> = ({ stores, menus, center }) => {
  const { isLoaded, loadError } = useGoogleMapsLoader();
  const [selectedStoreId, setSelectedStoreId] = React.useState<string | null>(
    null
  );
  // centerは内部stateで管理
  const [mapCenter, setMapCenter] = React.useState<{
    lat: number;
    lng: number;
  }>(DEFAULT_CENTER);
  // center propsが渡された場合のみ一度だけcenterを更新
  React.useEffect(() => {
    if (center) {
      setMapCenter(center);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center?.lat, center?.lng]);

  if (loadError)
    return (
      <div className="w-full h-96 flex items-center justify-center text-red-500">
        地図の読み込みに失敗しました
      </div>
    );
  if (!isLoaded)
    return (
      <div className="w-full h-96 flex items-center justify-center">
        Loading Map...
      </div>
    );

  return (
    <div className="w-full h-96 max-w-2xl mx-auto rounded overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={13}
        onCenterChanged={() => {
          // ユーザー操作で地図中心が変わっても内部stateのみ更新（親には通知しない）
          // GoogleMapのgetCenter()で座標取得可能
        }}
      >
        {stores.map((store) => {
          // chain_idで該当メニューをすべて取得
          const matchedMenus = menus.filter(
            (m) => m.chain_id === store.chain_id
          );
          // 条件に合うメニューがなければマーカー自体を表示しない
          if (matchedMenus.length === 0) return null;
          // 最大5件まで表示、残りは省略
          const displayMenus = matchedMenus.slice(0, 5);
          const omittedCount = matchedMenus.length - displayMenus.length;
          return (
            <React.Fragment key={store.id}>
              <Marker
                store={store}
                onClick={() => setSelectedStoreId(store.id)}
              />
              {selectedStoreId === store.id && (
                <InfoWindow
                  store={store}
                  menus={displayMenus}
                  omittedCount={omittedCount}
                  onClose={() => setSelectedStoreId(null)}
                />
              )}
            </React.Fragment>
          );
        })}
      </GoogleMap>
    </div>
  );
};

export default MapView;
