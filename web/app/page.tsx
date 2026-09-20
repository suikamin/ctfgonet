// page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Search,
  FileText,
  FileImage,
  FileAudio,
  FileVideo,
  FileCode,
  File,
} from "lucide-react";
import FileModal from "./components/FileModal"; // モーダルのインポート

interface Document {
  uuid: string;
  title: string;
  tags: string;
  extension: string;
  created_at?: string; // バックエンド連携用に追加
  comment: string;
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

export default function HomePage() {
  const [docs, setDocs] = useState<Document[]>([]);
  const [search, setSearch] = useState("");

  // ポップアップ開閉のためのステート管理
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const styletemp: string =
    "items-center justify-center gap-2 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/30 transition-colors";

  // Expressバックエンドの GET /documents APIを呼び出し
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

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDocs(search);
  };

  return (
    <div className="space-y-8">
      {/* 検索セクション */}
      <form
        onSubmit={handleSearch}
        className="max-w-md mx-auto relative flex gap-2"
      >
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="タイトル名・タグ名で検索..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search
            className="absolute left-3 top-2.5 text-slate-400"
            size={16}
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
        >
          検索
        </button>
      </form>

      {/* ドキュメントグリッド */}
      {docs.length === 0 ? (
        <p className="text-center text-slate-400 py-12">
          該当するファイルが見つかりません。
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {docs.map((doc) => (
            <div
              key={doc.uuid}
              // 直リンク遷移から「ステートにセットしてポップアップを起動する」挙動に変更
              onClick={() => setSelectedDoc(doc)}
              className="group cursor-pointer border border-slate-200 dark:border-slate-800 rounded-lg p-4 bg-white dark:bg-slate-900/50 hover:shadow-md hover:border-indigo-500 transition-all flex flex-col justify-between h-52"
            >
              {/* プレースホルダーアイコン */}
              <div
                className={`${
                  [".png", ".jpg", ".jpeg", ".gif", ".ico"].includes(
                    doc.extension.toLowerCase(),
                  )
                    ? `bg-green-50 dark:bg-green-950/30 text-green-500 ${styletemp}`
                    : doc.extension.toLowerCase() === ".pdf"
                      ? `bg-red-50 dark:bg-red-950/30 text-red-500 ${styletemp}`
                      : `bg-slate-100 dark:bg-slate-800 text-slate-500 ${styletemp}`
                }`}
              >
                {getFileIcon(doc.extension)}
                <span className="flex text-[10px] justify-center items-center uppercase font-mono tracking-wider text-slate-400 h-8">
                  {doc.extension}
                </span>
              </div>

              {/* 情報領域 */}
              <div className="mt-2 space-y-1">
                <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {doc.title}
                </h3>
                <div className="flex flex-wrap gap-1">
                  {doc.tags.split(",").map(
                    (tag, idx) =>
                      tag.trim() && (
                        <span
                          key={idx}
                          className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-400"
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

      {/* ポップアップコンポーネントの設置 */}
      <FileModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
    </div>
  );
}
