import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
dotenv.config({ path: ".env.local" });

/**
 * チェーン店舗データ取得スクリプト（Google Places API使用例）
 *
 * 概要:
 *   指定したチェーン名の店舗情報をGoogle Places APIから取得し、
 *   src/data/チェーン名/stores.json に保存します。
 *   chains.jsonも自動更新されます。
 *
 * 実行方法:
 *   npx ts-node src/data/scripts/fetch_chain_stores.ts [チェーン名]
 *   例: npx ts-node src/data/scripts/fetch_chain_stores.ts マクドナルド
 *   ※チェーン名はコマンドライン引数で必須指定

 * 必要な環境変数:
 *   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ... Google Places APIキー（.env.local推奨）
 *
 * 取得結果:
 *   src/data/チェーン名/stores.json ... 店舗データ
 *   src/data/chains.json ... チェーン情報（id, name）
 *
 * 拡張性:
 *   他チェーンにも流用可能。チェーン名を切り替えて実行するだけ。
 */

// チェーン名（コマンドライン引数で指定、必須）
const CHAIN_NAME = process.argv[2];
if (!CHAIN_NAME) {
  console.error(
    "チェーン名をコマンドライン引数で指定してください。例: npx ts-node src/data/scripts/fetch_chain_stores.ts マクドナルド"
  );
  process.exit(1);
}
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const LOCATION = "35.681236,139.767125"; // 東京駅
const RADIUS = 30000; // 30km
const QUERY = CHAIN_NAME;
const DATA_DIR = path.join("src", "data", CHAIN_NAME);
const CHAINS_PATH = path.join("src", "data", "chains.json");
const STORES_PATH = path.join(DATA_DIR, "stores.json");

// チェーン情報型
type Chain = {
  id: string;
  name: string;
};

// Google Places APIの店舗情報レスポンス型
type PlaceResult = {
  name: string; // 店舗名
  formatted_address: string; // 住所
  geometry: {
    location: {
      lat: number; // 緯度
      lng: number; // 経度
    };
  };
  place_id: string; // Googleの店舗ID
};

async function fetchStores() {
  // ディレクトリ作成
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // chains.jsonの読み込み・更新
  let chains: Chain[] = [];
  if (fs.existsSync(CHAINS_PATH)) {
    chains = JSON.parse(fs.readFileSync(CHAINS_PATH, "utf-8"));
  }
  // 既存チェーン検索
  let chain: Chain | undefined = chains.find((c) => c.name === CHAIN_NAME);
  if (!chain) {
    chain = { id: uuidv4(), name: CHAIN_NAME };
    chains.push(chain);
    fs.writeFileSync(CHAINS_PATH, JSON.stringify(chains, null, 2), "utf-8");
    console.log(`Added chain: ${CHAIN_NAME} (${chain.id})`);
  } else {
    console.log(`Chain already exists: ${CHAIN_NAME} (${chain.id})`);
  }

  // APIリクエストURLを生成
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
    QUERY
  )}&location=${LOCATION}&radius=${RADIUS}&language=ja&key=${API_KEY}`;

  // Google Places APIへリクエスト
  const res = await axios.get(url);

  // 詳細ログ出力
  console.log("API status:", res.data.status);
  if (res.data.error_message) {
    console.log("API error_message:", res.data.error_message);
  }

  // レスポンスから必要な店舗情報のみ抽出
  const stores = ((res.data.results as PlaceResult[]) || []).map((store) => ({
    id: uuidv4(),
    chain_id: chain!.id,
    name: store.name,
    address: store.formatted_address,
    lat: store.geometry.location.lat,
    lng: store.geometry.location.lng,
    place_id: store.place_id,
  }));

  // JSONファイルとして保存
  fs.writeFileSync(STORES_PATH, JSON.stringify(stores, null, 2), "utf-8");
  // 保存件数を表示
  console.log(`Saved: ${stores.length} stores to ${STORES_PATH}`);
}

// メイン処理実行
fetchStores().catch(console.error);
