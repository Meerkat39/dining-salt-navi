import type { Store } from "@/types/store";
import React from "react";

/**
 * InfoWindow（ピン選択時の情報表示・仮UI）
 * - 店舗情報を受け取り、ピンの横に吹き出しで店名・塩分量・住所を表示
 * - onCloseで吹き出しを閉じる
 * - Google Maps導入時は本物のInfoWindowに差し替え予定
 * @param store 店舗情報
 * @param onClose 閉じるボタン押下時のコールバック
 */
type InfoWindowProps = {
  store: Store;
  onClose?: () => void;
};

const InfoWindow: React.FC<InfoWindowProps> = ({ store, onClose }) => {
  return (
    <div className="absolute bg-white border rounded shadow p-2 text-xs left-8 top-0 z-10">
      <div className="font-bold mb-1">{store.name}</div>
      <div>塩分量: {store.salt}g</div>
      <div>住所: {store.address}</div>
      {onClose && (
        <button className="text-blue-500 mt-1" onClick={onClose}>
          閉じる
        </button>
      )}
    </div>
  );
};

export default InfoWindow;
