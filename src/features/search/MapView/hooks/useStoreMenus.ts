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
    // チェーンID未指定なら初期化して終了
    if (!chainId) {
      setMenus(null);
      setError(null);
      setLoading(false);
      return;
    }
    // ローディング開始＆状態初期化
    setLoading(true);
    setMenus(null);
    setError(null);
    // メニュー一覧APIを取得
    fetch(`/api/menus?chain_id=${chainId}`)
      .then((res) => {
        // レスポンス異常時はエラー
        if (!res.ok) throw new Error("メニュー情報の取得に失敗しました");
        return res.json();
      })
      .then((data) => {
        // 取得成功時はメニュー一覧をセット
        setMenus(data);
      })
      .catch((e) => {
        // 取得失敗時はエラーメッセージをセット
        setError(e.message || "メニュー情報の取得に失敗しました");
      })
      .finally(() => {
        // ローディング終了
        setLoading(false);
      });
  }, [chainId]);

  return { menus, error, loading };
}
