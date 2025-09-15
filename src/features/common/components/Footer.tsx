import React from "react";

/**
 * アプリ共通フッター
 * - 著作権表示やリンク等を表示
 */
const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-100 text-gray-600 py-4 mt-8 border-t">
      <div className="container mx-auto text-center text-sm">
        &copy; {new Date().getFullYear()} 外食減塩ナビ All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
