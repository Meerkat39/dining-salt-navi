"use client";
import { useCurrentLocationSearch } from "@/features/home/hooks/useCurrentLocationSearch";
import { useFilteredStores } from "@/features/home/hooks/useFilteredStores";
import { useSelectedStoreId } from "@/features/home/hooks/useSelectedStoreId";
import MapView from "@/features/search/MapView/components/MapView";
import SearchForm from "@/features/search/SearchForm/components/SearchForm";
import SearchResultList from "@/features/search/SearchResultList/components/SearchResultList";
import { useState } from "react";

export default function Home() {
  // エリア名（地名・住所・駅名など）
  const [areaName, setAreaName] = useState("");
  // 塩分量フィルタの指定値（g単位、初期値2.5g）
  const [saltValue, setSaltValue] = useState(2.5);
  // 現在地取得の状態・座標・コールバックをまとめて管理
  const {
    useCurrentLocation,
    setUseCurrentLocation,
    center,
    handleCurrentLocationChange,
    setCenter,
  } = useCurrentLocationSearch();
  // 塩分量で店舗を絞り込む
  const filteredStores = useFilteredStores(saltValue);
  // 検索結果リスト・地図連携用：選択店舗ID
  const { selectedStoreId, setSelectedStoreId, handleStoreItemClick } =
    useSelectedStoreId();

  return (
    <main className="p-4 flex flex-col gap-8">
      {/* 検索フォーム：キーワード・塩分量・現在地取得の状態と操作関数を渡す */}
      <SearchForm
        areaName={areaName}
        setAreaName={setAreaName}
        onCurrentLocationChange={handleCurrentLocationChange}
        useCurrentLocation={useCurrentLocation}
        setUseCurrentLocation={setUseCurrentLocation}
        saltValue={saltValue}
        setSaltValue={setSaltValue}
        setCenter={setCenter}
      />
      {/* MapView：絞り込まれた店舗・現在地座標・選択店舗ID・塩分量フィルタを渡して地図表示 */}
      <MapView
        filteredStores={filteredStores}
        center={center}
        selectedStoreId={selectedStoreId}
        setSelectedStoreId={setSelectedStoreId}
        saltValue={saltValue}
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
