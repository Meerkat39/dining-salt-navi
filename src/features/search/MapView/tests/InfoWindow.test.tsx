import type { Store } from "@/types/store";
import { fireEvent, render, screen } from "@testing-library/react";
import InfoWindow from "../components/InfoWindow";
// GoogleMapsInfoWindowをモック化
jest.mock("@react-google-maps/api", () => ({
  __esModule: true,
  InfoWindow: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const storeMock: Store = {
  id: "test-id",
  name: "テスト店舗",
  lat: 35.0,
  lng: 135.0,
  chain_id: "chain-1",
  address: "東京都",
  place_id: "test-place-id",
  created_at: "2025-10-11T00:00:00.000Z",
  updated_at: "2025-10-11T00:00:00.000Z",
};

describe("InfoWindow", () => {
  it("店舗名が表示される", () => {
    render(<InfoWindow store={storeMock} />);
    const infoWindow = screen.getByTestId("info-window");
    expect(infoWindow).toHaveTextContent("テスト店舗");
  });

  it("閉じるボタンでonCloseが呼ばれる", () => {
    const onClose = jest.fn();
    render(<InfoWindow store={storeMock} onClose={onClose} />);
    const closeBtn = screen.getByTestId("info-window-close");
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });
});
