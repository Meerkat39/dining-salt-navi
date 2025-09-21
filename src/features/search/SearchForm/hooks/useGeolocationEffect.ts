import { useEffect } from "react";

/**
 * 現在地取得の副作用を管理するカスタムフック
 * @param {boolean} useCurrentLocation 現在地取得ON/OFF
 * @param {(lat: number, lng: number) => void} [onCurrentLocationChange] 取得成功時のコールバック（lat, lng）
 */
export function useGeolocationEffect(
  useCurrentLocation: boolean,
  onCurrentLocationChange?: (lat: number, lng: number) => void
) {
  useEffect(() => {
    // 現在地取得がONの場合のみ処理を実行
    if (useCurrentLocation) {
      // ブラウザがGeolocation APIに対応しているか判定
      if (navigator.geolocation) {
        // 現在地を非同期で取得
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            // 取得成功時：緯度・経度を抽出
            const { latitude, longitude } = pos.coords;
            // コールバックが指定されていれば呼び出し
            if (onCurrentLocationChange) {
              onCurrentLocationChange(latitude, longitude);
            }
          },
          (err) => {
            // 取得失敗時：エラーメッセージを表示
            alert("現在地の取得に失敗しました: " + err.message);
          }
        );
      } else {
        // Geolocation未対応の場合：警告を表示
        alert("この端末・ブラウザは現在地取得に対応していません。");
      }
    }
  }, [useCurrentLocation, onCurrentLocationChange]);
}
