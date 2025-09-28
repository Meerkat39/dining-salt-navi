// fetchモック化
beforeAll(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: async () => [
      {
        id: "m1",
        name: "メニューA",
        salt: 2.5,
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
import type { Menu } from "@/types/menu";
import type { Store } from "@/types/store";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { StoreMarkerWithInfoWindow } from "../components/StoreMarkerWithInfoWindow";

// Marker/InfoWindowをモック化
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
  default: ({
    store,
    menus,
    omittedCount,
    onClose,
  }: {
    store: Store;
    menus: Menu[];
    omittedCount?: number;
    onClose?: () => void;
  }) => (
    <div data-testid="mock-info-window">
      <span>{store.name}</span>
      <span>{menus.length}</span>
      {omittedCount ? <span>他 {omittedCount} 件省略</span> : null}
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
        saltValue={3}
      />
    );
    const marker = await screen.findByTestId("mock-marker");
    await act(async () => {
      fireEvent.click(marker);
    });
    expect(setSelectedStoreId).toHaveBeenCalledWith(storeMock.id);
  });

  it("propsがInfoWindowに正しく渡る", async () => {
    const setSelectedStoreId = jest.fn();
    render(
      <StoreMarkerWithInfoWindow
        store={storeMock}
        selectedStoreId={storeMock.id}
        setSelectedStoreId={setSelectedStoreId}
        saltValue={3}
      />
    );
    const infoWindow = await screen.findByTestId("mock-info-window");
    expect(infoWindow).toBeInTheDocument();
  });

  it("InfoWindowの閉じるボタンでウィンドウが閉じる", async () => {
    const setSelectedStoreId = jest.fn();
    render(
      <StoreMarkerWithInfoWindow
        store={storeMock}
        selectedStoreId={storeMock.id}
        setSelectedStoreId={setSelectedStoreId}
        saltValue={3}
      />
    );
    const closeBtn = await screen.findByText("閉じる");
    await act(async () => {
      fireEvent.click(closeBtn);
    });
    expect(setSelectedStoreId).toHaveBeenCalledWith(null);
  });

  it("store座標未定義・menus空でも例外なく描画", async () => {
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
        saltValue={3}
      />
    );
    const marker = await screen.findByTestId("mock-marker");
    await act(async () => {
      fireEvent.click(marker);
    });
    expect(setSelectedStoreId).toHaveBeenCalledWith(storeNoLatLng.id);
  });
});
