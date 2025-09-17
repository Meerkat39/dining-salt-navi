"use client";
import { GoogleMap } from "@react-google-maps/api";
import React from "react";
import { stores } from "../../data/stores.mock";
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

const center = { lat: 35.6895, lng: 139.6917 }; // 東京駅など仮の中心

const MapView: React.FC = () => {
  const { isLoaded, loadError } = useGoogleMapsLoader();
  const [selectedStoreId, setSelectedStoreId] = React.useState<string | null>(
    null
  );

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
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {stores.map((store) => (
          <React.Fragment key={store.id}>
            <Marker
              store={store}
              onClick={() => setSelectedStoreId(store.id)}
            />
            {selectedStoreId === store.id && (
              <InfoWindow
                store={store}
                onClose={() => setSelectedStoreId(null)}
              />
            )}
          </React.Fragment>
        ))}
      </GoogleMap>
    </div>
  );
};

export default MapView;
