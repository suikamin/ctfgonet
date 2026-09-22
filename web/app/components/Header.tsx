// components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Lock } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);

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

        {/* 管理画面メニューボタン */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-1 p-1 rounded-md text-sm hover:bg-foreground/10 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg py-1 z-50">
              <Link
                href="/admin"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-foreground/10 text-foreground transition-colors"
              >
                <Lock size={14} /> 管理画面
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
