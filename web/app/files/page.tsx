// page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Search,
  FileText,
  FileImage,
  FileAudio,
  FileVideo,
  FileCode,
  File,
  LockKeyhole
} from "lucide-react";
import FileModal from "../components/FileModal";

interface Document {
  uuid: string;
  title: string;
  tags: string;
  extension: string;
  created_at?: string;
  comment: string;
  isProtected?: boolean | number;
}

const getFileIcon = (extension: string) => {
  const ext = extension.toLowerCase();
  const classname: string = "w-full h-24 rounded flex flex-col";

  if (ext === ".pdf" || ext === ".txt" || ext === ".md") {
    return <FileText className={classname} />;
  }
  if (
    [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".ico"].includes(ext)
  ) {
    return <FileImage className={classname} />;
  }
  if ([".mp3", ".wav", ".m4a", ".flac"].includes(ext)) {
    return <FileAudio className={classname} />;
  }
  if ([".mp4", ".mov", ".avi", ".mkv"].includes(ext)) {
    return <FileVideo className={classname} />;
  }
  if ([".ts", ".tsx", ".js", ".jsx", ".json", ".html", ".css"].includes(ext)) {
    return <FileCode className={classname} />;
  }

  return <File className={classname} />;
};

function FileStreamContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get("search") || "";

  const [docs, setDocs] = useState<Document[]>([]);
  const [search, setSearch] = useState(queryFromUrl);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  // 1. API通信ロジック
  const fetchDocs = async (query = "") => {
    try {
      const res = await fetch(
        `/api/documents?search=${encodeURIComponent(query)}`,
      );
      if (res.ok) {
        const data = await res.json();
        setDocs(data);
      }
    } catch (err) {
      console.error("Failed to fetch documents", err);
    }
  };

  // 2. URLのクエリ（queryFromUrl）の変化だけを単一のトリガーとして検知・同期・フェッチを行う
  useEffect(() => {
    setSearch(queryFromUrl);
    fetchDocs(queryFromUrl);
  }, [queryFromUrl]);

  // 3. フォーム送信時：画面上の表示更新は行わず、URLクエリを書き換えてリダイレクト（推移）させる
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = search.trim();
    if (trimmed) {
      router.push(`${pathname}?search=${encodeURIComponent(trimmed)}`);
    } else {
      router.push(`${pathname}?search=`);
    }
  };

  return (
    <div className="space-y-8 text-foreground">
      {/* 検索セクション */}
      <form
        onSubmit={handleSearch}
        className="max-w-md mx-auto relative flex gap-2"
      >
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="検索..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md bg-background border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-foreground/50"
          />
          <Search className="absolute left-3 top-2.5 opacity-50" size={16} />
        </div>
        <button
          type="submit"
          className="bg-foreground text-background hover:opacity-90 px-4 py-2 rounded-md text-sm transition-opacity"
        >
          検索
        </button>
      </form>

      {/* ドキュメントグリッド */}
      {docs.length === 0 ? (
        <p className="text-center opacity-50 py-16 text-sm">
          該当するファイルが見つかりません。
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {docs.map((doc) => (
            <div
              key={doc.uuid}
              onClick={() => setSelectedDoc(doc)}
              className="group cursor-pointer border border-border/80 hover:border-foreground/40 rounded-xl p-3.5 bg-background hover:shadow-lg transition-all duration-200 flex flex-col justify-between h-56"
            >
              {/* アイコンプレースホルダー領域 */}
              <div className="relative bg-foreground/5 rounded-lg py-4 px-2 text-foreground flex flex-col items-center justify-center flex-1 overflow-hidden transition-colors group-hover:bg-foreground/[0.07]">
                {/* パスワード保護されている場合は右上に鍵アイコンを表示 */}
                {(Number(doc.isProtected) === 1 || doc.isProtected === true) && (
                  <span className="absolute top-2 right-2 bg-amber-500/10 text-amber-600 border border-amber-500/20 p-1 rounded-md">
                    <LockKeyhole size={12} />
                  </span>
                )}
                
                {getFileIcon(doc.extension)}
                
                <span className="mt-1 text-[10px] font-mono tracking-wider opacity-60 uppercase font-semibold">
                  {doc.extension}
                </span>
              </div>

              {/* テキスト領域 */}
              <div className="pt-3 px-0.5 space-y-1.5">
                <h3 className="font-medium text-sm line-clamp-1 group-hover:opacity-80 transition-opacity">
                  {doc.title}
                </h3>
                
                <div className="flex flex-wrap gap-1 max-h-10 overflow-hidden">
                  {doc.tags?.split(",").map((tag, idx) => {
                    const trimmed = tag.trim();
                    if (!trimmed) return null;
                    return (
                      <span
                        key={idx}
                        className="text-[10px] bg-foreground/5 border border-border/60 px-1.5 py-0.5 rounded opacity-75 font-mono"
                      >
                        #{trimmed}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ポップアップコンポーネント */}
      <FileModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
    </div>
  );
}

export default function FileStream() {
  return (
    <Suspense
      fallback={
        <div className="text-center opacity-50 py-12">読み込み中...</div>
      }
    >
      <FileStreamContent />
    </Suspense>
  );
}