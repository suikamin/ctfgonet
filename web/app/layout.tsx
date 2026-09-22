import "@/app/globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Zen_Kaku_Gothic_New } from "next/font/google";

const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["500", "700"],
  subsets: ["latin"],
  preload: false,
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="dark">
      <body
        className={`${zenKaku.className} bg-background text-foreground flex h-screen flex-col min-h-screen transition-colors duration-200`}
      >
        {/* ヘッダー外枠：テーマ変数と不透明度でバックドロップブラーを適用 */}
        <div className="border-b border-border p-4 sticky top-0 bg-background/80 backdrop-blur-md z-50 flex-shrink-0">
          <Header />
        </div>

        <main className="flex-grow w-full max-w-6xl mx-auto p-4 md:p-8">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
