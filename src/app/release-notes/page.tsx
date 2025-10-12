import Link from "next/link";
export default function ReleaseNotesPage() {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">リリースノート</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">v1.0.0（2025/10/12）</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>外食塩分ナビ初期リリース</li>
          <li>東京都の主要チェーン対応</li>
          <li>塩分量でメニュー検索・店舗表示</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">過去の更新履歴</h2>
        <ul className="list-disc pl-6 space-y-1"></ul>
      </section>
      {/* 今後の予定セクション削除済み */}
      <div className="mt-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ホームに戻る
        </Link>
      </div>
    </main>
  );
}
