import type { Store } from "@/types/store";
import React from "react";
import InfoWindow from "./InfoWindow";
import Marker from "./Marker";

/**
 * 店舗マーカー＋InfoWindow描画用サブコンポーネント
 *
 * @param {Store} store - 表示対象の店舗データ
 * @param {string|null} selectedStoreId - 選択中の店舗ID（InfoWindow表示判定用）
 * @param {React.Dispatch<React.SetStateAction<string|null>>} setSelectedStoreId - 選択店舗IDの更新関数（ピン/リスト連携用）
 * @param {number} saltValue - 塩分量フィルタ値（g単位、スライダー連動）
 *
 * 店舗ごとにマーカーを表示し、クリック時にInfoWindowで店舗情報＋代表メニュー（最大5件）を表示。
 * 店舗情報（store）からchain_idでDB/APIからメニューを取得し、saltValueでメニューをフィルタ。
 */

export type StoreMarkerWithInfoWindowProps = {
  store: Store;
  selectedStoreId: string | null;
  setSelectedStoreId: React.Dispatch<React.SetStateAction<string | null>>;
};

export function StoreMarkerWithInfoWindow({
  store,
  selectedStoreId,
  setSelectedStoreId,
}: StoreMarkerWithInfoWindowProps) {
  return (
    <>
      {/* 店舗マーカー（クリックでInfoWindow表示） */}
      <Marker store={store} onClick={() => setSelectedStoreId(store.id)} />

      {/* マーカークリック時のみInfoWindow表示（店舗名のみ） */}
      {selectedStoreId === store.id && (
        <InfoWindow store={store} onClose={() => setSelectedStoreId(null)} />
      )}
    </>
  );
}
