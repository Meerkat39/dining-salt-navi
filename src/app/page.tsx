"use client";
import { menus } from "@/features/search/data/menus.mock";
import { stores } from "@/features/search/data/stores.mock";
import MapView from "@/features/search/MapView/components/MapView";
import SearchForm from "@/features/search/SearchForm/components/SearchForm";
import SearchResultList from "@/features/search/SearchResultList/components/SearchResultList";
import { useCurrentLocationSearch } from "@/hooks/useCurrentLocationSearch";
import { useFilteredStoresMenus } from "@/hooks/useFilteredStoresMenus";
import { useSelectedStoreId } from "@/hooks/useSelectedStoreId";
import { useState } from "react";

export default function Home() {
  // 検索キーワード（店名・料理名など）
  const [keyword, setKeyword] = useState("");
  // 塩分量フィルタの指定値（g単位、初期値2.5g）
  const [saltValue, setSaltValue] = useState(2.5);
  // 現在地取得の状態・座標・コールバックをまとめて管理
  const {
    useCurrentLocation,
    setUseCurrentLocation,
    center,
    handleCurrentLocationChange,
  } = useCurrentLocationSearch();
  // 検索キーワード・塩分量で店舗・メニューを絞り込む
  const { filteredStores, filteredMenus } = useFilteredStoresMenus(
    stores,
    menus,
    keyword,
    saltValue
  );
  // 検索結果リスト・地図連携用：選択店舗ID
  const { selectedStoreId, setSelectedStoreId, handleStoreItemClick } =
    useSelectedStoreId();

  return (
    <main className="p-4 flex flex-col gap-8">
      {/* 検索フォーム：キーワード・塩分量・現在地取得の状態と操作関数を渡す */}
      <SearchForm
        keyword={keyword}
        setKeyword={setKeyword}
        onCurrentLocationChange={handleCurrentLocationChange}
        useCurrentLocation={useCurrentLocation}
        setUseCurrentLocation={setUseCurrentLocation}
        saltValue={saltValue}
        setSaltValue={setSaltValue}
      />
      {/* MapView：絞り込まれた店舗・メニュー・現在地座標・選択店舗IDを渡して地図表示 */}
      <MapView
        stores={filteredStores}
        menus={filteredMenus}
        center={center}
        selectedStoreId={selectedStoreId}
        setSelectedStoreId={setSelectedStoreId}
      />
      {/* 検索結果リスト：絞り込まれた店舗一覧をリスト表示＋項目クリックで選択ID更新 */}
      <SearchResultList
        stores={filteredStores}
        onStoreItemClick={handleStoreItemClick}
        selectedStoreId={selectedStoreId}
      />
    </main>
  );
}
