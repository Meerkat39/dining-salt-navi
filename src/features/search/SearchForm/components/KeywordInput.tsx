import React from "react";

/**
 * キーワード入力欄（店名・料理名で検索）
 * @param {string} value 入力値
 * @param {(value: string) => void} onChange 入力値変更時のコールバック
 * @param {boolean} [disabled] 入力不可フラグ（任意）
 */
export type KeywordInputProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

const KeywordInput: React.FC<KeywordInputProps> = ({
  value,
  onChange,
  disabled,
}) => {
  return (
    <input
      type="text"
      className="w-full border rounded px-2 py-1"
      placeholder="エリア名・地名・駅名など"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />
  );
};

export default KeywordInput;
