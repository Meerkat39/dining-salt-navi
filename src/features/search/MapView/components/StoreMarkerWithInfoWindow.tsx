import type { Menu } from "@/types/menu";
import type { Store } from "@/types/store";
import React, { useEffect, useState } from "react";
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
  saltValue: number;
};

export function StoreMarkerWithInfoWindow({
  store,
  selectedStoreId,
  setSelectedStoreId,
  saltValue,
}: StoreMarkerWithInfoWindowProps) {
  // 店舗に紐づくメニューをDB/APIから取得
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    if (!store.chain_id) return;
    // chain_idでメニュー取得（API例: /api/chainmenus?chain_id=xxx）
    fetch(`/api/chainmenus?chain_id=${store.chain_id}`)
      .then((res) => res.json())
      .then((data) => {
        setMenus(data);
      })
      .catch(console.error);
  }, [store.chain_id]);

  if (menus.length === 0) return null;
  // 塩分量でフィルタ
  const filteredMenus = menus.filter((menu) => menu.salt <= saltValue);
  if (filteredMenus.length === 0) return null;
  // 最大5件まで表示、残りは省略
  const displayMenus = filteredMenus.slice(0, 5);
  const omittedCount = filteredMenus.length - displayMenus.length;
  return (
    <>
      {/* 店舗マーカー */}
      <Marker store={store} onClick={() => setSelectedStoreId(store.id)} />
      {/* マーカークリック時のみInfoWindow表示 */}
      {selectedStoreId === store.id && (
        <InfoWindow
          store={store}
          menus={displayMenus}
          omittedCount={omittedCount}
          onClose={() => setSelectedStoreId(null)}
        />
      )}
    </>
  );
}
