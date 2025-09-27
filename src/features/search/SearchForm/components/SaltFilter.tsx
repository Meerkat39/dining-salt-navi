import React from "react";

/**
 * 塩分量フィルタ（数値入力＋スライダー連動UI）。
 * - value/onChangeで親と状態連携
 * - min/max/step/disabledで入力制御
 * @param {number} value 現在の塩分量（g）
 * @param {(v: number) => void} onChange 値変更時のコールバック
 * @param {number} [min] 最小値（デフォルト0）
 * @param {number} [max] 最大値（デフォルト10）
 * @param {number} [step] ステップ幅（デフォルト0.1）
 * @param {boolean} [disabled] 入力不可フラグ
 */
type SaltFilterProps = {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
};

const SaltFilter: React.FC<SaltFilterProps> = ({
  value,
  onChange,
  min = 0,
  max = 10,
  step = 0.1,
  disabled = false,
}) => {
  return (
    <div className="flex-1 flex flex-col gap-2">
      {/* ラベル表示 */}
      <label className="block text-base font-medium mb-1">塩分量（g）</label>
      <div className="flex items-center gap-2">
        {/* 数値入力欄（直接g数を入力） */}
        <input
          type="number"
          className="w-20 border rounded px-2 py-1"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          aria-label="塩分量"
        />
        {/* スライダー（直感的にg数を調整） */}
        <input
          type="range"
          className="flex-1 accent-blue-600"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          aria-label="塩分量"
        />
        {/* 単位表示 */}
        <span className="text-sm text-gray-500">g</span>
      </div>
    </div>
  );
};

export default SaltFilter;
