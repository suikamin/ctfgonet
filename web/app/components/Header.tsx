// components/Header.tsx
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { WhatsNewMenu } from "./WhatsNewMenu";
import { MobileNav } from "./MobileNav";
import { getUpdates } from "../lib/updates";
import { CircleQuestionMark } from "lucide-react";

export default async function Header() {
  const updates = await getUpdates();

  return (
    <div className="max-w-6xl mx-auto flex justify-between items-center w-full text-foreground">
      <div className="flex items-center gap-6 sm:gap-8">
        <Link href="/" className="font-bold text-xl tracking-tight">
          CTFで学ぶ
        </Link>

        {/* ナビゲーションリンク (PC/タブレット用) */}
        <nav className="hidden sm:flex items-center gap-4 text-sm font-medium">
          <Link
            href="https://docs.ctfgo.net"
            className="text-foreground/70 hover:text-foreground transition-colors"
          >
            Docs
          </Link>
          <Link
            href="/files"
            className="text-foreground/70 hover:text-foreground transition-colors"
          >
            Files
          </Link>
          <Link
            href="https://blog.ctfgo.net"
            className="text-foreground/70 hover:text-foreground transition-colors"
          >
            Blog
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <WhatsNewMenu items={updates} />
        <ThemeToggle />
        <Link
          href="/about"
          className="p-2 rounded-md hover:bg-foreground/10 transition-colors text-foreground"
          aria-label="サイトについて"
          title="サイトについて"
        >
          <CircleQuestionMark className="w-5 h-5" />
        </Link>
        <MobileNav />
      </div>
    </div>
  );
}

export { Header };
