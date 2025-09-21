import { renderHook } from "@testing-library/react";
import { useGeolocationEffect } from "../hooks/useGeolocationEffect";

describe("useGeolocationEffect", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("useCurrentLocation=trueでgetCurrentPositionが呼ばれる", () => {
    const getCurrentPosition = jest.fn();
    // @ts-expect-error: navigator.geolocationは型定義外のため
    global.navigator.geolocation = { getCurrentPosition };
    renderHook(() => useGeolocationEffect(true));
    expect(getCurrentPosition).toHaveBeenCalled();
  });

  it("取得成功時にonCurrentLocationChangeが呼ばれる", () => {
    const getCurrentPosition = jest.fn((success) => {
      success({ coords: { latitude: 35, longitude: 135 } });
    });
    // @ts-expect-error: navigator.geolocationは型定義外のため
    global.navigator.geolocation = { getCurrentPosition };
    const onChange = jest.fn();
    renderHook(() => useGeolocationEffect(true, onChange));
    expect(onChange).toHaveBeenCalledWith(35, 135);
  });

  it("取得失敗時にalertが呼ばれる", () => {
    const getCurrentPosition = jest.fn((_, error) => {
      error({ message: "位置情報エラー" });
    });
    // @ts-expect-error: navigator.geolocationは型定義外のため
    global.navigator.geolocation = { getCurrentPosition };
    global.alert = jest.fn();
    renderHook(() => useGeolocationEffect(true));
    expect(global.alert).toHaveBeenCalledWith(
      "現在地の取得に失敗しました: 位置情報エラー"
    );
  });

  it("Geolocation未対応時にalertが呼ばれる", () => {
    // @ts-expect-error: navigator.geolocationは型定義外のため
    global.navigator.geolocation = undefined;
    global.alert = jest.fn();
    renderHook(() => useGeolocationEffect(true));
    expect(global.alert).toHaveBeenCalledWith(
      "この端末・ブラウザは現在地取得に対応していません。"
    );
  });

  it("useCurrentLocation=falseでは何も呼ばれない", () => {
    const getCurrentPosition = jest.fn();
    // @ts-expect-error: navigator.geolocationは型定義外のため
    global.navigator.geolocation = { getCurrentPosition };
    global.alert = jest.fn();
    renderHook(() => useGeolocationEffect(false));
    expect(getCurrentPosition).not.toHaveBeenCalled();
    expect(global.alert).not.toHaveBeenCalled();
  });
});
