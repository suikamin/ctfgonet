// components/Header.tsx
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { WhatsNewMenu } from "./WhatsNewMenu";
import { getUpdates } from "../lib/updates";

export default async function Header() {
  const updates = await getUpdates();

  return (
    <div className="max-w-6xl mx-auto flex justify-between items-center w-full text-foreground">
      <div className="flex items-center gap-6 sm:gap-8">
        <Link href="/" className="font-bold text-xl tracking-tight">
          CTFで学ぶ
        </Link>

        {/* ナビゲーションリンク */}
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link
            href="https://blog.ctfgo.net"
            className="text-foreground/70 hover:text-foreground transition-colors"
          >
            Article
          </Link>
          <Link
            href="/files"
            className="text-foreground/70 hover:text-foreground transition-colors"
          >
            Files
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <WhatsNewMenu items={updates} />
        <ThemeToggle />
      </div>
    </div>
  );
}

export { Header };
