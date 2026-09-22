import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CTFで学ぶWeb - ctfgo.net",
  description: "WebやCTFの学習記録・ファイル共有プラットフォーム",
  keywords: ["ctfgo", "ctfgo.net", "ctf", "web"],
  openGraph: {
    title: "CTFで学ぶWeb - ctfgo.net",
    description: "Webに関する資料をダウンロード",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div className="space-y-12 snap-y snap-mandatory">
      {/* 1. ヒーローセクション */}
      <section className="min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center text-center px-4 snap-start">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="inline-block bg-foreground/10 text-foreground font-semibold text-sm px-3 py-1 rounded-full border border-border">
            Learning Archive (Pre-release)
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Webについて、
            <br className="hidden sm:inline" />
            <span className="opacity-90">CTFで、</span>勉強する。
          </h1>

          <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto">
            CTFやWebに関する記事の閲覧、資料のダウンロードができます。
            <br className="hidden sm:inline" />
            ※ダウンロードについては、私的利用に限ります
          </p>

          {/* メインCTAエリア */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* 1. 未リリースの記事まとめサイトへのボタン（準備中UI） */}
            <div className="relative w-full sm:w-auto">
              <button
                disabled
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 text-base font-medium bg-foreground/5 text-foreground/40 border border-border rounded-xl cursor-not-allowed transition-all"
                title="記事まとめサイトは準備中です"
              >
                <span className="pr-2">▶</span>記事を読む（準備中）
              </button>
            </div>

            {/* ファイルを見るボタン */}
            <Link
              href="/files"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold bg-foreground text-background hover:opacity-90 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
            >
              <span className="pr-2">▶</span>ファイルを見る
            </Link>
          </div>
        </div>
      </section>

      {/* 2. What's New セクション（準備中UI） */}
      <section className="min-h-[calc(100vh-10rem)] flex flex-col justify-center items-center px-4 snap-start">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-8">
            <span className="text-xs font-mono tracking-wider opacity-60 uppercase block mb-1">
              Updates
            </span>
            <h2 className="text-2xl md:text-3xl font-bold">What's New</h2>
            <p className="text-sm opacity-60 mt-1">お知らせ・更新情報</p>
          </div>

          <div className="bg-background border border-border rounded-2xl p-8 sm:p-12 text-center shadow-sm relative overflow-hidden">
            <div className="space-y-4 max-w-md mx-auto">
              <span className="inline-block bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold px-3 py-1 rounded-full">
                Coming Soon
              </span>
              <h3 className="text-lg font-bold">お知らせ配信機能を準備中</h3>

              {/* スケルトン風のダミー表示（更新ログが並ぶイメージ） */}
              <div className="pt-4 space-y-2.5 opacity-30 pointer-events-none">
                <div className="h-9 bg-foreground/10 rounded-lg w-full flex items-center px-4 justify-between">
                  <span className="h-2.5 bg-foreground/30 rounded w-16"></span>
                  <span className="h-2.5 bg-foreground/30 rounded w-44 sm:w-64"></span>
                </div>
                <div className="h-9 bg-foreground/10 rounded-lg w-full flex items-center px-4 justify-between">
                  <span className="h-2.5 bg-foreground/30 rounded w-16"></span>
                  <span className="h-2.5 bg-foreground/30 rounded w-36 sm:w-48"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. About me セクション */}
      <section className="min-h-[calc(100vh-10rem)] flex flex-col justify-end items-center px-4 snap-start">
        <div className="w-full max-w-3xl bg-foreground/5 p-8 md:p-10 rounded-2xl border border-border shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="flex-shrink-0">
              <img
                src="/avatar.jpg"
                alt="運営者のアイコン"
                className="w-24 h-24 rounded-full object-cover grayscale-[20%] border-2 border-border"
              />
            </div>

            <div className="flex-grow text-center sm:text-left space-y-3">
              <div>
                <span className="text-xs font-mono tracking-wider opacity-60 uppercase block mb-1">
                  About Author
                </span>
                <h2 className="text-2xl font-bold inline-block mr-2">
                  二個で百円
                </h2>
                <span className="text-xs opacity-60">/ 運営・開発</span>
              </div>

              <p className="text-xs md:text-sm leading-relaxed opacity-80">
                地方国立大学生。工学部情報系専攻。
                <br />
                情報数学がメイン。最近は通信・Web開発に関心が高まる。
                <br />
                座右の銘は、「好きこそものの上手なれ」
                <br />
                数理、テクノロジーに関して、記事、備忘録、CTFのWriteUpを書いてまとめています。{" "}
                <br />
                コンタクトは、各種SNSまたは、ContactよりGoogleFormにお願いします。
              </p>

              <div className="pt-2 flex justify-center sm:justify-start gap-4 text-xs font-medium">
                <a
                  href="https://github.com/suikamin/ctfgonet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition underline underline-offset-4"
                >
                  GitHub
                </a>
                <a
                  href="https://github.com/suikamin/ctfgonet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition underline underline-offset-4"
                >
                  X (旧Twitter)
                </a>
                <a
                  href="https://github.com/suikamin/ctfgonet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition underline underline-offset-4"
                >
                  YouTube
                </a>
                <a
                  href="https://github.com/suikamin/ctfgonet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition underline underline-offset-4"
                >
                  Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
