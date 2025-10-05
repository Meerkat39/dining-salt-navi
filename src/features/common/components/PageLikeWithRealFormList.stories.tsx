import SearchForm from "@/features/search/SearchForm/components/SearchForm";
import SearchResultList from "@/features/search/SearchResultList/components/SearchResultList";
import type { Meta, StoryObj } from "@storybook/nextjs";
import React, { useState } from "react";

// --- ダミーデータ ---
const dummyStores = [
  {
    id: "1",
    name: "店舗A",
    lat: 35.68,
    lng: 139.76,
    chain_id: "c1",
    address: "東京都千代田区",
    place_id: "debug-place-id-1",
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "店舗B",
    lat: 35.69,
    lng: 139.77,
    chain_id: "c2",
    address: "東京都中央区",
    place_id: "debug-place-id-2",
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
  },
];

const feedbackCases = [
  {
    key: "normal",
    label: "通常（エラーなし）",
    stores: dummyStores,
    formError: undefined,
  },
  {
    key: "validation-required",
    label: "入力バリデーションエラー（必須未入力）",
    stores: dummyStores,
    formError: "必須項目が未入力です。すべての項目を入力してください。",
  },
  {
    key: "validation-format",
    label: "入力バリデーションエラー（形式不正）",
    stores: dummyStores,
    formError: "メールアドレスの形式が正しくありません。",
  },
  {
    key: "no-result",
    label: "検索結果0件",
    stores: [],
    formError: undefined,
  },
];

const PageLikeWithRealFormList: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const c = feedbackCases[current];
  const [areaName, setAreaName] = useState("");
  const [saltValue, setSaltValue] = useState(2.5);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const handleStoreItemClick = (id: string) => setSelectedStoreId(id);
  const handleCurrentLocationChange = () => {};
  const setCenter = () => {};
  const setZoom = () => {};

  return (
    <main className="p-4 flex flex-col items-center gap-8 min-h-screen bg-gray-50">
      <div className="flex flex-wrap gap-2 mb-2">
        {feedbackCases.map((f, i) => (
          <button
            key={f.key}
            className={`px-2 py-1 border rounded text-xs ${
              i === current ? "bg-blue-100 border-blue-400" : "bg-white"
            }`}
            onClick={() => setCurrent(i)}
          >
            {f.label}
          </button>
        ))}
      </div>
      {/* 検索フォーム（本物） */}
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
          setZoom={setZoom}
        />
        {/* エラー表示をフォーム下に追加 */}
        {c.formError && (
          <div className="p-2 border-l-4 border-red-500 bg-red-50 text-red-700 mb-2 mt-2">
            {c.formError}
          </div>
        )}
      </div>
      {/* デュアルペイン：MapView（左：ダミー）＋SearchResultList（右：本物） */}
      <div className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1700px] mx-auto flex flex-row gap-4 h-[70vh] min-h-[400px]">
        <div className="w-4/6 h-full">
          <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center rounded relative">
            <div className="absolute top-2 left-2 text-xs text-gray-500">
              Google Map（ダミー）
            </div>
            {/* 必要ならここにエラーやローディングの仮表示も追加可 */}
          </div>
        </div>
        <div className="w-2/6 h-full overflow-y-auto">
          <SearchResultList
            stores={c.stores}
            onStoreItemClick={handleStoreItemClick}
            selectedStoreId={selectedStoreId}
          />
        </div>
      </div>
    </main>
  );
};

const meta: Meta<typeof PageLikeWithRealFormList> = {
  component: PageLikeWithRealFormList,
  title: "Common/PageLikeWithRealFormList",
};
export default meta;

export const Default: StoryObj<typeof PageLikeWithRealFormList> = {};
