import { render, screen } from "@testing-library/react";
import SearchResultItem from "../components/SearchResultItem";

describe("SearchResultItem", () => {
  const store = {
    id: "1",
    name: "テスト店",
    lat: 35.1,
    lng: 139.1,
    chain_id: "c1",
    address: "東京都テスト区1-1-1",
    created_at: "",
    updated_at: "",
  };

  it("店舗名・緯度経度が表示される", () => {
    render(<SearchResultItem store={store} />);
    expect(screen.getByText("テスト店")).toBeInTheDocument();
    expect(screen.getByText(/緯度: 35.1, 経度: 139.1/)).toBeInTheDocument();
  });

  it("isSelected=trueでハイライトclassが付与される", () => {
    const { container } = render(<SearchResultItem store={store} isSelected />);
    const item = container.firstChild as HTMLElement;
    expect(item).toHaveClass("bg-blue-100");
  });

  it("isSelected=falseで通常classが付与される", () => {
    const { container } = render(
      <SearchResultItem store={store} isSelected={false} />
    );
    const item = container.firstChild as HTMLElement;
    expect(item).toHaveClass("hover:bg-gray-50");
  });
});
