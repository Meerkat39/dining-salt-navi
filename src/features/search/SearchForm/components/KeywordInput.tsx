import React from "react";

/**
 * キーワード入力欄（店名・料理名で検索）
 * @param value 入力値
 * @param onChange 入力値変更時のコールバック
 */
export type KeywordInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const KeywordInput: React.FC<KeywordInputProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="w-full border rounded px-2 py-1"
      placeholder="店名・料理名で検索"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default KeywordInput;
