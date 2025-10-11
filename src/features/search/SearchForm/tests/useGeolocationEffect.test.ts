import { renderHook } from "@testing-library/react";
import { useGeolocationEffect } from "../hooks/useGeolocationEffect";

describe("useGeolocationEffect", () => {
  const originalGeolocation = global.navigator.geolocation;
  const originalAlert = global.alert;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    Object.defineProperty(global.navigator, "geolocation", {
      value: originalGeolocation,
      configurable: true,
    });
    global.alert = originalAlert;
  });

  it("useCurrentLocation=trueでgetCurrentPositionが呼ばれる", () => {
    const getCurrentPosition = jest.fn();
    Object.defineProperty(global.navigator, "geolocation", {
      value: { getCurrentPosition },
      configurable: true,
    });
    renderHook(() => useGeolocationEffect(true, undefined, false, jest.fn()));
    expect(getCurrentPosition).toHaveBeenCalled();
  });

  it("取得成功時にonCurrentLocationChangeが呼ばれる", () => {
    const getCurrentPosition = jest.fn((success) => {
      success({ coords: { latitude: 35, longitude: 135 } });
    });
    Object.defineProperty(global.navigator, "geolocation", {
      value: { getCurrentPosition },
      configurable: true,
    });
    const onChange = jest.fn();
    renderHook(() => useGeolocationEffect(true, onChange, false, jest.fn()));
    expect(onChange).toHaveBeenCalledWith(35, 135);
  });

  it("取得失敗時にalertが呼ばれる", () => {
    const getCurrentPosition = jest.fn((_, error) => {
      error({ message: "位置情報エラー" });
    });
    Object.defineProperty(global.navigator, "geolocation", {
      value: { getCurrentPosition },
      configurable: true,
    });
    const alertSpy = jest.spyOn(global, "alert").mockImplementation(() => {});
    renderHook(() => useGeolocationEffect(true, undefined, false, jest.fn()));
    expect(alertSpy).toHaveBeenCalledWith(
      "現在地の取得に失敗しました: 位置情報エラー"
    );
    alertSpy.mockRestore();
  });

  it("Geolocation未対応時にalertが呼ばれる", () => {
    Object.defineProperty(global.navigator, "geolocation", {
      value: undefined,
      configurable: true,
    });
    const alertSpy = jest.spyOn(global, "alert").mockImplementation(() => {});
    renderHook(() => useGeolocationEffect(true, undefined, false, jest.fn()));
    expect(alertSpy).toHaveBeenCalledWith(
      "この端末・ブラウザは現在地取得に対応していません。"
    );
    alertSpy.mockRestore();
  });

  it("useCurrentLocation=falseでは何も呼ばれない", () => {
    const getCurrentPosition = jest.fn();
    Object.defineProperty(global.navigator, "geolocation", {
      value: { getCurrentPosition },
      configurable: true,
    });
    const alertSpy = jest.spyOn(global, "alert").mockImplementation(() => {});
    renderHook(() => useGeolocationEffect(false, undefined, false, jest.fn()));
    expect(getCurrentPosition).not.toHaveBeenCalled();
    expect(alertSpy).not.toHaveBeenCalled();
    alertSpy.mockRestore();
  });
});
