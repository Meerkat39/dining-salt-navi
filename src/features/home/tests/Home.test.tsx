import Home from "@/app/page";
import { render, screen } from "@testing-library/react";

beforeAll(() => {
  global.fetch = jest.fn().mockResolvedValue({ json: async () => [] });
});

describe("Homeページ", () => {
  it("主要UI（検索フォーム・地図・リスト）が表示される", () => {
    const { container } = render(<Home />);
    expect(container.querySelector("form")).toBeInTheDocument(); // 検索フォーム
    // 地図・リストはテストID未設定のため、テキストで判定
    expect(screen.getByText("Loading Map...")).toBeInTheDocument(); // 地図
    expect(
      screen.getByText("地図の店舗を選ぶとここにメニューが表示されます。")
    ).toBeInTheDocument(); // リスト
  });

  it("初期状態でキーワード・塩分量・現在地取得UIが表示される", () => {
    render(<Home />);
    expect(
      screen.getByPlaceholderText("エリア名（例：渋谷区、東京駅など）")
    ).toBeInTheDocument();
    const saltInputs = screen.getAllByLabelText("塩分量");
    expect(saltInputs.length).toBeGreaterThanOrEqual(2);
    saltInputs.forEach((input) => expect(input).toBeInTheDocument());
    expect(
      screen.getByRole("button", { name: /現在地から検索/ })
    ).toBeInTheDocument();
  });
});
