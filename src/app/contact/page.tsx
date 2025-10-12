import Link from "next/link";
export default function ContactPage() {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">お問い合わせ</h1>
      <section className="mb-6">
        <p>
          ご意見・ご要望・不具合報告などは、下記Googleフォームよりお送りください。
          <br />
          ※Googleフォームは外部サービスのため、送信内容はGoogle側で管理されます。
        </p>
        <div className="my-8">
          {/* Googleフォーム埋め込み例。URLが決まり次第 src を差し替えてください */}
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSew3l3Ctaa_usTcOUXF5yJ3ssz2gowaDzutNo1mHRkjDvcZow/viewform?embedded=true"
            style={{ width: "100%", maxWidth: "1000px", minWidth: "320px" }}
            height="800"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="お問い合わせフォーム"
          >
            読み込んでいます…
          </iframe>
        </div>
        <p>
          フォームが表示されない場合は、
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSew3l3Ctaa_usTcOUXF5yJ3ssz2gowaDzutNo1mHRkjDvcZow/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            こちら
          </a>
          から直接アクセスしてください。
        </p>
      </section>
      <div className="mt-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ホームに戻る
        </Link>
      </div>
    </main>
  );
}
