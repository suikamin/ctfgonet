import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CTFGo - 共有ドキュメント・ファイル検索プラットフォーム",
  description:
    "CTFGoは必要なドキュメントやファイルを素早く検索・ダウンロードできるファイル共有プラットフォームです。安全かつスピーディに目的のファイルへアクセスできます。",
  keywords: ["ファイル検索", "ドキュメント共有", "CTFGo", "資料ダウンロード"],
  openGraph: {
    title: "CTFGo - 共有ドキュメント・ファイル検索プラットフォーム",
    description: "必要なドキュメントやファイルを素早く検索・ダウンロード。",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      {/* ヒーローセクション */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="inline-block bg-foreground/10 text-foreground font-semibold text-sm px-3 py-1 rounded-full border border-border">
            Document Sharing Platform
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            必要なファイルに、
            <br className="hidden sm:inline" />
            <span className="opacity-90">迅速かつ安全</span>にアクセス
          </h1>

          <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto">
            CTFGoは、暗号化とアクセスコントロールに対応したファイル共有プラットフォームです。
            タイトルやタグから目的の資料をすぐに検索できます。
          </p>

          {/* メインCTA */}
          <div className="pt-4">
            <Link
              href="/files"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold bg-foreground text-background hover:opacity-90 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
            >
              ▶　Get Started
            </Link>
          </div>
        </div>

        {/* 特徴紹介（テーマ変数に対応したカードデザイン） */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl text-left">
          <div className="bg-background p-6 rounded-2xl border border-border shadow-sm">
            <div className="text-2xl mb-3">🔍</div>
            <h2 className="text-lg font-bold mb-2">高速タグ検索</h2>
            <p className="text-sm opacity-70">
              キーワードやタグ検索により、必要なドキュメントを即座に見つけ出すことができます。
            </p>
          </div>

          <div className="bg-background p-6 rounded-2xl border border-border shadow-sm">
            <div className="text-2xl mb-3">🔒</div>
            <h2 className="text-lg font-bold mb-2">パスワード保護</h2>
            <p className="text-sm opacity-70">
              保護されたファイルは安全なハッシュ照合により、権限のあるユーザーのみ安全に取得可能です。
            </p>
          </div>

          <div className="bg-background p-6 rounded-2xl border border-border shadow-sm">
            <div className="text-2xl mb-3">⚡</div>
            <h2 className="text-lg font-bold mb-2">スムーズなダウンロード</h2>
            <p className="text-sm opacity-70">
              ワンクリックで即時ダウンロード。無駄な画面遷移なくストレスフリーで利用できます。
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
