import { Store } from "../types/store";

/**
 * 仮の店舗データ（Google Map・検索・リスト表示用）
 * Supabase移行まではこの配列を利用
 */
export const stores: Store[] = [
  {
    id: 1,
    name: "マクドナルド 渋谷店",
    lat: 35.658034,
    lng: 139.701636,
    salt: 2.5,
    address: "東京都渋谷区道玄坂2-3-1",
  },
  {
    id: 2,
    name: "ケンタッキー 新宿店",
    lat: 35.690921,
    lng: 139.700257,
    salt: 2.8,
    address: "東京都新宿区新宿3-24-1",
  },
  {
    id: 3,
    name: "モスバーガー 池袋店",
    lat: 35.728926,
    lng: 139.71038,
    salt: 2.2,
    address: "東京都豊島区南池袋1-28-2",
  },
  // 必要に応じて追加
];
