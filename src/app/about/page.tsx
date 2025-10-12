import Link from "next/link";
export default function AboutPage() {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">外食塩分ナビについて</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">サービス概要・背景</h2>
        <p className="mb-2">
          外食塩分ナビは、外食チェーンのメニューを「塩分量」で絞り込んで検索できるWebアプリです。
          <br />
          腎臓病や高血圧などで減塩制限が必要な方、健康志向の方が外食時でも安心してメニューを選べるようサポートします。
          <br />
        </p>
        <p>
          各社ごとにバラバラに公開されている栄養情報をまとめて、塩分量で比較・検索できる仕組みを提供しています。
          <br />
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">主な特徴・機能</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>エリア・現在地から近隣店舗を検索</li>
          <li>塩分量でメニューを絞り込み、地図上に店舗を表示</li>
          <li>店舗ごとのメニュー詳細・塩分量表示</li>
          <li>今後、メニュー名からの横断検索や店舗追加も予定</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">今後の展望</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>掲載チェーン・店舗・メニューの拡充（順次追加）</li>
          <li>全国エリア対応（現在は東京都のみ）</li>
          <li>メニュー名からの横断検索機能</li>
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
