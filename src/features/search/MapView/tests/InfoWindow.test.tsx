import type { Menu } from "@/types/menu";
import type { Store } from "@/types/store";
import { fireEvent, render, screen } from "@testing-library/react";
import InfoWindow from "../components/InfoWindow";

// Google Maps InfoWindowをテスト用にモック
jest.mock("@react-google-maps/api", () => ({
  InfoWindow: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-info-window">{children}</div>
  ),
}));

const storeMock: Store = {
  id: "1",
  name: "テスト店舗",
  lat: 35.0,
  lng: 135.0,
  chain_id: "c1",
  address: "京都府京都市",
  place_id: "test_place_id",
  created_at: "2023-01-01T00:00:00Z",
  updated_at: "2023-01-01T00:00:00Z",
};
const menusMock: Menu[] = [
  {
    id: "m1",
    name: "メニューA",
    sodiumEquivalent_g: 2.5,
    chain_id: "c1",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "m2",
    name: "メニューB",
    sodiumEquivalent_g: 1.2,
    chain_id: "c1",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
];

describe("InfoWindow", () => {
  it("店名・緯度経度が正しく表示される", () => {
    render(<InfoWindow store={storeMock} menus={menusMock} />);
    expect(screen.getByText("テスト店舗")).toBeInTheDocument();
    expect(screen.getByText(/緯度: 35/)).toBeInTheDocument();
    expect(screen.getByText(/経度: 135/)).toBeInTheDocument();
  });

  it("メニュー一覧が正しく表示される", () => {
    render(<InfoWindow store={storeMock} menus={menusMock} />);
    expect(screen.getByText("メニューA")).toBeInTheDocument();
    expect(screen.getByText("メニューB")).toBeInTheDocument();
    expect(screen.getByText(/塩分: 2.5g/)).toBeInTheDocument();
    expect(screen.getByText(/塩分: 1.2g/)).toBeInTheDocument();
  });

  it("omittedCount > 0 の場合 省略表示が出る", () => {
    render(<InfoWindow store={storeMock} menus={menusMock} omittedCount={3} />);
    expect(screen.getByText(/他 3 件省略/)).toBeInTheDocument();
  });

  it("omittedCount未指定/0の場合 省略表示が出ない", () => {
    render(<InfoWindow store={storeMock} menus={menusMock} />);
    expect(screen.queryByText(/省略/)).not.toBeInTheDocument();
    render(<InfoWindow store={storeMock} menus={menusMock} omittedCount={0} />);
    expect(screen.queryByText(/省略/)).not.toBeInTheDocument();
  });

  it("onCloseが渡された場合 閉じるボタンが表示されクリックでコールバックが呼ばれる", () => {
    const handleClose = jest.fn();
    render(
      <InfoWindow store={storeMock} menus={menusMock} onClose={handleClose} />
    );
    const closeBtn = screen.getByText("閉じる");
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalled();
  });

  it("menusが空の場合 メニュー一覧タイトルのみ表示される", () => {
    render(<InfoWindow store={storeMock} menus={[]} />);
    expect(screen.getByText("メニュー一覧:")).toBeInTheDocument();
  });

  it("storeの必須プロパティが欠損していても例外なく描画される", () => {
    const storeNoLatLng = {
      ...storeMock,
      lat: undefined,
      lng: undefined,
    } as unknown as Store;
    render(<InfoWindow store={storeNoLatLng} menus={menusMock} />);
    expect(screen.getByText("テスト店舗")).toBeInTheDocument();
  });
});
