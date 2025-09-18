"use client";
import MapView from "@/features/search/MapView/components/MapView";
import SearchForm from "@/features/search/SearchForm/components/SearchForm";
import SearchResultList from "@/features/search/SearchResultList/components/SearchResultList";
import { useState } from "react";
import { menus } from "../features/search/data/menus.mock";
import { stores } from "../features/search/data/stores.mock";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [saltValue, setSaltValue] = useState(2.5); // 塩分量フィルタ値
  // 「現在地から検索」ON/OFF状態を親で管理
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  // centerは現在地取得時のみ一時的に保持
  const [center, setCenter] = useState<
    { lat: number; lng: number } | undefined
  >(undefined);

  // 店舗ごとに、条件に合うメニューが1件以上あるものだけ抽出
  const filteredStores = stores.filter((store) => {
    const hasMenu = menus.some(
      (menu) => menu.chain_id === store.chain_id && menu.salt <= saltValue
    );
    return store.name.toLowerCase().includes(keyword.toLowerCase()) && hasMenu;
  });

  // MapView用：条件に合うメニューのみ
  const filteredMenus = menus.filter((menu) => menu.salt <= saltValue);

  // 現在地取得時のコールバック
  const handleCurrentLocationChange = (lat: number, lng: number) => {
    setCenter({ lat, lng });
    setUseCurrentLocation(false);
    setTimeout(() => setCenter(undefined), 500);
  };

  return (
    <main className="p-4 flex flex-col gap-8">
      {/* 検索フォームにキーワード状態・setter・現在地取得コールバック・現在地ON/OFF状態・塩分量フィルタを渡す */}
      <SearchForm
        keyword={keyword}
        setKeyword={setKeyword}
        onCurrentLocationChange={handleCurrentLocationChange}
        useCurrentLocation={useCurrentLocation}
        setUseCurrentLocation={setUseCurrentLocation}
        saltValue={saltValue}
        setSaltValue={setSaltValue}
      />
      {/* MapViewにcenter（現在地取得時のみ）とfilteredMenusを渡す */}
      <MapView stores={filteredStores} menus={filteredMenus} center={center} />
      <SearchResultList stores={filteredStores} />
    </main>
  );
}
