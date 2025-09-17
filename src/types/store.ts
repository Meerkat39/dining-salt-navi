/**
 * 店舗情報の型定義（仮データ・DB共通で利用）
 */
export type Store = {
  id: string;
  chain_id: string;
  name: string;
  lat: number;
  lng: number;
};
