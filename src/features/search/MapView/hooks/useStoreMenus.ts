import { Menu } from "@/types/menu";
import { useEffect, useState } from "react";

/**
 * 指定したchainIdのメニュー一覧を取得するカスタムフック
 *
 * @param {string | null} chainId - 対象チェーンID
 * @returns {{ menus: Menu[] | null, error: string | null, loading: boolean }}
 */
export function useStoreMenus(chainId: string | null): {
  menus: Menu[] | null;
  error: string | null;
  loading: boolean;
} {
  const [menus, setMenus] = useState<Menu[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!chainId) {
      setMenus(null);
      setError(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setMenus(null);
    setError(null);
    fetch(`/api/menus?chain_id=${chainId}`)
      .then((res) => {
        if (!res.ok) throw new Error("メニュー情報の取得に失敗しました");
        return res.json();
      })
      .then((data) => {
        setMenus(data);
      })
      .catch((e) => {
        setError(e.message || "メニュー情報の取得に失敗しました");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [chainId]);

  return { menus, error, loading };
}
