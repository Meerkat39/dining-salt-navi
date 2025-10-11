import type { Store } from "@/types/store";
import { InfoWindow as GoogleMapsInfoWindow } from "@react-google-maps/api";
import React from "react";

/**
 * InfoWindow（ピン選択時の情報表示・仮UI）
 *
 * @param {Store} store - 表示対象の店舗情報
 * @param {Menu[]} menus - 店舗に紐づくメニュー一覧
 * @param {number=} omittedCount - 省略されたメニュー件数（最大表示件数を超えた場合に表示）
 * @param {() => void=} onClose - 閉じるボタン押下時のコールバック
 *
 * 店舗情報とメニュー情報を受け取り、ピンの横に吹き出しで店名・料理名・塩分量・緯度経度を表示。
 * omittedCountが指定された場合は「他○件省略」と表示。
 * onCloseで吹き出しを閉じる。
 * Google Maps導入時は本物のInfoWindowに差し替え予定。
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
        <div className="font-bold mb-1">{store.name}</div>
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
