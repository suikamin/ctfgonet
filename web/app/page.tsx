import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  FileSearchCorner,
  Newspaper,
  ArrowRight,
  ShieldAlert,
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
      <section className="relative min-h-[calc(100vh-14rem)] rounded-3xl overflow-hidden border border-border bg-background flex flex-col justify-start items-start p-6 sm:p-10 md:p-14 shadow-sm">
        {/* 背景画像 & グラデーションオーバーレイ */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <Image
            src="/hero_bg.jpg"
            alt="Cybersecurity Hero Background"
            fill
            priority
            className="object-cover object-right md:object-center opacity-25 dark:opacity-40 select-none"
          />
          {/* 左側のテキスト可読性を高めるグラデーション */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        </div>

        {/* 左上コンテンツ */}
        <div className="relative z-10 max-w-2xl space-y-6 text-left">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-foreground/5 text-foreground/80 border border-border backdrop-blur-md">
              Cyber Security & Low-layer Learning
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-[1.25]">
              <span className="text-foreground">CTFで学ぶ</span>
              <br />
              <span className="inline-block bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">
                Web
              </span>
              <span className="text-foreground/30 font-light mx-2">・</span>
              <span className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
                コンピュータ
              </span>
              <br className="sm:hidden" />
              <span className="text-foreground/30 font-light mx-2 hidden sm:inline">
                ・
              </span>
              <span className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                情報セキュリティ
              </span>
            </h1>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed max-w-xl">
            Webの起源からモダン開発、
            <br />
            コンピュータ上でアプリが動く仕組み ──
            <br className="hidden sm:inline" />
            <br />
            CTF（Web / Pwn）を通じて現代の情報セキュリティを学ぶ
          </p>

          {/* メインCTAエリア */}
          <div className="pt-2 flex flex-col sm:flex-row items-center sm:items-start justify-start gap-4">
            <Link
              href="https://blog.ctfgo.net"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm sm:text-base font-bold bg-foreground text-background hover:opacity-90 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
            >
              <span className="pr-2">
                <Newspaper size={18} />
              </span>
              記事を読む
            </Link>

            {/* ファイルを見るボタン */}
            <Link
              href="/files?search="
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm sm:text-base font-bold bg-background/80 hover:bg-foreground/5 text-foreground border border-border backdrop-blur-md rounded-xl shadow-sm transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
            >
              <span className="pr-2">
                <FileSearchCorner size={18} />
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

            <p className="max-w-2xl mx-auto text-base sm:text-lg text-foreground/75 leading-relaxed">
              現代の攻撃を防ぐ鍵は、表面的なルールではなく
              <strong className="text-foreground font-semibold">
                「システムが裏側でどう動いているか」
              </strong>
              の深層理解が重要です。
            </p>
          </div>

          <VulnerabilityShowcase />

          {/* 下部メッセージ＆導線 */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-sm text-foreground/70">
              小手先のテクニックではなく、土台から理解を深めませんか？
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:opacity-80 transition-opacity underline-offset-4 hover:underline"
            >
              このサイトの思想・詳細を見る
              <ArrowRight className="w-4 h-4" />
            </Link>
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
