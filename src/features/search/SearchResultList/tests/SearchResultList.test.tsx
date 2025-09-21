import { fireEvent, render, screen } from "@testing-library/react";
import SearchResultList from "../components/SearchResultList";

const stores = [
  {
    id: "1",
    name: "A店",
    lat: 35.1,
    lng: 139.1,
    chain_id: "c1",
    address: "東京都A区1-1-1",
    created_at: "",
    updated_at: "",
  },
  {
    id: "2",
    name: "B店",
    lat: 35.2,
    lng: 139.2,
    chain_id: "c2",
    address: "東京都B区2-2-2",
    created_at: "",
    updated_at: "",
  },
];

describe("SearchResultList", () => {
  it("店舗リストが表示される", () => {
    render(<SearchResultList stores={stores} />);
    expect(screen.getByText("A店")).toBeInTheDocument();
    expect(screen.getByText("B店")).toBeInTheDocument();
  });

  it("0件時はNoSearchResultが表示される", () => {
    render(<SearchResultList stores={[]} />);
    expect(screen.getByText(/検索結果がありません/)).toBeInTheDocument();
  });

  it("onStoreItemClickが呼ばれる", () => {
    const handleClick = jest.fn();
    render(<SearchResultList stores={stores} onStoreItemClick={handleClick} />);
    fireEvent.click(screen.getByText("B店"));
    expect(handleClick).toHaveBeenCalledWith("2");
  });

  it("selectedStoreIdでハイライトされる", () => {
    const { container } = render(
      <SearchResultList stores={stores} selectedStoreId="2" />
    );
    const items = container.querySelectorAll(".bg-blue-100");
    expect(items.length).toBe(1);
    expect(items[0].textContent).toContain("B店");
  });
});
