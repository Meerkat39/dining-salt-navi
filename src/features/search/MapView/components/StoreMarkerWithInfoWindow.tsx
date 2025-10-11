import type { Store } from "@/types/store";
import React from "react";
import InfoWindow from "./InfoWindow";
import Marker from "./Marker";

/**
 * 店舗マーカー＋InfoWindow描画用サブコンポーネント
 *
 * 店舗ごとにマーカーを表示し、クリック時にInfoWindowで店舗情報（店舗名のみ）を表示。
 * 選択中の店舗ID（selectedStoreId）が一致した場合のみInfoWindowを表示。
 * ピン/リスト連携のためsetSelectedStoreIdで選択状態を管理。
 *
 * @param {Store} store - 表示対象の店舗データ
 * @param {string|null} selectedStoreId - 選択中の店舗ID（InfoWindow表示判定用）
 * @param {React.Dispatch<React.SetStateAction<string|null>>} setSelectedStoreId - 選択店舗IDの更新関数
 *
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
