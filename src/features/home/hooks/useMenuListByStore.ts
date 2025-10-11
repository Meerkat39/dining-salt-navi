import type { Menu } from "@/types/menu";
import { useEffect, useState } from "react";

/**
 * 選択店舗IDに応じてメニュー一覧を取得し、塩分量昇順で返すカスタムフック
 * @param {string|null} storeId - 選択店舗ID
 * @returns {Menu[]|null} menus - メニュー一覧（塩分量昇順）
 * @returns {boolean} loading - ローディング状態
 * @returns {string|null} error - エラー内容
 */
export function useMenuListByStore(storeId: string | null) {
  // メニュー一覧
  const [menus, setMenus] = useState<Menu[] | null>(null);
  // ローディング状態
  const [loading, setLoading] = useState(false);
  // エラー内容
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 店舗未選択時は初期化
    if (!storeId) {
      setMenus(null);
      setLoading(false);
      setError(null);
      return;
    }
    // ローディング開始・エラー初期化
    setLoading(true);
    setError(null);
    // メニュー情報取得API呼び出し
    fetch(`/api/menus?store_id=${storeId}`)
      .then((res) => {
        // レスポンス異常時はエラー
        if (!res.ok) throw new Error("メニュー情報の取得に失敗しました");
        return res.json();
      })
      .then((data: Menu[]) => {
        // mainのみ抽出し、塩分量昇順でソート
        const mainMenus = data.filter((menu) => menu.type === "main");
        setMenus(
          mainMenus.sort((a, b) => a.saltEquivalent_g - b.saltEquivalent_g)
        );
      })
      .catch((e) => {
        // エラー内容をセット
        setError(e.message || "メニュー情報の取得に失敗しました");
      })
      .finally(() => {
        // ローディング終了
        setLoading(false);
      });
  }, [storeId]);

  return { menus, loading, error };
}
