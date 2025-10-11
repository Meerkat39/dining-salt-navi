import type { Store } from "@/types/store";
import { Marker as GoogleMapsMarker } from "@react-google-maps/api";
import React from "react";

/**
 * 店舗マーカー（Google Maps用ピン）
 * 店舗情報（store）を元に地図上にピンを表示し、ピン押下時にonClickコールバックを実行する。
 * @param {Store} store 店舗情報（座標・店名など）
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
