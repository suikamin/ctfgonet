import "@/app/globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { icons } from "lucide-react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="dark">
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 flex h-screen flex-col min-h-screen transition-colors duration-200">
        <div className="border-b border-slate-200 dark:border-slate-800 p-4 sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-50 flex-shrink-0">
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
