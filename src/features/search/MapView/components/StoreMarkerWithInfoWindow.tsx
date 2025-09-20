import type { Menu } from "@/types/menu";
import type { Store } from "@/types/store";
import React from "react";
import InfoWindow from "./InfoWindow";
import Marker from "./Marker";

/**
 * 店舗マーカー＋InfoWindow描画用サブコンポーネント
 */
export type StoreMarkerWithInfoWindowProps = {
  store: Store;
  menus: Menu[];
  selectedStoreId: string | null;
  setSelectedStoreId: React.Dispatch<React.SetStateAction<string | null>>;
};

export function StoreMarkerWithInfoWindow({
  store,
  menus,
  selectedStoreId,
  setSelectedStoreId,
}: StoreMarkerWithInfoWindowProps) {
  // 店舗に紐づくメニューを抽出
  const matchedMenus = menus.filter((m) => m.chain_id === store.chain_id);
  // 条件に合うメニューがなければマーカー自体を表示しない
  if (matchedMenus.length === 0) return null;
  // 最大5件まで表示、残りは省略
  const displayMenus = matchedMenus.slice(0, 5);
  const omittedCount = matchedMenus.length - displayMenus.length;
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
