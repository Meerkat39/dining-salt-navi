import type { Store } from "@/types/store";
import React from "react";

/**
 * Marker（ピン表示・仮UI）
 * - 店舗情報を受け取り、ダミー地図上にピン（アイコン＋店名）を絶対配置
 * - Google Maps導入時は本物のピンに差し替え予定
 * @param store 店舗情報
 */
type MarkerProps = {
  store: Store;
};

const Marker: React.FC<MarkerProps> = ({ store }) => {
  // Google MapsのMarker実装は後で追加
  return (
    <div className="absolute text-red-500" style={{ left: 0, top: 0 }}>
      📍 {store.name}
    </div>
  );
};

export default Marker;
