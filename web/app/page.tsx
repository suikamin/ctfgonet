import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  ShieldAlert,
  Folder,
  Newspaper,
  Layers,
  Terminal,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { getUpdates } from "./lib/updates";
import VulnerabilityShowcase from "./components/VulnerabilityShowcase";

export const metadata: Metadata = {
  title: "CTFで学ぶ情報セキュリティ | ctfdemanabu",
  description:
    "CTFを通してWebの起源からモダン開発、コンピュータの仕組み、現代の情報セキュリティを学ぶ",
  keywords: [
    "ctf",
    "web",
    "pwn",
    "セキュリティ",
    "CTFで学ぶ",
    "ctfgo",
    "ctfgo.net",
    "ctfdemanabu"
  ],
  openGraph: {
    title: "CTFで学ぶセキュリティ | ctfdemanabu",
    description:
      "CTFを通してWebの起源からモダン開発、コンピュータの仕組み、現代の情報セキュリティを学ぶ",
    type: "website",
  },
};

export default async function HomePage() {
  const updates = await getUpdates();
  return (
    <div className="space-y-20 sm:space-y-28 md:space-y-36 pb-12">
      {/* 1. ヒーローセクション */}
      <section className="relative -mx-4 -mt-4 sm:mx-0 sm:mt-0 min-h-[calc(100svh-4.5rem)] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[640px] sm:max-h-[760px] rounded-none sm:rounded-3xl overflow-hidden border-b sm:border border-border bg-background flex flex-col justify-center items-start p-6 sm:p-10 md:p-14 lg:p-16 shadow-sm">
        {/* 背景画像 & グラデーションオーバーレイ */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <Image
            src="/hero_bg.jpg"
            alt="Cybersecurity Hero Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30 dark:opacity-45 select-none"
          />
          {/* モバイル・デスクトップそれぞれの画面特性に合わせたグラデーションオーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/95 sm:bg-gradient-to-r sm:from-background sm:via-background/85 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        </div>

        {/* コンテンツエリア */}
        <div className="relative z-10 max-w-2xl lg:max-w-3xl xl:max-w-4xl space-y-6 lg:space-y-8 text-left w-full my-auto sm:my-0">
          <div className="space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-full bg-foreground/5 text-foreground/80 border border-border backdrop-blur-md">
              Cyber Security & Low-layer Learning
            </div>

            <h1 className="font-extrabold tracking-tight leading-[1.2] sm:leading-[1.2]">
              <span className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground/80 font-bold block mb-1.5 sm:mb-2 tracking-normal">
                CTFで学ぶ
              </span>
              <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[3.75rem] font-extrabold flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-3 sm:gap-y-2">
                <span className="inline-block bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">
                  Web
                </span>
                <span className="text-foreground/30 font-light text-xl sm:text-3xl">・</span>
                <span className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent whitespace-nowrap">
                  コンピュータ
                </span>
                <span className="text-foreground/30 font-light text-xl sm:text-3xl">・</span>
                <span className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent whitespace-nowrap">
                  情報セキュリティ
                </span>
              </span>
            </h1>
          </div>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/85 leading-relaxed max-w-xl lg:max-w-2xl">
            Webの起源からモダン開発、
            <br className="hidden xs:inline" />
            コンピュータ上でアプリが動く仕組み ──
            <br />
            <span className="mt-1 block">
              CTF（Web / Pwn）を通じて現代の情報セキュリティを学ぶ
            </span>
          </p>

          {/* メインCTAエリア */}
          <div className="pt-2 flex flex-wrap items-center justify-start gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              href="https://docs.ctfdemanabu.com"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 sm:px-7 sm:py-4 text-sm sm:text-base lg:text-lg font-bold bg-foreground text-background hover:opacity-90 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
            >
              さぁ、始めよう
            </Link>

            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                href="/files?search="
                title="ファイルを探す"
                aria-label="ファイルを探す"
                className="inline-flex items-center justify-center h-[48px] w-[48px] sm:h-[52px] sm:w-[52px] lg:h-[60px] lg:w-[60px] bg-background/80 hover:bg-foreground/10 text-foreground/85 hover:text-foreground border border-border backdrop-blur-md rounded-xl shadow-sm transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 shrink-0"
              >
                <Folder className="w-5 h-5 lg:w-6 lg:h-6" />
              </Link>
              <Link
                href="https://blog.ctfdemanabu.com"
                title="記事を読む (Blog)"
                aria-label="記事を読む"
                className="inline-flex items-center justify-center h-[48px] w-[48px] sm:h-[52px] sm:w-[52px] lg:h-[60px] lg:w-[60px] bg-background/80 hover:bg-foreground/10 text-foreground/85 hover:text-foreground border border-border backdrop-blur-md rounded-xl shadow-sm transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 shrink-0"
              >
                <Newspaper className="w-5 h-5 lg:w-6 lg:h-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Reality Check セクション */}
      <section className="flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-4xl space-y-12 sm:space-y-16">
          {/* 見出しブロック */}
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-red-500/10 text-red-500 border border-red-500/20">
              <ShieldAlert className="w-4 h-4" />
              Reality Check
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.3]">
              あなたは本当に、
              <br className="sm:hidden" />
              <span className="inline-block bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 dark:from-blue-400 dark:via-indigo-300 dark:to-sky-400 bg-clip-text text-transparent px-1">
                情報セキュリティ
              </span>
              を理解していますか？
            </h2>
          </div>

          <VulnerabilityShowcase />

          {/* プラットフォームの目指すもの（メッセージカード） */}
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-foreground/[0.04] via-background to-foreground/[0.02] p-6 sm:p-8 md:p-10 shadow-sm">
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-foreground/10 text-foreground/80 border border-border">
                <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                Our Concept
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground leading-snug">
                「コンピュータ・Webはどうやって生まれ、コンピュータは裏側でどう動いているのか」
              </h3>
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed max-w-3xl pt-1">
                <strong className="text-foreground font-bold">ctfgo.net</strong>{" "}
                は、CTF（Capture The
                Flag）の実践を通して、現代に必要な情報セキュリティの基礎を根本から学ぶための学習アーカイブです。
              </p>
            </div>
          </div>

          {/* 2つの柱（仕組みの理解 & 実践） */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. 表面的な知識ではなく仕組みから理解する */}
            <div className="flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-background border border-border shadow-sm hover:border-foreground/20 transition-colors">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center border border-sky-500/20">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                    表面的な知識ではなく、「仕組み」から理解する
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed mt-2">
                    セキュリティの脆弱性を学ぶとき、ツールの使い方や表面的な対策手順だけを覚えても、本当の理解にはつながりません。
                  </p>
                </div>

                <div className="space-y-2.5 pt-1">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-foreground/[0.03] border border-border/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0" />
                    <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed">
                      ブラウザの向こう側で、Web技術がどう発展してきたのか
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-foreground/[0.03] border border-border/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0" />
                    <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed">
                      画面の裏側で、コンピュータがどのようにデータを処理しているのか
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-border/70">
                <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">
                  「なぜ動くのか」「なぜ穴が生まれるのか」という土台から紐解くことで、変化の早い現代でも応用が利く本質的な知識が身につくと考えています。
                </p>
              </div>
            </div>

            {/* 2. CTFを通して手を動かして学ぶ */}
            <div className="flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-background border border-border shadow-sm hover:border-foreground/20 transition-colors">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                    CTFを通して、手を動かして学ぶ
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-2.5">
                    <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                      Web
                    </span>
                    <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      Pwn（低レイヤ・バイナリ）
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed mt-3">
                    いきなり難しい専門用語に圧倒されることなく、実際に問題を解きながら、システムの裏側を見る面白さを体験しましょう。
                  </p>
                  <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed mt-2.5">
                    公開している解説記事やスライド資料が、セキュリティやコンピュータの仕組みに興味を持つ方の最初の一歩になれば幸いです。
                  </p>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-border/70 flex flex-wrap items-center gap-3">
                <Link
                  href="https://blog.ctfgo.net"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-foreground hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  記事を読む (Docs)
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-foreground/30">•</span>
                <Link
                  href="/files?search="
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors"
                >
                  資料を探す
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What's New セクション */}
      <section className="flex flex-col items-center px-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <span className="text-xs font-mono tracking-wider text-foreground/60 uppercase block mb-1">
              Updates
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              What&apos;s New
            </h2>
            <p className="text-sm text-foreground/60 mt-1">
              お知らせ・更新情報
            </p>
          </div>

          <div className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden">
            {updates.length === 0 ? (
              <div className="p-12 text-center text-sm text-foreground/60">
                現在お知らせはありません
              </div>
            ) : (
              <ul className="divide-y divide-border text-sm">
                {updates.map((item) => (
                  <li
                    key={item.id}
                    className="p-4 sm:p-5 hover:bg-foreground/[0.03] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 min-w-0">
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-mono text-foreground/60">
                          {item.date}
                        </span>
                        {item.category && (
                          <span className="inline-block px-2 py-0.5 text-[11px] rounded bg-foreground/10 text-foreground font-medium">
                            {item.category}
                          </span>
                        )}
                      </div>
                      {item.url ? (
                        <Link
                          href={item.url}
                          className="font-medium text-foreground hover:underline truncate"
                        >
                          {item.title}
                        </Link>
                      ) : (
                        <span className="font-medium text-foreground truncate">
                          {item.title}
                        </span>
                      )}
                    </div>

                    {item.url && (
                      <Link
                        href={item.url}
                        className="text-xs text-foreground/50 hover:text-foreground shrink-0 inline-flex items-center gap-1 self-end sm:self-auto transition-colors"
                      >
                        詳細を見る →
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
