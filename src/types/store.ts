/**
 * 店舗情報の型定義（仮データ・DB共通で利用）
 */
/**
 * 店舗情報の型定義（DB設計準拠）
 */

export type Store = {
  id: string; // アプリ・DB用の一意ID（UUID推奨）
  chain_id: string; // チェーンID
  name: string; // 店舗名
  address: string; // 住所
  lat: number; // 緯度
  lng: number; // 経度
  place_id?: string; // Google由来の場合のみセット
  created_at: string;
  updated_at: string;
};
