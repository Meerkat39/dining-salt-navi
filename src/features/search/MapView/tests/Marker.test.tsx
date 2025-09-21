import type { Store } from "@/types/store";
import { fireEvent, render, screen } from "@testing-library/react";
import Marker from "../components/Marker";

// GoogleMapsMarkerをモック化
jest.mock("@react-google-maps/api", () => ({
  Marker: ({
    position,
    title,
    onClick,
  }: {
    position: { lat: number; lng: number };
    title: string;
    onClick?: () => void;
  }) => (
    <button data-testid="mock-marker" onClick={onClick} title={title}>
      {position.lat},{position.lng}
    </button>
  ),
}));

const storeMock: Store = {
  id: "1",
  name: "テスト店舗",
  lat: 35.0,
  lng: 135.0,
  chain_id: "c1",
  address: "京都府京都市",
  created_at: "2023-01-01T00:00:00Z",
  updated_at: "2023-01-01T00:00:00Z",
};

describe("Marker", () => {
  it("GoogleMapsMarkerが正しい座標・タイトルで描画される", () => {
    render(<Marker store={storeMock} />);
    const marker = screen.getByTestId("mock-marker");
    expect(marker).toHaveTextContent("35,135");
    expect(marker).toHaveAttribute("title", "テスト店舗");
  });

  it("onClickイベントが発火する", () => {
    const handleClick = jest.fn();
    render(<Marker store={storeMock} onClick={handleClick} />);
    const marker = screen.getByTestId("mock-marker");
    fireEvent.click(marker);
    expect(handleClick).toHaveBeenCalled();
  });

  it("onClick未指定でも描画される", () => {
    render(<Marker store={storeMock} />);
    const marker = screen.getByTestId("mock-marker");
    expect(marker).toBeInTheDocument();
  });

  it("座標が未定義の場合でも例外なく描画される", () => {
    const storeNoLatLng = { ...storeMock, lat: undefined, lng: undefined };
    render(<Marker store={storeNoLatLng as unknown as Store} />);
    const marker = screen.getByTestId("mock-marker");
    expect(marker).toBeInTheDocument();
  });
});
