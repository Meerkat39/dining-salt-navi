import type { Menu } from "@/types/menu";
import type { Store } from "@/types/store";

/**
 * 店舗リストを塩分量で絞り込むカスタムフック
 * @param {number} saltValue 塩分量フィルタ（g単位）
 * @returns {Store[]} filteredStores 絞り込まれた店舗リスト
 *
 * DB/APIからstores・menusを非同期取得し、塩分量で絞り込む
 */
import { useEffect, useState } from "react";

export function useFilteredStores(saltValue: number): Store[] {
  const [stores, setStores] = useState<Store[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    // 店舗データ取得
    fetch("/api/stores")
      .then((res) => res.json())
      .then(setStores)
      .catch(console.error);
    // メニューデータ取得
    fetch("/api/menus")
      .then((res) => res.json())
      .then(setMenus)
      .catch(console.error);
  }, []);

  return stores.filter((store) => {
    // 店舗のchain_idに紐づくメニュー一覧を取得
    const storeMenus = menus.filter((menu) => menu.chain_id === store.chain_id);
    // 塩分量フィルタ（いずれかのメニューが条件以下ならOK）
    return storeMenus.some((menu) => menu.salt <= saltValue);
  });
}

// stores, menusは親コンポーネントからpropsで渡す設計です
