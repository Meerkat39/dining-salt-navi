import { renderHook, waitFor } from "@testing-library/react";
import { useFilteredStores } from "../hooks/useFilteredStores";

// APIモック用
const mockStores = [
  { id: "1", name: "A", chain_id: "c1", lat: 0, lng: 0 },
  { id: "2", name: "B", chain_id: "c2", lat: 0, lng: 0 },
];
const mockMenus = [
  { id: "m1", chain_id: "c1", salt: 5 },
  { id: "m2", chain_id: "c2", salt: 10 },
];

beforeAll(() => {
  global.fetch = jest.fn((url: unknown) => {
    let urlStr = "";
    if (typeof url === "string") {
      urlStr = url;
    } else if (url instanceof URL) {
      urlStr = url.toString();
    } else if (url && typeof url === "object" && "url" in url) {
      urlStr = String((url as { url: string }).url);
    }
    if (urlStr.includes("stores")) {
      return Promise.resolve({
        json: () => Promise.resolve(mockStores),
      } as unknown as Response);
    }
    if (urlStr.includes("menus")) {
      return Promise.resolve({
        json: () => Promise.resolve(mockMenus),
      } as unknown as Response);
    }
    return Promise.reject();
  });
});

describe("useFilteredStores", () => {
  it("塩分量で店舗を絞り込む", async () => {
    const { result } = renderHook(() => useFilteredStores(6));
    await waitFor(() =>
      expect(result.current).toEqual([
        { id: "1", name: "A", chain_id: "c1", lat: 0, lng: 0 },
      ])
    );
  });

  it("塩分量10なら両方返る", async () => {
    const { result } = renderHook(() => useFilteredStores(10));
    await waitFor(() => expect(result.current.length).toBe(2));
  });
});
