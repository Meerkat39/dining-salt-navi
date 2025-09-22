/**
 * Google Maps Geocoding APIラッパー
 * エリア名（住所・地名）から座標（lat/lng）を取得
 * @param {string} areaName エリア名（例：東京駅、渋谷区など）
 * @returns {Promise<{lat: number, lng: number}>}
 */
export async function fetchGeocode(
  areaName: string
): Promise<{ lat: number; lng: number }> {
  // Next.js API Route経由でジオコーディング（APIキーはサーバー管理）
  const res = await fetch("/api/geocode", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ areaName }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || "ジオコーディングAPIリクエスト失敗");
  }
  const data = await res.json();
  if (typeof data.lat !== "number" || typeof data.lng !== "number") {
    throw new Error("該当エリアが見つかりません");
  }
  return { lat: data.lat, lng: data.lng };
}
