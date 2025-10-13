"use client";

import { handleCurrentLocationChangeWithDeselect } from "@/features/home/hooks/handleCurrentLocationChangeWithDeselect";
import { useCurrentLocationSearch } from "@/features/home/hooks/useCurrentLocationSearch";
import { useFilteredStores } from "@/features/home/hooks/useFilteredStores";
import { useMenuListByStore } from "@/features/home/hooks/useMenuListByStore";
import { useSelectedStoreId } from "@/features/home/hooks/useSelectedStoreId";
import MapView from "@/features/search/MapView/components/MapView";
import MenuResultList from "@/features/search/MenuResultList/components/MenuResultList";
import SearchForm from "@/features/search/SearchForm/components/SearchForm";
import { useState } from "react";

export default function Home() {
  // エリア名（地名・住所・駅名など）
  const [areaName, setAreaName] = useState("");
  // 塩分量フィルタの指定値（g単位、初期値2.5g）
  const [saltValue, setSaltValue] = useState(2.5);
  // 現在地取得の状態・座標・コールバックをまとめて管理
  const {
    useCurrentLocation, // 現在地取得モードのON/OFF
    setUseCurrentLocation, // 現在地取得モードの切替関数
    handleCurrentLocationChange, // 現在地座標変更時のコールバック
    setCenter, // 地図中心座標の更新関数
    center, // 地図の中心座標
    setZoom, // 地図ズーム倍率の更新関数
  } = useCurrentLocationSearch();

  // 検索結果リスト・地図連携用：選択店舗ID
  const {
    selectedStoreId, // 選択中の店舗ID
    setSelectedStoreId, // 選択店舗IDの更新関数
  } = useSelectedStoreId();

  // 現在地検索時は店舗選択解除
  const handleCurrentLocationChangeWithDeselectWrapper = (
    lat: number,
    lng: number
  ) => {
    handleCurrentLocationChangeWithDeselect(
      setSelectedStoreId,
      handleCurrentLocationChange,
      lat,
      lng
    );
  };

  // 塩分量で店舗を絞り込む
  const filteredStores = useFilteredStores(saltValue);

  // 選択店舗IDに応じてメニュー一覧を取得
  const {
    menus: selectedMenus, // 選択店舗のメニュー一覧（塩分量昇順）
    loading: menuLoading, // メニュー取得中フラグ
    error: menuError, // メニュー取得エラー内容
  } = useMenuListByStore(selectedStoreId);

  // ローディング状態（検索・現在地取得）
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  return (
    <main className="p-4 flex flex-col items-center gap-8">
      {/* 検索フォーム（幅をデュアルペインと揃える） */}
      <div className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1700px] mx-auto">
        <SearchForm
          areaName={areaName}
          setAreaName={setAreaName}
          onCurrentLocationChange={
            handleCurrentLocationChangeWithDeselectWrapper
          }
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
      {/* デュアルペイン：PCは横並び、スマホは上下表示（レスポンシブ対応） */}
      <div className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1700px] mx-auto flex flex-col md:flex-row gap-4 h-[70vh] min-h-[400px]">
        {/* 地図表示（PC:左/スマホ:上） */}
        <div className="w-full md:w-4/6 h-auto md:min-h-[600px] mb-4 md:mb-0">
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
        {/* メニュー一覧（PC:右/スマホ:下） */}
        <div className="w-full md:w-2/6 h-auto md:min-h-[600px] md:h-full md:overflow-y-auto">
          <MenuResultList
            menus={selectedMenus || []}
            saltLimit={saltValue}
            selectedStoreId={selectedStoreId}
            loading={menuLoading}
            error={menuError}
          />
        </div>
      </div>
    </main>
  );
}
