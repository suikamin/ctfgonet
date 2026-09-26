// components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, LogIn } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className="max-w-6xl mx-auto flex justify-between items-center w-full text-foreground">
      <Link href="/" className="font-bold text-xl tracking-tight">
        CTFで学ぶWeb
      </Link>

      <div className="flex items-center gap-4">
        {/* テーマ切り替えボタン */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-md hover:bg-foreground/10 transition-colors"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>


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
