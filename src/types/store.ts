/**
 * 店舗情報の型定義（仮データ・DB共通で利用）
 */
export type Store = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  salt: number; // 塩分量（g）
  address: string;
};
