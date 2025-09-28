import type { Store } from "@/types/store";
import React from "react";

/**
 * 店舗情報ウィンドウの共通フレーム
 *
 * @param {object} props
 * @param {Store} props.store - 店舗情報
 * @param {React.ReactNode} props.children - 中央に表示する内容（エラー/ローディング/メニューリスト等）
 * @param {() => void} props.onClose - 閉じるボタン押下時のコールバック
 */
export function StoreInfoWindowFrame({
  store,
  children,
  onClose,
}: {
  store: Store;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="absolute bg-white border rounded shadow p-2 text-xs left-8 top-0 z-10">
      <div className="font-bold mb-1">{store.name}</div>
      {children}
      <div>緯度: {store.lat}</div>
      <div>経度: {store.lng}</div>
      <button className="text-blue-500 mt-1" onClick={onClose}>
        閉じる
      </button>
    </div>
  );
}
