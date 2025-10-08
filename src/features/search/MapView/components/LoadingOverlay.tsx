import React from "react";

/**
 * 地図用ローディングオーバーレイ
 */
const LoadingOverlay: React.FC = () => (
  // 地図画面全体を覆うローディングオーバーレイ
  <div className="absolute inset-0 z-20 bg-black/50 flex items-center justify-center pointer-events-none">
    <div className="flex flex-col items-center gap-2">
      {/* 回転アニメーション付きローディングアイコン */}
      <svg
        className="animate-spin h-8 w-8 text-blue-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        />
      </svg>
      {/* ローディングメッセージ */}
      <span className="text-white text-lg font-semibold drop-shadow">
        位置情報・エリア取得中...
      </span>
    </div>
  </div>
);

export default LoadingOverlay;
