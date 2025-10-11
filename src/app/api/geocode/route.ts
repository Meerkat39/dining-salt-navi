import { NextRequest } from "next/server";

// 簡易レートリミット用（本番はRedis等推奨）
const rateLimitMap = new Map<string, number[]>();

// 指定IPのリクエスト回数が制限内か判定する関数
function checkRateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now(); // 現在時刻（ミリ秒）
  const timestamps = rateLimitMap.get(ip) || []; // そのIPの過去リクエスト時刻一覧
  const recent = timestamps.filter((ts) => now - ts < windowMs); // windowMs以内のリクエストのみ抽出
  if (recent.length >= limit) return false; // 制限回数を超えていればfalse
  recent.push(now); // 今回のリクエスト時刻を追加
  rateLimitMap.set(ip, recent); // 更新した時刻リストを保存
  return true; // 制限内ならtrue
}

/**
 * /api/geocode
 * フロントから地名・住所を受け取り、サーバー側でGoogle Maps Geocoding APIを呼び出して座標を返すAPI。
 * APIキーはサーバー側環境変数（NEXT_PRIVATE_GOOGLE_MAPS_API_KEY）で管理。
 * 入力値バリデーション・サニタイズも実施。
 * @param {NextRequest} req - Next.jsのリクエストオブジェクト
 * @returns {Response} 座標情報またはエラー内容をJSONで返す
 */
export async function POST(req: NextRequest) {
  // IPアドレス取得（x-forwarded-for優先）
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  // 1分間に5回まで許可
  if (!checkRateLimit(ip, 5, 60 * 1000)) {
    return new Response(
      JSON.stringify({ error: "リクエストが多すぎます（1分間に5回まで）" }),
      { status: 429 }
    );
  }
  // リクエストボディからareaName（地名・住所）を取得
  const body = await req.json();
  const areaName = (body?.areaName || "").trim();

  // バリデーション：未入力チェック
  if (!areaName) {
    return new Response(JSON.stringify({ error: "エリア名は必須です" }), {
      status: 400,
    });
  }
  // バリデーション：文字数制限（50文字まで許容）
  if (areaName.length > 50) {
    return new Response(
      JSON.stringify({ error: "エリア名は50文字以内で入力してください" }),
      { status: 400 }
    );
  }
  // バリデーション：使用可能文字種のみ許可（日本語・英数字・一部記号）
  if (
    !/^[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}a-zA-Z0-9 　\-ー－\uFF10-\uFF19]+$/u.test(
      areaName
    )
  ) {
    return new Response(
      JSON.stringify({ error: "使用できない文字が含まれています" }),
      { status: 400 }
    );
  }
  // Google Maps Geocoding APIキーはサーバー用（GOOGLE_MAPS_SERVER_KEY）を利用
  const apiKey = process.env.GOOGLE_MAPS_SERVER_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Google Maps サーバー用APIキーが未設定です" }),
      { status: 500 }
    );
  }
  // Geocoding APIのURLを生成
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    areaName
  )}&key=${apiKey}`;
  try {
    // Google Maps Geocoding APIへリクエスト
    const apiRes = await fetch(url);
    if (!apiRes.ok) throw new Error("ジオコーディングAPIリクエスト失敗");
    const data = await apiRes.json();
    // APIレスポンスのステータス・結果チェック
    if (data.status !== "OK" || !data.results?.length) {
      return new Response(
        JSON.stringify({ error: "該当エリアが見つかりません" }),
        { status: 404 }
      );
    }
    // 最初の候補の座標情報を抽出
    const { lat, lng } = data.results[0].geometry.location;
    return new Response(JSON.stringify({ lat, lng }), { status: 200 });
  } catch (err) {
    // API通信や処理エラー時
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "APIエラー",
      }),
      { status: 500 }
    );
  }
}
