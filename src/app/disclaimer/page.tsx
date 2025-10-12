import Link from "next/link";
export default function DisclaimerPage() {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">免責事項</h1>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">ご利用上の注意</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            メニュー情報はAIによる自動読み取りと人力チェックを行っていますが、誤りが含まれる可能性があります。
          </li>
          <li>
            「店名
            栄養成分表示」などで検索し、最終的に各店舗の公式情報をご参照ください。
          </li>
          <li>現在は東京都の店舗のみ表示しています。</li>
          <li>登録店舗は一部チェーンのみです。</li>
        </ul>
      </section>
      <div className="mt-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ホームに戻る
        </Link>
      </div>
    </main>
  );
}
