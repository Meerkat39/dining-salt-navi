import { act, renderHook } from "@testing-library/react";
import { useCurrentLocationSearch } from "../hooks/useCurrentLocationSearch";

describe("useCurrentLocationSearch", () => {
  it("初期値はOFF・center未定義", () => {
    const { result } = renderHook(() => useCurrentLocationSearch());
    expect(result.current.useCurrentLocation).toBe(false);
    expect(result.current.center).toBeUndefined();
  });

  it("setUseCurrentLocationでONにできる", () => {
    const { result } = renderHook(() => useCurrentLocationSearch());
    act(() => {
      result.current.setUseCurrentLocation(true);
    });
    expect(result.current.useCurrentLocation).toBe(true);
  });

  it("handleCurrentLocationChangeでcenterセット・OFF・0.5秒後クリア", () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useCurrentLocationSearch());
    act(() => {
      result.current.handleCurrentLocationChange(35.1, 139.1);
    });
    expect(result.current.center).toEqual({ lat: 35.1, lng: 139.1 });
    expect(result.current.useCurrentLocation).toBe(false);
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current.center).toBeUndefined();
    jest.useRealTimers();
  });
});
