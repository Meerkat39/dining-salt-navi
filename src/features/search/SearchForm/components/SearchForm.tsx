"use client";
import React from "react";
import CurrentLocationButton from "./CurrentLocationSearchButton";
import SaltFilter from "./SaltFilter";
import SearchButton from "./SearchButton";

/**
 * 検索条件フォーム（SearchForm）
 * - エリア名・駅名・住所入力、現在地から検索トグル、塩分量フィルタ、検索ボタンで構成
 * - 各子コンポーネントに状態・propsを分割して管理
 * - UI設計・UX要件に基づき、状態連携・無効化制御も実装
 */

/**
 * SearchFormProps
 * @param keyword 検索キーワード
 * @param setKeyword キーワード更新関数
 * @param onCurrentLocationChange 現在地取得時のコールバック（lat/lngを親に渡す）
 */
/**
 * SearchFormProps
 * @param keyword 検索キーワード
 * @param setKeyword キーワード更新関数
 * @param onCurrentLocationChange 現在地取得時のコールバック（lat/lngを親に渡す）
 * @param useCurrentLocation 現在地検索ON/OFF状態（親から受け取る）
 * @param setUseCurrentLocation 現在地検索ON/OFF切り替え関数（親から受け取る）
 */
type SearchFormProps = {
  keyword: string;
  setKeyword: (value: string) => void;
  onCurrentLocationChange?: (lat: number, lng: number) => void;
  useCurrentLocation: boolean;
  setUseCurrentLocation: (checked: boolean) => void;
  saltValue: number;
  setSaltValue: (value: number) => void;
};

const SearchForm: React.FC<SearchFormProps> = ({
  keyword,
  setKeyword,
  onCurrentLocationChange,
  useCurrentLocation,
  setUseCurrentLocation,
  saltValue,
  setSaltValue,
}) => {
  // 現在地取得処理
  React.useEffect(() => {
    if (useCurrentLocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            if (onCurrentLocationChange) {
              onCurrentLocationChange(latitude, longitude);
            }
          },
          (err) => {
            alert("現在地の取得に失敗しました: " + err.message);
          }
        );
      } else {
        alert("この端末・ブラウザは現在地取得に対応していません。");
      }
    }
  }, [useCurrentLocation, onCurrentLocationChange]);

  return (
    <form className="flex flex-col gap-4 w-full max-w-3xl mx-auto p-4 bg-white rounded shadow">
      {/* 住所や場所を入力＋検索ボタン 横並び */}
      <div className="flex flex-row gap-2 items-end">
        <div className="flex-1">
          {/* キーワード入力欄（店名・料理名で検索） */}
          <input
            type="text"
            className="w-full border rounded px-2 py-1"
            placeholder="店名・料理名で検索"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="flex-shrink-0">
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
