import LoadingOverlay from "@/features/search/MapView/components/LoadingOverlay";
import MenuResultList from "@/features/search/MenuResultList/components/MenuResultList";
import SearchForm from "@/features/search/SearchForm/components/SearchForm";
import { useState } from "react";

export default {
  title: "features/home/Home",
};

type HomeState =
  | "normal"
  | "area-loading"
  | "area-error"
  | "location-loading"
  | "location-error"
  | "filtered-loading"
  | "gmaps-error"
  | "gmaps-loading";

const DummyMapBox = () => (
  <div
    style={{
      width: "100%",
      height: "220px",
      background: "#eee",
      borderRadius: 8,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <span style={{ color: "#888" }}>Google Map（ダミー）</span>
  </div>
);

const HomeStory = () => {
  const [areaName, setAreaName] = useState("");
  const [saltValue, setSaltValue] = useState(2.5);
  // 仮のメニューデータ（Menu型に合わせる）
  const dummyMenus = [
    {
      id: "1",
      chain_id: "dummy",
      name: "メニューA",
      saltEquivalent_g: 2.3,
      type: "main" as const,
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-01-01T00:00:00Z",
    },
    {
      id: "2",
      chain_id: "dummy",
      name: "メニューB",
      saltEquivalent_g: 1.8,
      type: "main" as const,
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-01-01T00:00:00Z",
    },
  ];
  // SearchFormの必須propsをダミーで渡す
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const setCenter = () => {};
  const setZoom = () => {};
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  return (
    <main className="p-4 flex flex-col items-center gap-8">
      <div className="w-full max-w-3xl mx-auto">
        <SearchForm
          areaName={areaName}
          setAreaName={setAreaName}
          saltValue={saltValue}
          setSaltValue={setSaltValue}
          useCurrentLocation={useCurrentLocation}
          setUseCurrentLocation={setUseCurrentLocation}
          setCenter={setCenter}
          setZoom={setZoom}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
          isLocating={isLocating}
          setIsLocating={setIsLocating}
        />
      </div>
      <div className="w-full max-w-3xl mx-auto flex flex-row gap-4 min-h-[220px]">
        <div className="w-4/6">
          <DummyMapBox />
        </div>
        <div className="w-2/6 overflow-y-auto">
          <MenuResultList menus={dummyMenus} saltLimit={saltValue} />
        </div>
      </div>
    </main>
  );
};

const HomeWrapper = ({ state }: { state: HomeState }) => {
  // 共通ダミーデータ
  const [areaName, setAreaName] = useState("");
  const [saltValue, setSaltValue] = useState(2.5);
  const dummyMenus = [
    {
      id: "1",
      chain_id: "dummy",
      name: "メニューA",
      saltEquivalent_g: 2.3,
      type: "main" as const,
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-01-01T00:00:00Z",
    },
    {
      id: "2",
      chain_id: "dummy",
      name: "メニューB",
      saltEquivalent_g: 1.8,
      type: "main" as const,
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-01-01T00:00:00Z",
    },
  ];
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const setCenter = () => {};
  const setZoom = () => {};
  const [, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  // エリア検索ローディング
  if (state === "area-loading") {
    return (
      <main className="p-4 flex flex-col items-center gap-8">
        <div className="w-full max-w-3xl mx-auto">
          <SearchForm
            areaName={areaName}
            setAreaName={setAreaName}
            saltValue={saltValue}
            setSaltValue={setSaltValue}
            useCurrentLocation={useCurrentLocation}
            setUseCurrentLocation={setUseCurrentLocation}
            setCenter={setCenter}
            setZoom={setZoom}
            isSearching={true} // ローディング状態
            setIsSearching={setIsSearching}
            isLocating={isLocating}
            setIsLocating={setIsLocating}
          />
        </div>
        <div className="w-full max-w-3xl mx-auto flex flex-row gap-4 min-h-[220px]">
          <div className="w-4/6">
            {/* MapViewのローディング再現（地図部分のみLoadingOverlay表示） */}
            <div className="relative w-full h-[220px] rounded bg-gray-200">
              <DummyMapBox />
              <LoadingOverlay />
            </div>
          </div>
          <div className="w-2/6 overflow-y-auto">
            <MenuResultList menus={dummyMenus} saltLimit={saltValue} />
          </div>
        </div>
      </main>
    );
  }

  // 現在地取得エラー
  if (state === "location-error") {
    // 現在地取得ボタン押下時にalertでエラーを表示するダミー関数
    const handleLocationError = () => {
      window.alert("現在地の取得に失敗しました（ダミー）");
    };
    return (
      <main className="p-4 flex flex-col items-center gap-8">
        <div className="w-full max-w-3xl mx-auto">
          {/* SearchFormの下に現在地取得ボタンをラップしてエラー再現 */}
          <SearchForm
            areaName={areaName}
            setAreaName={setAreaName}
            saltValue={saltValue}
            setSaltValue={setSaltValue}
            useCurrentLocation={true}
            setUseCurrentLocation={setUseCurrentLocation}
            setCenter={setCenter}
            setZoom={setZoom}
            isSearching={false}
            setIsSearching={setIsSearching}
            isLocating={false}
            setIsLocating={setIsLocating}
          />
          <div className="flex justify-center mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={handleLocationError}
            >
              現在地取得（エラー再現）
            </button>
          </div>
        </div>
        <div className="w-full max-w-3xl mx-auto flex flex-row gap-4 min-h-[220px]">
          <div className="w-4/6">
            <DummyMapBox />
          </div>
          <div className="w-2/6 overflow-y-auto">
            <MenuResultList menus={dummyMenus} saltLimit={saltValue} />
          </div>
        </div>
      </main>
    );
  }

  // 現在地取得ローディング
  if (state === "location-loading") {
    return (
      <main className="p-4 flex flex-col items-center gap-8">
        <div className="w-full max-w-3xl mx-auto">
          <SearchForm
            areaName={areaName}
            setAreaName={setAreaName}
            saltValue={saltValue}
            setSaltValue={setSaltValue}
            useCurrentLocation={true} // 現在地取得モードON
            setUseCurrentLocation={setUseCurrentLocation}
            setCenter={setCenter}
            setZoom={setZoom}
            isSearching={false}
            setIsSearching={setIsSearching}
            isLocating={true} // ローディング状態
            setIsLocating={setIsLocating}
          />
        </div>
        <div className="w-full max-w-3xl mx-auto flex flex-row gap-4 min-h-[220px]">
          <div className="w-4/6">
            {/* MapViewのローディング再現（地図部分のみLoadingOverlay表示） */}
            <div className="relative w-full h-[220px] rounded bg-gray-200">
              <DummyMapBox />
              <LoadingOverlay />
            </div>
          </div>
          <div className="w-2/6 overflow-y-auto">
            <MenuResultList menus={dummyMenus} saltLimit={saltValue} />
          </div>
        </div>
      </main>
    );
  }

  // エリア検索エラー
  if (state === "area-error") {
    // 検索ボタン押下時にalertでエラーを表示するダミー関数
    const handleSearchError = (e: React.FormEvent) => {
      e.preventDefault();
      window.alert("エリアの座標取得に失敗しました（ダミー）");
    };
    return (
      <main className="p-4 flex flex-col items-center gap-8">
        <div className="w-full max-w-3xl mx-auto">
          <form onSubmit={handleSearchError}>
            <SearchForm
              areaName={areaName}
              setAreaName={setAreaName}
              saltValue={saltValue}
              setSaltValue={setSaltValue}
              useCurrentLocation={useCurrentLocation}
              setUseCurrentLocation={setUseCurrentLocation}
              setCenter={setCenter}
              setZoom={setZoom}
              isSearching={false}
              setIsSearching={setIsSearching}
              isLocating={isLocating}
              setIsLocating={setIsLocating}
            />
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              検索（エラー再現）
            </button>
          </form>
        </div>
        <div className="w-full max-w-3xl mx-auto flex flex-row gap-4 min-h-[220px]">
          <div className="w-4/6">
            <DummyMapBox />
          </div>
          <div className="w-2/6 overflow-y-auto">
            <MenuResultList menus={dummyMenus} saltLimit={saltValue} />
          </div>
        </div>
      </main>
    );
  }

  // useFilteredStoresローディング
  if (state === "filtered-loading") {
    return (
      <main className="p-4 flex flex-col items-center gap-8">
        <div className="w-full max-w-3xl mx-auto">
          <SearchForm
            areaName={areaName}
            setAreaName={setAreaName}
            saltValue={saltValue}
            setSaltValue={setSaltValue}
            useCurrentLocation={useCurrentLocation}
            setUseCurrentLocation={setUseCurrentLocation}
            setCenter={setCenter}
            setZoom={setZoom}
            isSearching={false}
            setIsSearching={setIsSearching}
            isLocating={false}
            setIsLocating={setIsLocating}
          />
        </div>
        <div className="w-full max-w-3xl mx-auto flex flex-row gap-4 min-h-[220px]">
          <div className="w-4/6">
            {/* 地図部分は通常表示（ダミーMapBoxのみ） */}
            <DummyMapBox />
          </div>
          <div className="w-2/6 overflow-y-auto">
            {/* MenuResultListのローディングUIを直接再現 */}
            <div className="w-full bg-white rounded shadow p-4 text-gray-500 text-center">
              メニュー検索中...
            </div>
          </div>
        </div>
      </main>
    );
  }
  // Google Maps APIロードエラー
  if (state === "gmaps-error") {
    return (
      <main className="p-4 flex flex-col items-center gap-8">
        <div className="w-full max-w-3xl mx-auto">
          <SearchForm
            areaName={areaName}
            setAreaName={setAreaName}
            saltValue={saltValue}
            setSaltValue={setSaltValue}
            useCurrentLocation={useCurrentLocation}
            setUseCurrentLocation={setUseCurrentLocation}
            setCenter={setCenter}
            setZoom={setZoom}
            isSearching={false}
            setIsSearching={setIsSearching}
            isLocating={false}
            setIsLocating={setIsLocating}
          />
        </div>
        <div className="w-full max-w-3xl mx-auto flex flex-row gap-4 min-h-[220px]">
          <div className="w-4/6 flex items-center justify-center">
            {/* 本番実装通りMapLoadErrorを表示 */}
            <div className="w-full h-[220px]">
              <div className="w-full h-96 flex items-center justify-center text-red-500">
                地図の読み込みに失敗しました
              </div>
            </div>
          </div>
          <div className="w-2/6 overflow-y-auto">
            <MenuResultList menus={dummyMenus} saltLimit={saltValue} />
          </div>
        </div>
      </main>
    );
  }
  // Google Maps API未ロード
  if (state === "gmaps-loading") {
    return (
      <main className="p-4 flex flex-col items-center gap-8">
        <div className="w-full max-w-3xl mx-auto">
          <SearchForm
            areaName={areaName}
            setAreaName={setAreaName}
            saltValue={saltValue}
            setSaltValue={setSaltValue}
            useCurrentLocation={useCurrentLocation}
            setUseCurrentLocation={setUseCurrentLocation}
            setCenter={setCenter}
            setZoom={setZoom}
            isSearching={false}
            setIsSearching={setIsSearching}
            isLocating={false}
            setIsLocating={setIsLocating}
          />
        </div>
        <div className="w-full max-w-3xl mx-auto flex flex-row gap-4 min-h-[220px]">
          <div className="w-4/6 flex items-center justify-center">
            {/* 本番実装通りMapLoadingを表示 */}
            <div className="w-full h-[220px]">
              <div className="w-full h-96 flex items-center justify-center">
                Loading Map...
              </div>
            </div>
          </div>
          <div className="w-2/6 overflow-y-auto">
            <MenuResultList menus={dummyMenus} saltLimit={saltValue} />
          </div>
        </div>
      </main>
    );
  }

  // 通常状態はHomeStory（Google Mapはダミー箱）
  return <HomeStory />;
};

export const StateTabs = () => {
  const [tab, setTab] = useState<HomeState>("normal");
  const tabList: { key: HomeState; label: string }[] = [
    { key: "normal", label: "正常" },
    { key: "area-loading", label: "エリア検索ローディング" },
    { key: "area-error", label: "エリア検索エラー" },
    { key: "location-loading", label: "現在地取得ローディング" },
    { key: "location-error", label: "現在地取得エラー" },
    { key: "filtered-loading", label: "useFilteredStoresローディング" },
    { key: "gmaps-error", label: "Google Maps APIロードエラー" },
    { key: "gmaps-loading", label: "Google Maps API未ロード" },
  ];
  return (
    <div>
      <div
        style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}
      >
        {tabList.map((tabItem) => (
          <button
            key={tabItem.key}
            style={{
              padding: "4px 12px",
              borderRadius: 4,
              background: tab === tabItem.key ? "#e0e7ff" : "#f3f4f6",
              marginBottom: 4,
            }}
            onClick={() => setTab(tabItem.key)}
          >
            {tabItem.label}
          </button>
        ))}
      </div>
      <HomeWrapper state={tab} />
    </div>
  );
};
