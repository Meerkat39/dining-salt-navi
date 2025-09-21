/**
 * チェーン名を指定して、
 * 1. チェーンテーブルに登録（id自動生成）
 * 2. Google Places APIで店舗情報取得
 * 3. 取得した店舗情報をStoreテーブルにchain_id紐付けで一括登録
 * を一括実行する統合スクリプト雛形
 */
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
dotenv.config({ path: ".env.local" });

const prisma = new PrismaClient();

const chainName = process.argv[2];
if (!chainName) {
  console.error("チェーン名を指定してください");
  process.exit(1);
}

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const LOCATION = "35.681236,139.767125"; // 東京駅
const RADIUS = 30000; // 30km
const QUERY = chainName;

// Google Places APIの店舗情報レスポンス型
interface PlaceResult {
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  place_id: string;
}

async function main() {
  // 1. チェーンDB登録
  const chain = await prisma.chain.create({
    data: {
      id: uuidv4(),
      name: chainName,
    },
  });
  console.log("チェーン登録完了:", chain);

  // 2. Google Places APIで店舗情報取得
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
    QUERY
  )}&location=${LOCATION}&radius=${RADIUS}&language=ja&key=${API_KEY}`;
  const res = await axios.get(url);
  if (res.data.status !== "OK") {
    console.error("Google APIエラー:", res.data.status, res.data.error_message);
    process.exit(1);
  }
  const stores = (res.data.results as PlaceResult[]).map((store) => ({
    id: uuidv4(),
    chain_id: chain.id,
    name: store.name,
    address: store.formatted_address,
    lat: store.geometry.location.lat,
    lng: store.geometry.location.lng,
    place_id: store.place_id,
  }));

  // 3. 店舗DB一括登録
  for (const store of stores) {
    await prisma.store.create({ data: store });
    console.log("店舗登録:", store.name);
  }
  console.log(`全店舗登録完了: ${stores.length}件`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
