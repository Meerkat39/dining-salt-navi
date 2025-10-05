import { StoreInfoWindowFrame } from "@/features/search/MapView/components/StoreInfoWindowFrame";
import { MapLoadError } from "@/features/search/MapView/utils/MapViewUtils";
import SearchForm from "@/features/search/SearchForm/components/SearchForm";
import NoSearchResult from "@/features/search/SearchResultList/components/NoSearchResult";
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

const errorCases = [
  {
    key: "no-result",
    label: "検索結果0件",
    stores: [],
    formError: undefined,
    mapError: undefined,
    mapInfoError: undefined,
    apiError: undefined,
  },
  {
    key: "validation-error",
    label: "バリデーション・入力エラー（必須項目未入力）",
    stores: dummyStores,
    formError: "必須項目が未入力です。すべての項目を入力してください。",
    mapError: undefined,
    mapInfoError: undefined,
    apiError: undefined,
  },
  {
    key: "api-error",
    label: "API通信エラー（地図下部に表示）",
    stores: dummyStores,
    formError: undefined,
    mapError: undefined,
    mapInfoError: undefined,
    apiError:
      "サーバーとの通信に失敗しました。ネットワーク環境をご確認ください。",
  },
  {
    key: "map-load-error",
    label: "Google Mapロード失敗",
    stores: dummyStores,
    formError: undefined,
    mapError: "地図の読み込みに失敗しました",
    mapInfoError: undefined,
    apiError: undefined,
  },
  {
    key: "geolocation-error",
    label: "現在地取得失敗（フォーム上部）",
    stores: dummyStores,
    formError: "現在地の取得に失敗しました: サンプルエラー",
    mapError: undefined,
    mapInfoError: undefined,
    apiError: undefined,
  },
];

const ErrorListPageLikeStory: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const c = errorCases[current];
  const [areaName, setAreaName] = useState("");
  const [saltValue, setSaltValue] = useState(2.5);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const handleStoreItemClick = (id: string) => setSelectedStoreId(id);
  const handleCurrentLocationChange = () => {};
  const setCenter = () => {};

  return (
    <main className="p-4 flex flex-col items-center gap-8 min-h-screen bg-gray-50">
      <div className="flex flex-wrap gap-2 mb-2">
        {errorCases.map((f, i) => (
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
      {/* 検索フォーム（本物）＋フォームエラー */}
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
        {c.formError && (
          <div className="p-2 border-l-4 border-red-500 bg-red-50 text-red-700 mb-2 mt-2">
            {c.formError}
          </div>
        )}
      </div>
      {/* デュアルペイン：MapView（左：本番UI再現）＋SearchResultList（右：本物） */}
      <div className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1700px] mx-auto flex flex-row gap-4 h-[70vh] min-h-[400px]">
        <div className="w-4/6 h-full flex flex-col">
          {/* MapViewの本番エラー表示ロジックを再現 */}
          <div className="flex-1 flex items-center justify-center">
            {c.mapError === "地図の読み込みに失敗しました" ? (
              <MapLoadError />
            ) : c.mapInfoError ? (
              <div className="w-full h-full flex items-center justify-center">
                <StoreInfoWindowFrame store={dummyStores[0]} onClose={() => {}}>
                  <div className="text-red-500">{c.mapInfoError}</div>
                </StoreInfoWindowFrame>
              </div>
            ) : (
              <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center rounded relative">
                <div className="absolute top-2 left-2 text-xs text-gray-500">
                  Google Map（ダミー）
                </div>
              </div>
            )}
          </div>
          {/* API通信エラーは地図下部にオレンジ帯で表示 */}
          {c.apiError && (
            <div className="p-2 border-l-4 border-orange-500 bg-orange-50 text-orange-700 mt-2">
              {c.apiError}
            </div>
          )}
        </div>
        <div className="w-2/6 h-full overflow-y-auto">
          {/* 検索結果0件はNoSearchResult、本物ロジックで再現 */}
          {c.stores.length === 0 ? (
            <NoSearchResult />
          ) : (
            <SearchResultList
              stores={c.stores}
              onStoreItemClick={handleStoreItemClick}
              selectedStoreId={selectedStoreId}
            />
          )}
        </div>
      </div>
    </main>
  );
};

const meta: Meta<typeof ErrorListPageLikeStory> = {
  component: ErrorListPageLikeStory,
  title: "Common/ErrorListPageLikeStory",
};
export default meta;

export const Default: StoryObj<typeof ErrorListPageLikeStory> = {};
