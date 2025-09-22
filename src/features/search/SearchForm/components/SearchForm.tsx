"use client";
import React from "react";
import { useAreaGeocodeSearch } from "../hooks/useAreaGeocodeSearch";
import { useGeolocationEffect } from "../hooks/useGeolocationEffect";
import AreaSearchInput from "./AreaSearchInput";
import CurrentLocationButton from "./CurrentLocationSearchButton";
import SaltFilter from "./SaltFilter";
import SearchButton from "./SearchButton";

/**
 * 検索条件フォーム（SearchForm）
 * - 店名・料理名キーワード入力
 * - 現在地から検索トグル
 * - 塩分量フィルタ
 * - 検索ボタン
 * 各種状態・操作関数は親からpropsで受け取る
 *
 * @typedef {Object} SearchFormProps
 * @property {string} areaName - エリア名（地名・住所・駅名など）
 * @property {(value: string) => void} setAreaName - エリア名の更新関数
 * @property {(lat: number, lng: number) => void} [onCurrentLocationChange] - 現在地取得時のコールバック（lat/lngを親に渡す）
 * @property {boolean} useCurrentLocation - 現在地検索ON/OFF状態
 * @property {(checked: boolean) => void} setUseCurrentLocation - 現在地検索ON/OFF切り替え関数
 * @property {number} saltValue - 塩分量フィルタ値（g単位）
 * @property {(value: number) => void} setSaltValue - 塩分量フィルタ値の更新関数
 */
type SearchFormProps = {
  areaName: string;
  setAreaName: (value: string) => void;
  onCurrentLocationChange?: (lat: number, lng: number) => void;
  useCurrentLocation: boolean;
  setUseCurrentLocation: (checked: boolean) => void;
  saltValue: number;
  setSaltValue: (value: number) => void;
  setCenter: (center: { lat: number; lng: number }) => void;
};

const SearchForm: React.FC<SearchFormProps> = ({
  areaName,
  setAreaName,
  onCurrentLocationChange,
  useCurrentLocation,
  setUseCurrentLocation,
  saltValue,
  setSaltValue,
  setCenter,
}) => {
  // 現在地検索ON時にブラウザの位置情報APIで緯度・経度を取得し、親に通知する
  useGeolocationEffect(useCurrentLocation, onCurrentLocationChange);

  // エリア名検索用フック（Geocoding & center更新）
  const handleSearch = useAreaGeocodeSearch(
    areaName,
    useCurrentLocation,
    setCenter
  );

  return (
    <form
      className="flex flex-col gap-4 w-full max-w-3xl mx-auto p-4 bg-white rounded shadow"
      onSubmit={handleSearch}
    >
      {/* 住所や場所を入力＋検索ボタン 横並び */}
      <div className="flex flex-row gap-2 items-end">
        <div className="flex-1">
          {/* エリア検索欄（地名・住所・駅名で検索） */}
          <AreaSearchInput
            value={areaName}
            onChange={setAreaName}
            disabled={useCurrentLocation}
          />
        </div>
        <div className="flex-shrink-0">
          {/* 検索ボタン：入力内容で検索を実行 */}
          <SearchButton />
        </div>
      </div>

      {/* 現在地から検索（中央寄せ） */}
      <div className="flex justify-center">
        <CurrentLocationButton
          checked={useCurrentLocation}
          onChange={setUseCurrentLocation}
        />
      </div>

      {/* 塩分量フィルタ（下部） */}
      <div className="mt-2">
        <SaltFilter value={saltValue} onChange={setSaltValue} />
      </div>
    </form>
  );
};

export default SearchForm;
