import type { Store } from "@/types/store";
import React from "react";
import { useStoreMenus } from "../hooks/useStoreMenus";
import InfoWindow from "./InfoWindow";
import Marker from "./Marker";
import { StoreInfoWindowFrame } from "./StoreInfoWindowFrame";

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
  saltValue: number;
};

export function StoreMarkerWithInfoWindow({
  store,
  selectedStoreId,
  setSelectedStoreId,
  saltValue,
}: StoreMarkerWithInfoWindowProps) {
  // カスタムフックでメニュー取得・エラー管理
  const {
    menus,
    error: menuError,
    loading,
  } = useStoreMenus(store.chain_id || null);

  const filteredMenus = (menus || []).filter((menu) => menu.salt <= saltValue);
  const displayMenus = filteredMenus.slice(0, 5);
  const omittedCount = filteredMenus.length - displayMenus.length;

  return (
    <>
      {/* 店舗マーカー（クリックでInfoWindow表示） */}
      <Marker store={store} onClick={() => setSelectedStoreId(store.id)} />

      {/* マーカークリック時のみInfoWindow表示 */}
      {selectedStoreId === store.id &&
        (menuError ? (
          <StoreInfoWindowFrame
            store={store}
            onClose={() => setSelectedStoreId(null)}
          >
            {/* エラーメッセージ表示 */}
            <div className="text-red-500">{menuError}</div>
          </StoreInfoWindowFrame>
        ) : loading ? (
          <StoreInfoWindowFrame
            store={store}
            onClose={() => setSelectedStoreId(null)}
          >
            {/* ローディング表示 */}
            <div>メニュー情報を取得中...</div>
          </StoreInfoWindowFrame>
        ) : filteredMenus.length === 0 ? null : (
          <InfoWindow
            store={store}
            menus={displayMenus}
            omittedCount={omittedCount}
            onClose={() => setSelectedStoreId(null)}
          />
        ))}
    </>
  );
}
