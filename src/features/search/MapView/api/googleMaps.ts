/**
 * Google Maps APIラッパー（地図表示用）
 * - 今後、Places APIやGeocoding APIなどもここに追加可能
 */

import { useJsApiLoader } from "@react-google-maps/api";

export function useGoogleMapsLoader() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    language: "ja",
  });
  return { isLoaded, loadError };
}
