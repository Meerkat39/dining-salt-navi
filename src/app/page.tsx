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
    <main className="p-4 flex flex-col items-center gap-8">
      {/* 検索フォーム（幅をデュアルペインと揃える） */}
      <div className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1700px] mx-auto">
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
      </div>
      {/* デュアルペイン：MapView（左）＋SearchResultList（右） */}
      <div className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1700px] mx-auto flex flex-row gap-4 h-[70vh] min-h-[400px]">
        <div className="w-4/6 h-full">
          <div className="h-full">
            <MapView
              filteredStores={filteredStores}
              center={center}
              selectedStoreId={selectedStoreId}
              setSelectedStoreId={setSelectedStoreId}
              saltValue={saltValue}
            />
          </div>
        </div>
        <div className="w-2/6 h-full overflow-y-auto">
          <SearchResultList
            stores={filteredStores}
            onStoreItemClick={handleStoreItemClick}
            selectedStoreId={selectedStoreId}
          />
        </div>
      </div>
    </main>
  );
}
