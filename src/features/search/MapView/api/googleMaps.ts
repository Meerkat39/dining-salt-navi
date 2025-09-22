/**
 * Google Maps APIラッパー（地図表示用）
 * - 地図表示のみはリファラ制限付きAPIキーでOK
 * - Places APIやGeocoding APIなど「データ取得系」は必ずサーバー経由で！
 *   （APIキー漏洩防止のため）
 */

import { useJsApiLoader } from "@react-google-maps/api";

export function useGoogleMapsLoader() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    language: "ja",
  });
  return { isLoaded, loadError };
}
