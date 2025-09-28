import type { Store } from "@/types/store";
import React, { useState } from "react";
import InfoWindow from "./InfoWindow";
import { StoreInfoWindowFrame } from "./StoreInfoWindowFrame";

// デバッグ用ダミーストア
const dummyStore: Store = {
  id: "debug-store-1",
  name: "デバッグ店舗",
  lat: 35.681236,
  lng: 139.767125,
  chain_id: "debug-chain-1",
  address: "東京都千代田区丸の内1-1-1",
  created_at: "2025-01-01T00:00:00Z",
  updated_at: "2025-01-01T00:00:00Z",
};

// デバッグ用ダミーメニュー
const dummyMenus = [
  {
    id: "1",
    chain_id: "debug-chain-1",
    name: "メニューA",
    salt: 2.5,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
  },
  {
    id: "2",
    chain_id: "debug-chain-1",
    name: "メニューB",
    salt: 3.1,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
  },
];

/**
 * StoreInfoWindowFrameの3パターン（エラー/ローディング/成功）を切り替えて確認できるデバッグ用コンポーネント
 */
export const StoreInfoWindowDebug: React.FC = () => {
  const [pattern, setPattern] = useState<"error" | "loading" | "success">(
    "error"
  );

  return (
    <div className="relative space-y-4">
      <div className="flex gap-2 mb-2">
        <button
          className="px-2 py-1 border rounded"
          onClick={() => setPattern("error")}
        >
          エラー
        </button>
        <button
          className="px-2 py-1 border rounded"
          onClick={() => setPattern("loading")}
        >
          ローディング
        </button>
        <button
          className="px-2 py-1 border rounded"
          onClick={() => setPattern("success")}
        >
          成功
        </button>
      </div>
      {pattern === "error" && (
        <StoreInfoWindowFrame store={dummyStore} onClose={() => {}}>
          <div className="text-red-500">
            メニュー情報の取得に失敗しました（デバッグ表示）
          </div>
        </StoreInfoWindowFrame>
      )}
      {pattern === "loading" && (
        <StoreInfoWindowFrame store={dummyStore} onClose={() => {}}>
          <div>メニュー情報を取得中...（デバッグ表示）</div>
        </StoreInfoWindowFrame>
      )}
      {pattern === "success" && (
        <InfoWindow
          store={dummyStore}
          menus={dummyMenus}
          omittedCount={0}
          onClose={() => {}}
        />
      )}
    </div>
  );
};
