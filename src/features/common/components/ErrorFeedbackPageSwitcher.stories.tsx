import type { Meta, StoryObj } from "@storybook/nextjs";
import React, { useState } from "react";

/**
 * 各種エラー・フィードバックUIをページ切り替えで確認できるStorybook用コンポーネント
 */
const feedbackCases = [
  {
    key: "validation-required",
    label: "入力バリデーションエラー（必須未入力）",
    element: (
      <div className="p-3 border-l-4 border-red-500 bg-white">
        <div className="font-bold text-red-600">入力エラー</div>
        <div className="text-sm">
          必須項目が未入力です。すべての項目を入力してください。
        </div>
      </div>
    ),
  },
  {
    key: "validation-format",
    label: "入力バリデーションエラー（形式不正）",
    element: (
      <div className="p-3 border-l-4 border-red-500 bg-white">
        <div className="font-bold text-red-600">入力エラー</div>
        <div className="text-sm">メールアドレスの形式が正しくありません。</div>
      </div>
    ),
  },
  {
    key: "api-error",
    label: "API通信エラー",
    element: (
      <div className="p-3 border-l-4 border-orange-500 bg-white">
        <div className="font-bold text-orange-600">通信エラー</div>
        <div className="text-sm">
          サーバーとの通信に失敗しました。ネットワーク環境をご確認ください。
        </div>
        <button className="mt-2 px-3 py-1 bg-orange-100 rounded text-orange-700">
          再試行
        </button>
      </div>
    ),
  },
  {
    key: "no-result",
    label: "検索結果0件",
    element: (
      <div className="p-3 border-l-4 border-blue-500 bg-white">
        <div className="font-bold text-blue-600">検索結果なし</div>
        <div className="text-sm">
          条件に一致する店舗・メニューは見つかりませんでした。
        </div>
      </div>
    ),
  },
  {
    key: "geolocation-error",
    label: "現在地取得失敗",
    element: (
      <div className="p-3 border-l-4 border-yellow-500 bg-white">
        <div className="font-bold text-yellow-600">現在地取得エラー</div>
        <div className="text-sm">
          位置情報の取得に失敗しました。ブラウザの設定をご確認ください。
        </div>
      </div>
    ),
  },
  {
    key: "map-error",
    label: "Google Mapロード失敗",
    element: (
      <div className="p-3 border-l-4 border-gray-500 bg-white">
        <div className="font-bold text-gray-700">
          地図の読み込みに失敗しました
        </div>
        <div className="text-sm">
          Google Mapの表示に失敗しました。ページを再読み込みしてください。
        </div>
      </div>
    ),
  },
  {
    key: "too-many-requests",
    label: "多重リクエスト警告",
    element: (
      <div className="p-3 border-l-4 border-yellow-500 bg-white">
        <div className="font-bold text-yellow-600">リクエストが多すぎます</div>
        <div className="text-sm">しばらく待ってから再度お試しください。</div>
      </div>
    ),
  },
  {
    key: "unexpected-error",
    label: "予期せぬエラー（アクセシビリティ考慮）",
    element: (
      <div
        className="p-3 border-l-4 border-red-500 bg-white flex items-center"
        aria-live="polite"
      >
        <svg
          className="w-5 h-5 text-red-500 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z"
          />
        </svg>
        <span className="text-sm">
          予期せぬエラーが発生しました。サポートまでご連絡ください。
        </span>
      </div>
    ),
  },
  {
    key: "storeinfo-error",
    label: "StoreInfoWindowのメニュー取得エラー",
    element: (
      <div className="p-2 text-xs text-red-500 border rounded bg-white">
        メニュー情報の取得に失敗しました（デバッグ表示）
      </div>
    ),
  },
  {
    key: "storeinfo-loading",
    label: "StoreInfoWindowのローディング状態",
    element: (
      <div className="p-2 text-xs border rounded bg-white">
        メニュー情報を取得中...（デバッグ表示）
      </div>
    ),
  },
];

const ErrorFeedbackPageSwitcher: React.FC = () => {
  const [current, setCurrent] = useState(0);
  return (
    <div className="max-w-md mx-auto p-6 bg-gray-50 min-h-[320px] flex flex-col gap-4">
      <div className="flex flex-wrap gap-2 mb-2">
        {feedbackCases.map((c, i) => (
          <button
            key={c.key}
            className={`px-2 py-1 border rounded text-xs ${
              i === current ? "bg-blue-100 border-blue-400" : "bg-white"
            }`}
            onClick={() => setCurrent(i)}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="flex-1 flex items-center justify-center">
        {feedbackCases[current].element}
      </div>
    </div>
  );
};

const meta: Meta<typeof ErrorFeedbackPageSwitcher> = {
  component: ErrorFeedbackPageSwitcher,
  title: "Common/ErrorFeedbackPageSwitcher",
};
export default meta;

export const Default: StoryObj<typeof ErrorFeedbackPageSwitcher> = {};
