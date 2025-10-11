import type { Store } from "@/types/store";
import { InfoWindow as GoogleMapsInfoWindow } from "@react-google-maps/api";
import React from "react";

/**
 * InfoWindow（店舗ピン選択時の情報表示）
 * 店舗情報（store）を受け取り、地図上のピン横に店名を表示する。
 * onCloseで吹き出しを閉じる。
 * @param {Store} store 表示対象の店舗情報
 * @param {() => void=} onClose 閉じるボタン押下時のコールバック（任意）
 */
type InfoWindowProps = {
  store: Store;
  onClose?: () => void;
};

const InfoWindow: React.FC<InfoWindowProps> = ({ store, onClose }) => {
  // Google Maps APIロード済みならpixelOffsetでInfoWindowを上方向にずらす
  const infoWindowOptions =
    typeof window !== "undefined" && window.google && window.google.maps
      ? { pixelOffset: new window.google.maps.Size(0, -40) }
      : undefined;

  return (
    <GoogleMapsInfoWindow
      position={{ lat: store.lat, lng: store.lng }}
      onCloseClick={onClose}
      options={infoWindowOptions}
    >
      <div className="p-2 text-xs" data-testid="info-window">
        {/* 店名表示 */}
        <div className="font-bold mb-1">{store.name}</div>
        {/* 閉じるボタン（onClose指定時のみ表示） */}
        {onClose && (
          <button onClick={onClose} data-testid="info-window-close">
            閉じる
          </button>
        )}
      </div>
    </GoogleMapsInfoWindow>
  );
};

export default InfoWindow;
