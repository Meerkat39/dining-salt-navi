"use client";
import React, { useState } from "react";
import AddressInput from "./AddressInput";
import CurrentLocationToggle from "./CurrentLocationSearchButton";
import SaltFilter from "./SaltFilter";
import SearchButton from "./SearchButton";

/**
 * 検索条件フォーム（SearchForm）
 * - エリア名・駅名・住所入力、現在地から検索トグル、塩分量フィルタ、検索ボタンで構成
 * - 各子コンポーネントに状態・propsを分割して管理
 * - UI設計・UX要件に基づき、状態連携・無効化制御も実装
 */

const SearchForm: React.FC = () => {
  // 入力状態
  const [address, setAddress] = useState("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [saltValue, setSaltValue] = useState(2.5); // デフォルト値は2.5g

  return (
    <form className="flex flex-col gap-4 w-full max-w-3xl mx-auto p-4 bg-white rounded shadow">
      {/* 住所や場所を入力＋検索ボタン 横並び */}
      <div className="flex flex-row gap-2 items-end">
        <div className="flex-1">
          <AddressInput
            value={address}
            onChange={setAddress}
            disabled={useCurrentLocation}
          />
        </div>
        <div className="flex-shrink-0">
          <SearchButton />
        </div>
      </div>

      {/* 現在地から検索（中央寄せ） */}
      <div className="flex justify-center">
        <CurrentLocationToggle
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
