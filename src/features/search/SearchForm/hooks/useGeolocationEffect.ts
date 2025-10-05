import { useEffect } from "react";

/**
 * 現在地取得の副作用を管理するカスタムフック
 * @param {boolean} useCurrentLocation 現在地取得ON/OFF
 * @param {(lat: number, lng: number) => void} [onCurrentLocationChange] 取得成功時のコールバック（lat, lng）
 */
export function useGeolocationEffect(
  useCurrentLocation: boolean,
  onCurrentLocationChange?: (lat: number, lng: number) => void,
  isLocating?: boolean,
  setIsLocating?: React.Dispatch<React.SetStateAction<boolean>>
): void {
  useEffect(() => {
    if (!setIsLocating) return;
    if (useCurrentLocation) {
      setIsLocating(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setIsLocating(false);
            const { latitude, longitude } = pos.coords;
            if (onCurrentLocationChange) {
              onCurrentLocationChange(latitude, longitude);
            }
          },
          (err) => {
            setIsLocating(false);
            alert("現在地の取得に失敗しました: " + err.message);
          }
        );
      } else {
        setIsLocating(false);
        alert("この端末・ブラウザは現在地取得に対応していません。");
      }
    } else {
      setIsLocating(false);
    }
  }, [useCurrentLocation, onCurrentLocationChange, setIsLocating]);
}
