import { useEffect } from "react";

/**
 * 現在地取得の副作用（ローディング・エラー処理・座標通知）をまとめて管理するカスタムフック
 * - useCurrentLocationがONのとき、ブラウザのGeolocation APIで現在地を取得
 * - 取得成功時はonCurrentLocationChangeで座標(lat, lng)を親へ通知
 * - 取得中はisLocating/setIsLocatingでローディング状態を管理
 * - 失敗時はalertでエラー表示
 * @param {boolean} useCurrentLocation - 現在地取得ON/OFF
 * @param {(lat: number, lng: number) => void} [onCurrentLocationChange] - 取得成功時のコールバック（lat, lng）
 * @param {boolean} [isLocating] - 現在地取得中状態（ローディング制御）
 * @param {React.Dispatch<React.SetStateAction<boolean>>} [setIsLocating] - 現在地取得中状態の更新関数
 * @returns {void} 戻り値なし（副作用のみ）
 */
export function useGeolocationEffect(
  useCurrentLocation: boolean,
  onCurrentLocationChange?: (lat: number, lng: number) => void,
  isLocating?: boolean,
  setIsLocating?: React.Dispatch<React.SetStateAction<boolean>>
): void {
  useEffect(() => {
    // ローディング状態管理関数がなければ何もしない
    if (!setIsLocating) return;
    // 現在地取得ONの場合
    if (useCurrentLocation) {
      // ローディング開始
      setIsLocating(true);
      // Geolocation APIが使える場合
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            // ローディング終了
            setIsLocating(false);
            // 取得した座標を親へ通知
            const { latitude, longitude } = pos.coords;
            if (onCurrentLocationChange) {
              onCurrentLocationChange(latitude, longitude);
            }
          },
          (err) => {
            // エラー時はローディング終了＋アラート表示
            setIsLocating(false);
            alert("現在地の取得に失敗しました: " + err.message);
          }
        );
      } else {
        // Geolocation API非対応時
        setIsLocating(false);
        alert("この端末・ブラウザは現在地取得に対応していません。");
      }
    } else {
      // 現在地取得OFF時はローディング終了
      setIsLocating(false);
    }
  }, [useCurrentLocation, onCurrentLocationChange, setIsLocating]);
}
