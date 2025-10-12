"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

/**
 * アプリ共通ヘッダー
 * - サイトタイトル、ナビゲーション等を表示
 */
const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="w-full bg-blue-600 text-white py-4 shadow">
      <div className="w-full flex items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="block">
            <Image
              src="/images/icon.png"
              alt="ロゴ"
              width={48}
              height={48}
              className="rounded"
            />
          </Link>
          <h1 className="text-xl font-bold tracking-wide">
            <Link
              href="/"
              className="hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded"
            >
              外食塩分ナビ
            </Link>
          </h1>
        </div>
        {/* PCナビゲーション */}
        <nav className="hidden md:flex gap-6 text-base font-medium">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/release-notes" className="hover:underline">
            Release Notes
          </Link>
          <Link href="/disclaimer" className="hover:underline">
            Disclaimer
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>
        {/* ハンバーガーメニュー（SP） */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
          aria-label="メニューを開く"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>
      </div>
      {/* ドロワーメニュー（SP） */}
      {menuOpen && (
        <nav className="md:hidden bg-blue-600 text-white px-8 py-4">
          <ul className="flex flex-col gap-4 text-lg font-medium">
            <li>
              <Link
                href="/about"
                className="hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/release-notes"
                className="hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Release Notes
              </Link>
            </li>
            <li>
              <Link
                href="/disclaimer"
                className="hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Disclaimer
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
