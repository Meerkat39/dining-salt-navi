import React from "react";

/**
 * アプリ共通ヘッダー
 * - サイトタイトル、ナビゲーション等を表示
 */
const Header: React.FC = () => {
  return (
    <header className="w-full bg-blue-600 text-white py-4 shadow">
      <div className="container mx-auto flex items-center justify-between px-4">
        <h1 className="text-xl font-bold tracking-wide">外食塩分ナビ</h1>
        {/* 必要に応じてナビゲーションやロゴ等を追加 */}
      </div>
    </header>
  );
};

export default Header;
