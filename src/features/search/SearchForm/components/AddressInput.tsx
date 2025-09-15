import React from "react";

/**
 * エリア名・駅名・住所のテキスト入力欄コンポーネント。
 * - 現在地検索ON時は入力不可（disabled=true）
 * @param disabled 入力不可フラグ（現在地検索ON時にtrue）
 * @param value 入力値
 * @param onChange 入力値変更時のコールバック
 */
const AddressInput: React.FC<{
  disabled?: boolean;
  value: string;
  onChange: (v: string) => void;
}> = ({ disabled, value, onChange }) => {
  return (
    <div className="flex-1">
      <label className="block text-sm font-medium mb-1">
        エリア名・駅名・住所
      </label>
      <input
        type="text"
        className="w-full border rounded px-2 py-1"
        placeholder="エリア名、駅名、住所を入力..."
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default AddressInput;
