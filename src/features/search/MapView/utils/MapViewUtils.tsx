/**
 * GoogleMapコンテナのスタイル定数
 * 横幅100%、高さ400px固定
 */
export const containerStyle = {
  width: "100%",
  height: "400px",
};
import React from "react";

const DEFAULT_CENTER = { lat: 35.6895, lng: 139.6917 };

/**
 * center管理用カスタムフック
 * center propsが渡された場合のみ地図中心座標を更新
 * @param center 地図の中心座標（lat/lng）
 * @returns 現在の地図中心座標
 */
export function useMapCenter(center?: { lat: number; lng: number }) {
  // 地図の中心座標state（初期値はDEFAULT_CENTER）
  const [mapCenter, setMapCenter] = React.useState<{
    lat: number;
    lng: number;
  }>(DEFAULT_CENTER);

  // center propsが渡された場合のみ地図中心座標を更新
  React.useEffect(() => {
    if (center) {
      // centerが指定されたら地図中心を更新
      setMapCenter(center);
    }
    // centerが未指定なら何もしない（初期値維持）
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center?.lat, center?.lng]);

  return mapCenter;
}

/**
 * 地図ロード中表示
 */
export function MapLoading() {
  return (
    <div className="w-full h-96 flex items-center justify-center">
      Loading Map...
    </div>
  );
}

/**
 * 地図ロードエラー表示
 */
export function MapLoadError() {
  return (
    <div className="w-full h-96 flex items-center justify-center text-red-500">
      地図の読み込みに失敗しました
    </div>
  );
}
