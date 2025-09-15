import { Button } from "@/features/common/components/button";

/**
 * 検索実行用のボタンコンポーネント。
 * - shadcn/ui Buttonを利用
 * - 検索アイコン＋テキスト、w-full, flex, gap, px-6でUI統一
 */

import { Search } from "lucide-react";

const SearchButton: React.FC = () => {
  return (
    <Button
      type="submit"
      variant="default"
      className="w-full flex items-center gap-2 px-6"
    >
      <Search className="size-4" aria-hidden="true" />
      検索
    </Button>
  );
};

export default SearchButton;
