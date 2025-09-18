import { Store } from "../../../types/store";

export const stores: Store[] = [
  ...Array.from({ length: 100 }, (_, i) => {
    // 都内エリア（渋谷・新宿・池袋・銀座・品川）周辺でランダム分布
    const baseLatLng = [
      { lat: 35.6581, lng: 139.7017 }, // 渋谷
      { lat: 35.6906, lng: 139.7004 }, // 新宿
      { lat: 35.7289, lng: 139.71 }, // 池袋
      { lat: 35.6717, lng: 139.765 }, // 銀座
      { lat: 35.6285, lng: 139.74 }, // 品川
    ];
    const base = baseLatLng[i % 5];
    // ±0.05度以内でランダム分布（より広範囲にばらけさせる）
    const lat = base.lat + (Math.random() - 0.5) * 0.1;
    const lng = base.lng + (Math.random() - 0.5) * 0.1;
    return {
      id: String(1000 + i),
      chain_id: String((i % 5) + 1),
      name: `サンプル店${i + 1} ${
        ["渋谷", "新宿", "池袋", "銀座", "品川"][i % 5]
      }`,
      lat,
      lng,
    };
  }),
];
