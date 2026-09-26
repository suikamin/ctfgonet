// page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // useRouter を追加
import {
  Search,
  FileText,
  FileImage,
  FileAudio,
  FileVideo,
  FileCode,
  File,
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
  const router = useRouter(); // 追加
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get("search") || "";

  const [docs, setDocs] = useState<Document[]>([]);
  const [search, setSearch] = useState(queryFromUrl);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

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

  // URLのクエリパラメータ（queryFromUrl）が変わったら検索処理を実行し、入力欄も更新
  useEffect(() => {
    setSearch(queryFromUrl);
    fetchDocs(queryFromUrl);
  }, [queryFromUrl]);

  // 検索ボタン押下時（URLのクエリパラメータを書き換える）
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`?search=${encodeURIComponent(search.trim())}`);
    } else {
      router.push(""); // 空文字の場合はクエリなしのURLにする
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
        <p className="text-center opacity-50 py-12">
          該当するファイルが見つかりません。
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {docs.map((doc) => (
            <div
              key={doc.uuid}
              onClick={() => setSelectedDoc(doc)}
              className="group cursor-pointer border border-border rounded-lg p-4 bg-background hover:shadow-md hover:border-foreground/50 transition-all flex flex-col justify-between h-52"
            >
              {/* プレースホルダーアイコン */}
              <div className="bg-foreground/5 text-foreground items-center justify-center gap-2 transition-colors flex flex-col rounded">
                {getFileIcon(doc.extension)}
                <span className="flex text-[10px] justify-center items-center uppercase font-mono tracking-wider opacity-60 h-8">
                  {doc.extension}
                </span>
              </div>

              {/* 情報領域 */}
              <div className="mt-2 space-y-1">
                <h3 className="font-semibold text-sm line-clamp-1 group-hover:opacity-80 transition-opacity">
                  {doc.title}
                </h3>
                <div className="flex flex-wrap gap-1">
                  {doc.tags.split(",").map(
                    (tag, idx) =>
                      tag.trim() && (
                        <span
                          key={idx}
                          className="text-[10px] bg-foreground/10 px-1.5 py-0.5 rounded opacity-80"
                        >
                          #{tag.trim()}
                        </span>
                      ),
                  )}
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