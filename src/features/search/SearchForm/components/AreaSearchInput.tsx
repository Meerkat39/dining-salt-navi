import React from "react";

/**
 * エリア検索入力欄（地名・住所・駅名で検索）
 * @param {string} value 入力値
 * @param {(value: string) => void} onChange 入力値変更時のコールバック
 * @param {boolean} [disabled] 入力不可フラグ（任意）
 */
export type AreaSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

const AreaSearchInput: React.FC<AreaSearchInputProps> = ({
  value,
  onChange,
  disabled,
}) => {
  return (
    <input
      type="text"
      className="w-full border rounded px-2 py-1"
      placeholder="エリア名（例：渋谷区、東京駅など）"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />
  );
};

export default AreaSearchInput;
