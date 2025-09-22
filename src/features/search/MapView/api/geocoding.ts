/**
 * Google Maps Geocoding APIラッパー
 * エリア名（住所・地名）から座標（lat/lng）を取得
 * @param {string} areaName エリア名（例：東京駅、渋谷区など）
 * @returns {Promise<{lat: number, lng: number}>}
 */
export async function fetchGeocode(
  areaName: string
): Promise<{ lat: number; lng: number }> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) throw new Error("Google Maps APIキーが未設定です");
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    areaName
  )}&key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("ジオコーディングAPIリクエスト失敗");
  const data = await res.json();
  console.log("Geocoding API response:", data);
  if (data.status !== "OK" || !data.results?.length)
    throw new Error("該当エリアが見つかりません");
  const { lat, lng } = data.results[0].geometry.location;
  return { lat, lng };
}
