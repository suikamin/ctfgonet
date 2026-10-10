import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  FileSearchCorner,
  ShieldAlert,
  SquareArrowOutUpRight
} from "lucide-react";
import { getUpdates } from "./lib/updates";
import VulnerabilityShowcase from "./components/VulnerabilityShowcase";

export const metadata: Metadata = {
  title: "CTFで学ぶ情報セキュリティ | ctfgo.net",
  description:
    "CTFを通してWebの起源からモダン開発、コンピュータの仕組み、現代の情報セキュリティを学ぶ解説記事と資料ダウンロードプラットフォーム",
  keywords: [
    "ctfgo",
    "ctfgo.net",
    "ctf",
    "web",
    "pwn",
    "セキュリティ",
    "CTFで学ぶ",
  ],
  openGraph: {
    title: "CTFで学ぶセキュリティ | ctfgo.net",
    description:
      "CTFを通してWebの起源からモダン開発、コンピュータの仕組み、現代の情報セキュリティを学ぶ解説記事と資料ダウンロード",
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
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-start justify-start gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              href="https://blog.ctfgo.net"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 sm:px-7 sm:py-4 text-sm sm:text-base lg:text-lg font-bold bg-foreground text-background hover:opacity-90 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
            >
              <span className="pr-2">
                <SquareArrowOutUpRight size={20}/>
              </span>
              さぁ、始めよう
            </Link>

            {/* ファイルを見るボタン */}
            <Link
              href="/files?search="
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 sm:px-7 sm:py-4 text-sm sm:text-base lg:text-lg font-bold bg-background/80 hover:bg-foreground/5 text-foreground border border-border backdrop-blur-md rounded-xl shadow-sm transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
            >
              <span className="pr-2">
                <FileSearchCorner size={20} />
              </span>
              ファイルを探す
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Reality Check セクション */}
      <section className="flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-4xl space-y-10 text-center">
          {/* 見出しブロック */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-red-500/10 text-red-500 border border-red-500/20">
              <ShieldAlert className="w-4 h-4" />
              Reality Check
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.3]">
              あなたは本当に、
              <br className="sm:hidden" />
              <span className="text-blue-800 bg-clip-text">
                情報セキュリティ
              </span>
              を理解していますか？
            </h2>
          </div>

          <VulnerabilityShowcase />

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
