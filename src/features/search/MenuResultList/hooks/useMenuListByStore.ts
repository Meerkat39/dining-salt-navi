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
  const [menus, setMenus] = useState<Menu[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!storeId) {
      setMenus(null);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    fetch(`/api/menus?store_id=${storeId}`)
      .then((res) => {
        if (!res.ok) throw new Error("メニュー情報の取得に失敗しました");
        return res.json();
      })
      .then((data: Menu[]) => {
        // 塩分量昇順でソート
        setMenus(data.sort((a, b) => a.saltEquivalent_g - b.saltEquivalent_g));
      })
      .catch((e) => {
        setError(e.message || "メニュー情報の取得に失敗しました");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [storeId]);

  return { menus, loading, error };
}
