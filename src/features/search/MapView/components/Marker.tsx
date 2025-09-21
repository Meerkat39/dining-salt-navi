import type { Store } from "@/types/store";
import { Marker as GoogleMapsMarker } from "@react-google-maps/api";
import React from "react";

/**
 * Marker（ピン表示・仮UI）
 * - 店舗情報を受け取り、ダミー地図上にピン（アイコン＋店名）を絶対配置
 * - Google Maps導入時は本物のピンに差し替え予定
 * @param {Store} store 店舗情報
 * @param {() => void} [onClick] ピン押下時のコールバック（任意）
 */
type MarkerProps = {
  store: Store;
  onClick?: () => void;
};

const Marker: React.FC<MarkerProps> = ({ store, onClick }) => {
  return (
    <GoogleMapsMarker
      position={{ lat: store.lat, lng: store.lng }}
      title={store.name}
      onClick={onClick}
    />
  );
};

export default Marker;
