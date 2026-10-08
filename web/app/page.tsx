import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {FileSearchCorner, Newspaper} from "lucide-react"
import { getUpdates } from "./lib/updates";

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

export default async function HomePage() {
  const updates = await getUpdates();
  return (
    <div className="space-y-12 snap-y snap-mandatory">
      {/* 1. ヒーローセクション */}
      <section className="min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center text-center px-4 snap-start">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="inline-block bg-foreground/10 text-foreground font-semibold text-sm px-3 py-1 rounded-full border border-border">
            Learning Archive
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Webについて、
            <br className="hidden sm:inline" />
            <span className="opacity-90">CTFで、</span>勉強しよう！
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
                <span className="pr-2"><Newspaper/></span>記事を読む（準備中）
              </button>
            </div>

            {/* ファイルを見るボタン */}
            <Link
              href="/files?search="
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold bg-foreground text-background hover:opacity-90 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
            >
              <span className="pr-2"><FileSearchCorner/></span>ファイルを探す
            </Link>
          </div>
        </div>
      </section>

      {/* 2. What's New セクション */}
      <section className="min-h-[calc(100vh-10rem)] flex flex-col items-center px-4 snap-start">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-8">
            <span className="text-xs font-mono tracking-wider opacity-60 uppercase block mb-1">
              Updates
            </span>
            <h2 className="text-2xl md:text-3xl font-bold">What's New</h2>
            <p className="text-sm opacity-60 mt-1">お知らせ・更新情報</p>
          </div>

          <div className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden">
            {updates.length === 0 ? (
              <div className="p-12 text-center text-sm opacity-60">
                現在お知らせはありません
              </div>
            ) : (
              <ul className="divide-y divide-border text-sm">
                {updates.map((item) => (
                  <li
                    key={item.id}
                    className="p-4 sm:p-5 hover:bg-foreground/5 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 min-w-0">
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-mono opacity-60">
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

        <div className="w-full mt-32 border-t border-border/30 pt-12 pb-16 opacity-75 hover:opacity-100 transition-opacity">
          <div className="max-w-3xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* アイコン */}
              <div className="flex-shrink-0">
                <Image
                  src="/author_icon.jpg"
                  alt="運営者のアイコン"
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover grayscale-[30%] border border-border"
                />
              </div>

              {/* 右側コンテンツ領域 */}
              <div className="flex-grow space-y-3 text-center sm:text-left">
                {/* 名前・肩書 */}
                <div>
                  <span className="text-[10px] font-mono tracking-widest opacity-50 uppercase block mb-0.5">
                    About Author
                  </span>
                  <h2 className="text-xl font-bold inline-block mr-2 text-foreground/90">
                    二個で百円
                  </h2>
                  <span className="text-xs opacity-50">/ 運営・開発</span>
                </div>

                {/* 2. リンク類 */}
                <div className="pt-1 flex flex-wrap justify-center sm:justify-start gap-4 text-xs font-medium opacity-80">
                  <a
                    href="https://github.com/suikamin/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-100 transition underline underline-offset-4"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://x.com/nikodehyakuen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-100 transition underline underline-offset-4"
                  >
                    X (旧Twitter)
                  </a>
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-100 transition underline underline-offset-4"
                  >
                    YouTube - 準備中 -
                  </a>
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-100 transition underline underline-offset-4"
                  >
                    Discord - 準備中 -
                  </a>
                  <Link
                    href={"/about"}
                    className="hover:opacity-100 transition underline underline-offset-4"
                  >
                    More about me
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
