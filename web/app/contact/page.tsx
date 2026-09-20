"use client";

import { useEffect } from "react";

export default function RedirectPage() {
  useEffect(() => {
    // リダイレクト先の外部サイトURLを指定
    window.location.href = "https://forms.gle/rKDfowHKmR9WmSvKA";
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        {/* 一瞬だけ画面が表示される可能性があるため、不自然じゃないローディングを置いておく */}
        <p className="text-sm text-slate-500 dark:text-slate-400 animate-pulse">
          リダイレクトしています。少々お待ちください...
        </p>
      </div>
    </div>
  );
}
