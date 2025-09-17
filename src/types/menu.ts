// メニュー情報型
export type Menu = {
  id: string;
  store_id: string;
  name: string;
  salt: number;
  price: number;
  created_at: string; // ISO文字列
  updated_at: string; // ISO文字列
};
