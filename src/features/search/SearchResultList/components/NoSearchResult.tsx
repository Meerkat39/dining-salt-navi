import React from "react";

/**
 * 検索結果0件表示用サブコンポーネント
 */
const NoSearchResult: React.FC = () => {
  return (
    <div className="w-full max-w-xl mx-auto p-4 text-center text-gray-500 border rounded bg-white shadow">
      検索結果がありません
    </div>
  );
};

export default NoSearchResult;
