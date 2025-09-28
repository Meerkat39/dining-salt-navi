import React from "react";

/**
 * エラー・フィードバックUIギャラリー
 * 各種エラー・通知・フィードバックパターンをまとめて一覧表示
 */
export const ErrorFeedbackGallery: React.FC = () => (
  <div className="space-y-6 p-4 bg-gray-50">
    {/* 入力バリデーションエラー */}
    <div className="p-3 border-l-4 border-red-500 bg-white">
      <div className="font-bold text-red-600">入力エラー</div>
      <div className="text-sm">
        必須項目が未入力です。すべての項目を入力してください。
      </div>
    </div>
    {/* 形式不正エラー */}
    <div className="p-3 border-l-4 border-red-500 bg-white">
      <div className="font-bold text-red-600">入力エラー</div>
      <div className="text-sm">メールアドレスの形式が正しくありません。</div>
    </div>
    {/* API通信エラー */}
    <div className="p-3 border-l-4 border-orange-500 bg-white">
      <div className="font-bold text-orange-600">通信エラー</div>
      <div className="text-sm">
        サーバーとの通信に失敗しました。ネットワーク環境をご確認ください。
      </div>
      <button className="mt-2 px-3 py-1 bg-orange-100 rounded text-orange-700">
        再試行
      </button>
    </div>
    {/* 検索結果0件 */}
    <div className="p-3 border-l-4 border-blue-500 bg-white">
      <div className="font-bold text-blue-600">検索結果なし</div>
      <div className="text-sm">
        条件に一致する店舗・メニューは見つかりませんでした。
      </div>
    </div>
    {/* 現在地取得失敗 */}
    <div className="p-3 border-l-4 border-yellow-500 bg-white">
      <div className="font-bold text-yellow-600">現在地取得エラー</div>
      <div className="text-sm">
        位置情報の取得に失敗しました。ブラウザの設定をご確認ください。
      </div>
    </div>
    {/* Google Mapロード失敗 */}
    <div className="p-3 border-l-4 border-gray-500 bg-white">
      <div className="font-bold text-gray-700">
        地図の読み込みに失敗しました
      </div>
      <div className="text-sm">
        Google Mapの表示に失敗しました。ページを再読み込みしてください。
      </div>
    </div>
    {/* 多重リクエスト警告 */}
    <div className="p-3 border-l-4 border-yellow-500 bg-white">
      <div className="font-bold text-yellow-600">リクエストが多すぎます</div>
      <div className="text-sm">しばらく待ってから再度お試しください。</div>
    </div>
    {/* トースト通知（成功） */}
    <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded shadow">
      保存が完了しました
    </div>
    {/* トースト通知（失敗） */}
    <div className="inline-block px-4 py-2 bg-red-100 text-red-800 rounded shadow">
      保存に失敗しました
    </div>
    {/* アクセシビリティ例 */}
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
  </div>
);

export default ErrorFeedbackGallery;
