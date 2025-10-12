import React from "react";

/**
 * アプリ共通フッター
 * - 著作権表示やリンク等を表示
 */
const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-100 text-gray-600 py-4 mt-8 border-t">
      <div className="container mx-auto text-center text-sm">
        <nav className="mb-2 flex justify-center gap-6">
          <a href="/about" className="hover:underline">
            About
          </a>
          <a href="/release-notes" className="hover:underline">
            Release Notes
          </a>
          <a href="/disclaimer" className="hover:underline">
            Disclaimer
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </nav>
        {/* 著作権表示は不要のため削除 */}
      </div>
    </footer>
  );
};

export default Footer;
