"use client";

import { useEffect } from "react";

export default function RedirectPage() {
  useEffect(() => {
    // リダイレクト先の外部サイトURLを指定
    window.location.href = "https://forms.gle/rKDfowHKmR9WmSvKA";
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center">
        {/* リダイレクト中のローディング表示 */}
        <p className="text-sm opacity-60 animate-pulse">
          リダイレクトしています。少々お待ちください...
        </p>
      </div>
    </div>
  );
}
