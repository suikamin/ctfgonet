// components/Header.tsx
import Link from "next/link";
import { LogIn } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { WhatsNewMenu } from "./WhatsNewMenu";
import { getUpdates } from "../lib/updates";

export default async function Header() {
  const updates = await getUpdates();

  return (
    <div className="max-w-6xl mx-auto flex justify-between items-center w-full text-foreground">
      <Link href="/" className="font-bold text-xl tracking-tight">
        CTFで学ぶWeb
      </Link>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* お知らせ・更新履歴 (What's new) */}
        <WhatsNewMenu items={updates} />

        {/* テーマ切り替えボタン */}
        <ThemeToggle />

        <Link
          href="/admin"
          className="flex gap-2 items-center p-2 rounded-sm hover:bg-foreground/10 text-foreground transition-colors"
        >
          <LogIn size={20} /> Login
        </Link>
      </div>
    </div>
  );
}

export { Header };
