"use client";
import { useCurrentLocationSearch } from "@/features/home/hooks/useCurrentLocationSearch";
import { useFilteredStores } from "@/features/home/hooks/useFilteredStores";
import { useSelectedStoreId } from "@/features/home/hooks/useSelectedStoreId";
import MapView from "@/features/search/MapView/components/MapView";
import MenuResultList from "@/features/search/MenuResultList/components/MenuResultList";
import { useMenuListByStore } from "@/features/search/MenuResultList/hooks/useMenuListByStore";
import SearchForm from "@/features/search/SearchForm/components/SearchForm";
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
    handleCurrentLocationChange,
    setCenter,
    center,
    setZoom,
  } = useCurrentLocationSearch();

  // 検索結果リスト・地図連携用：選択店舗ID
  const { selectedStoreId, setSelectedStoreId } = useSelectedStoreId();

  // 現在地検索時は店舗選択解除
  const handleCurrentLocationChangeWithDeselect = (
    lat: number,
    lng: number
  ) => {
    setSelectedStoreId(null);
    handleCurrentLocationChange(lat, lng);
  };
  // 塩分量で店舗を絞り込む
  const filteredStores = useFilteredStores(saltValue);

  // 選択店舗IDに応じてメニュー一覧を取得
  const { menus: selectedMenus } = useMenuListByStore(selectedStoreId);

  // ローディング状態（検索・現在地取得）
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  // デバッグ: 選択店舗IDとメニュー一覧を表示
  // デバッグ: 選択店舗IDとメニュー一覧を表示

  return (
    <main className="p-4 flex flex-col items-center gap-8">
      {/* 検索フォーム（幅をデュアルペインと揃える） */}
      <div className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1700px] mx-auto">
        <SearchForm
          areaName={areaName}
          setAreaName={setAreaName}
          onCurrentLocationChange={handleCurrentLocationChangeWithDeselect}
          useCurrentLocation={useCurrentLocation}
          setUseCurrentLocation={setUseCurrentLocation}
          saltValue={saltValue}
          setSaltValue={setSaltValue}
          setCenter={setCenter}
          setZoom={setZoom}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
          isLocating={isLocating}
          setIsLocating={setIsLocating}
        />
      </div>
      {/* デュアルペイン：MapView（左）＋SearchResultList（右） */}
      <div className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1700px] mx-auto flex flex-row gap-4 h-[70vh] min-h-[400px]">
        <div className="w-4/6 h-full">
          <div className="h-full">
            <MapView
              filteredStores={filteredStores}
              selectedStoreId={selectedStoreId}
              setSelectedStoreId={setSelectedStoreId}
              center={center}
              loading={isSearching || isLocating}
            />
          </div>
        </div>
        <div className="w-2/6 h-full overflow-y-auto">
          {/* 選択店舗のメニュー一覧を表示（塩分量昇順） */}
          <MenuResultList menus={selectedMenus || []} saltLimit={saltValue} />
        </div>
      </div>
    </main>
  );
}
