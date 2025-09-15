"use client";
import type { Store } from "@/types/store";
import Image from "next/image";
import React, { useState } from "react";
import InfoWindow from "./InfoWindow";
import Marker from "./Marker";

/**
 * MapView（地図本体＋ピン表示の仮UI）
 * - ダミー画像上に店舗ピン（Marker）を絶対配置
 * - 店舗リスト（stores）をpropsで受け取り、mapしてピン＋InfoWindowを表示
 * - ピンをクリックでInfoWindow（店舗情報吹き出し）を開閉
 * - GoogleMap導入時はcenter/zoom等を再追加予定
 * @param stores 店舗リスト配列
 */
// Google Mapsラッパーは後で導入予定
// import { GoogleMap, Marker } from '@react-google-maps/api';

type MapViewProps = {
  stores: Store[];
};

const MapView: React.FC<MapViewProps> = ({ stores }) => {
  // 仮のピン・InfoWindow表示用
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // 仮のピン座標（画像上の適当な位置に配置）
  const markerPositions = [
    { left: "30%", top: "40%" },
    { left: "60%", top: "30%" },
    { left: "50%", top: "70%" },
  ];

  return (
    <div className="w-full h-96 max-w-2xl max-h-80 mx-auto rounded overflow-hidden relative bg-gray-100">
      <Image
        src="https://placehold.jp/800x400.png"
        alt="地図ダミー"
        width={800}
        height={400}
        className="w-full h-full object-cover"
        priority
      />
      {/* 仮のピンを絶対配置で重ねる */}
      {stores.map((store, i) => (
        <div
          key={store.id}
          style={{
            position: "absolute",
            ...markerPositions[i % markerPositions.length],
            zIndex: 10,
          }}
          onClick={() => setSelectedId(store.id)}
          className="cursor-pointer"
        >
          <Marker store={store} />
          {selectedId === store.id && (
            <InfoWindow store={store} onClose={() => setSelectedId(null)} />
          )}
        </div>
      ))}
    </div>
  );
};

export default MapView;
