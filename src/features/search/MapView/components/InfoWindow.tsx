import type { Menu } from "@/types/menu";
import type { Store } from "@/types/store";
import React from "react";

/**
 * InfoWindow（ピン選択時の情報表示・仮UI）
 * - 店舗情報とメニュー情報を受け取り、ピンの横に吹き出しで店名・料理名・塩分量・緯度経度を表示
 * - onCloseで吹き出しを閉じる
 * - Google Maps導入時は本物のInfoWindowに差し替え予定
 * @param store 店舗情報
 * @param menu メニュー情報
 * @param onClose 閉じるボタン押下時のコールバック
 */
type InfoWindowProps = {
  store: Store;
  menus: Menu[];
  omittedCount?: number;
  onClose?: () => void;
};

const InfoWindow: React.FC<InfoWindowProps> = ({
  store,
  menus,
  omittedCount = 0,
  onClose,
}) => {
  return (
    <div className="absolute bg-white border rounded shadow p-2 text-xs left-8 top-0 z-10">
      <div className="font-bold mb-1">{store.name}</div>
      <div className="mb-1">メニュー一覧:</div>
      <ul className="mb-1">
        {menus.map((menu) => (
          <li key={menu.id}>
            <span className="font-semibold">{menu.name}</span>（塩分:{" "}
            {menu.salt}g）
          </li>
        ))}
      </ul>
      {omittedCount > 0 && (
        <div className="text-gray-500 text-xs">他 {omittedCount} 件省略</div>
      )}
      <div>緯度: {store.lat}</div>
      <div>経度: {store.lng}</div>
      {onClose && (
        <button className="text-blue-500 mt-1" onClick={onClose}>
          閉じる
        </button>
      )}
    </div>
  );
};

export default InfoWindow;
