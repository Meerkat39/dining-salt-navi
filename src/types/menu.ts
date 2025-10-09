// メニュー情報型
export type Menu = {
  id: string;
  chain_id: string;
  name: string;
  saltEquivalent_g: number;
  type: "main" | "side";
  created_at: string;
  updated_at: string;
};
