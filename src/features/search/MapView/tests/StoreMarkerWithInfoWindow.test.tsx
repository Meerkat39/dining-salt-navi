// fetchモック化
beforeAll(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: async () => [
      {
        id: "m1",
        name: "メニューA",
        sodiumEquivalent_g: 2.5,
        chain_id: "c1",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-01T00:00:00Z",
      },
    ],
  });
});

// Google Maps InfoWindowをテスト用にモック
jest.mock("@react-google-maps/api", () => ({
  InfoWindow: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-info-window">{children}</div>
  ),
}));
import type { Store } from "@/types/store";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { StoreMarkerWithInfoWindow } from "../components/StoreMarkerWithInfoWindow";

// Marker/InfoWindowを現仕様に合わせてモック化
jest.mock("../components/Marker", () => ({
  __esModule: true,
  default: ({ store, onClick }: { store: Store; onClick?: () => void }) => (
    <button data-testid="mock-marker" onClick={onClick}>
      {store.name}
    </button>
  ),
}));
jest.mock("../components/InfoWindow", () => ({
  __esModule: true,
  default: ({ store, onClose }: { store: Store; onClose?: () => void }) => (
    <div data-testid="mock-info-window">
      <span>{store.name}</span>
      {onClose && <button onClick={onClose}>閉じる</button>}
    </div>
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

describe("StoreMarkerWithInfoWindow", () => {
  it("マーカークリックでInfoWindowが表示される", async () => {
    const setSelectedStoreId = jest.fn();
    render(
      <StoreMarkerWithInfoWindow
        store={storeMock}
        selectedStoreId={null}
        setSelectedStoreId={setSelectedStoreId}
      />
    );
    const marker = await screen.findByTestId("mock-marker");
    await act(async () => {
      fireEvent.click(marker);
    });
    expect(setSelectedStoreId).toHaveBeenCalledWith(storeMock.id);
  });

  it("InfoWindowに店舗名が表示される", async () => {
    const setSelectedStoreId = jest.fn();
    render(
      <StoreMarkerWithInfoWindow
        store={storeMock}
        selectedStoreId={storeMock.id}
        setSelectedStoreId={setSelectedStoreId}
      />
    );
    const infoWindow = await screen.findByTestId("mock-info-window");
    expect(infoWindow).toBeInTheDocument();
    const nameElements = screen.getAllByText("テスト店舗");
    expect(nameElements.length).toBeGreaterThanOrEqual(1);
  });

  it("InfoWindowの閉じるボタンでウィンドウが閉じる", async () => {
    const setSelectedStoreId = jest.fn();
    render(
      <StoreMarkerWithInfoWindow
        store={storeMock}
        selectedStoreId={storeMock.id}
        setSelectedStoreId={setSelectedStoreId}
      />
    );
    const closeBtn = await screen.findByText("閉じる");
    await act(async () => {
      fireEvent.click(closeBtn);
    });
    expect(setSelectedStoreId).toHaveBeenCalledWith(null);
  });

  it("store座標未定義でも例外なく描画", async () => {
    const storeNoLatLng = {
      ...storeMock,
      lat: undefined,
      lng: undefined,
    } as unknown as Store;
    const setSelectedStoreId = jest.fn();
    render(
      <StoreMarkerWithInfoWindow
        store={storeNoLatLng}
        selectedStoreId={null}
        setSelectedStoreId={setSelectedStoreId}
      />
    );
    const marker = await screen.findByTestId("mock-marker");
    await act(async () => {
      fireEvent.click(marker);
    });
    expect(setSelectedStoreId).toHaveBeenCalledWith(storeNoLatLng.id);
  });
});
