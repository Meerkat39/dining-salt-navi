import { Menu } from "@/types/menu";
import { Store } from "@/types/store";

/**
 * 検索キーワード・塩分量で店舗/メニューを絞り込むカスタムフック
 * @param stores 店舗一覧
 * @param menus メニュー一覧
 * @param keyword 検索キーワード
 * @param saltValue 塩分量フィルタ値
 * @returns { filteredStores, filteredMenus }
 */
export function useFilteredStoresMenus(
  stores: Store[],
  menus: Menu[],
  keyword: string,
  saltValue: number
) {
  // 塩分量フィルタ：指定値以下のメニューのみ抽出
  const filteredMenus = menus.filter((menu) => menu.salt <= saltValue);

  // 店舗フィルタ：
  // 1. 店舗名がキーワードに部分一致
  // 2. その店舗に条件に合うメニューが1件以上存在
  const filteredStores = stores.filter((store) => {
    // この店舗に該当メニューがあるか判定
    const hasMenu = filteredMenus.some(
      (menu) => menu.chain_id === store.chain_id
    );
    // 店舗名の部分一致 & メニュー条件
    return store.name.toLowerCase().includes(keyword.toLowerCase()) && hasMenu;
  });

  // 絞り込み済みの店舗・メニューを返却
  return { filteredStores, filteredMenus };
}
