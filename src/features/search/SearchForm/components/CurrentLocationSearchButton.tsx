import { Button } from "@/features/common/components/button";
import React from "react";

/**
 * 現在地から検索するためのON/OFFトグルボタン。
 * - ON時はvariant="default"、OFF時はvariant="outline"で表示
 * - ボタン幅はw-full、アイコン・ON表示付き
 * @param checked 現在地検索ON/OFF状態
 * @param onChange ON/OFF切り替え時のコールバック
 */
const CurrentLocationSearchButton: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ checked, onChange }) => {
  return (
    <Button
      type="button"
      variant={checked ? "default" : "outline"}
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      className="w-full flex items-center gap-2 px-6"
    >
      <span role="img" aria-label="現在地">
        📍
      </span>
      現在地から検索
      {checked && <span className="ml-2 text-xs">ON</span>}
    </Button>
  );
};

export default CurrentLocationSearchButton;
