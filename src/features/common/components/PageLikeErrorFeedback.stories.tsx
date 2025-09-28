import type { Meta, StoryObj } from "@storybook/nextjs";
import React, { useState } from "react";

// --- エラー・フィードバックUIパターン ---
const feedbackCases = [
  {
    key: "validation-required",
    label: "入力バリデーションエラー（必須未入力）",
    formError: "必須項目が未入力です。すべての項目を入力してください。",
  },
  {
    key: "validation-format",
    label: "入力バリデーションエラー（形式不正）",
    formError: "メールアドレスの形式が正しくありません。",
  },
  {
    key: "api-error",
    label: "API通信エラー",
    mapError:
      "サーバーとの通信に失敗しました。ネットワーク環境をご確認ください。",
  },
  {
    key: "no-result",
    label: "検索結果0件",
    noResult: true,
  },
  {
    key: "geolocation-error",
    label: "現在地取得失敗",
    formError: "位置情報の取得に失敗しました。ブラウザの設定をご確認ください。",
  },
  {
    key: "map-error",
    label: "Google Mapロード失敗",
    mapError:
      "Google Mapの表示に失敗しました。ページを再読み込みしてください。",
  },
  {
    key: "too-many-requests",
    label: "多重リクエスト警告",
    formError: "リクエストが多すぎます。しばらく待ってから再度お試しください。",
  },
  {
    key: "unexpected-error",
    label: "予期せぬエラー（アクセシビリティ考慮）",
    mapError: "予期せぬエラーが発生しました。サポートまでご連絡ください。",
  },
  {
    key: "storeinfo-error",
    label: "StoreInfoWindowのメニュー取得エラー",
    mapInfoError: "メニュー情報の取得に失敗しました（デバッグ表示）",
  },
  {
    key: "storeinfo-loading",
    label: "StoreInfoWindowのローディング状態",
    mapInfoLoading: true,
  },
];

// --- 仮のMapView/ResultList/SearchForm ---
type DummyMapViewProps = {
  error?: string;
  infoError?: string;
  infoLoading?: boolean;
};
const DummyMapView = ({ error, infoError, infoLoading }: DummyMapViewProps) => (
  <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center rounded relative">
    <div className="absolute top-2 left-2 text-xs text-gray-500">
      Google Map（ダミー）
    </div>
    {error && (
      <div className="p-3 border-l-4 border-gray-500 bg-white mt-8">
        <div className="font-bold text-gray-700">{error}</div>
      </div>
    )}
    {infoError && (
      <div className="p-2 text-xs text-red-500 border rounded bg-white mt-4">
        {infoError}
      </div>
    )}
    {infoLoading && (
      <div className="p-2 text-xs border rounded bg-white mt-4">
        メニュー情報を取得中...（デバッグ表示）
      </div>
    )}
  </div>
);

type DummySearchFormProps = {
  error?: string;
};
const DummySearchForm = ({ error }: DummySearchFormProps) => (
  <div className="w-full bg-white border rounded p-4 mb-2">
    <div className="font-bold mb-2">検索フォーム（ダミー）</div>
    {error && (
      <div className="p-2 border-l-4 border-red-500 bg-red-50 text-red-700 mb-2">
        {error}
      </div>
    )}
    {/* 入力欄などは省略 */}
  </div>
);

type DummySearchResultListProps = {
  noResult?: boolean;
};
const DummySearchResultList = ({ noResult }: DummySearchResultListProps) => (
  <div className="w-full h-full bg-white border rounded p-4 overflow-y-auto">
    <div className="font-bold mb-2">検索結果リスト（ダミー）</div>
    {noResult ? (
      <div className="p-2 border-l-4 border-blue-500 bg-blue-50 text-blue-700">
        条件に一致する店舗・メニューは見つかりませんでした。
      </div>
    ) : (
      <ul className="text-sm text-gray-600">
        <li>店舗A</li>
        <li>店舗B</li>
        <li>店舗C</li>
      </ul>
    )}
  </div>
);

const PageLikeErrorFeedback: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const c = feedbackCases[current];
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
      {/* 検索フォーム */}
      <div className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1700px] mx-auto">
        <DummySearchForm error={c.formError} />
      </div>
      {/* デュアルペイン：MapView（左）＋SearchResultList（右） */}
      <div className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1700px] mx-auto flex flex-row gap-4 h-[70vh] min-h-[400px]">
        <div className="w-4/6 h-full">
          <DummyMapView
            error={c.mapError}
            infoError={c.mapInfoError}
            infoLoading={c.mapInfoLoading}
          />
        </div>
        <div className="w-2/6 h-full overflow-y-auto">
          <DummySearchResultList noResult={c.noResult} />
        </div>
      </div>
    </main>
  );
};

const meta: Meta<typeof PageLikeErrorFeedback> = {
  component: PageLikeErrorFeedback,
  title: "Common/PageLikeErrorFeedback",
};
export default meta;

export const Default: StoryObj<typeof PageLikeErrorFeedback> = {};
