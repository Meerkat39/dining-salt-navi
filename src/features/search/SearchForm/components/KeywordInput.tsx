import React from "react";

/**
 * キーワード入力欄（店名・料理名で検索）
 * @param value 入力値
 * @param onChange 入力値変更時のコールバック
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
      placeholder="店舗名・メニュー名・住所など"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />
  );
};

export default KeywordInput;
