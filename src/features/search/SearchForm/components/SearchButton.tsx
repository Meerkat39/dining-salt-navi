import { Button } from "@/features/common/components/button";
import { Search } from "lucide-react";

/**
 * 検索実行用のボタンコンポーネント。
 * - shadcn/ui Buttonを利用
 * - 検索アイコン＋テキスト、w-full, flex, gap, px-6でUI統一
 * - APIリクエスト中はボタンを無効化（連打防止）
 * @param {boolean} disabled - APIリクエスト中はtrueでボタン無効化
 */

type SearchButtonProps = {
  disabled?: boolean;
};

const SearchButton: React.FC<SearchButtonProps> = ({ disabled }) => {
  return (
    <Button
      type="submit"
      variant="default"
      className="w-full flex items-center gap-2 px-6 text-lg"
      disabled={disabled}
    >
      <Search className="size-4" aria-hidden="true" />
      検索
    </Button>
  );
};

export default SearchButton;
