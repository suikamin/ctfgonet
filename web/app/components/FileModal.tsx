// components/FileModal.tsx
"use client";

import {
  X,
  ExternalLink,
  Download,
  FileText,
  Calendar,
  Tag,
  HardDrive,
} from "lucide-react";

// バックエンド (server.ts) のデータ構造に合わせて created_at を追加
interface Document {
  uuid: string;
  title: string;
  tags: string;
  extension: string;
  created_at?: string; // バックエンドから取得したアップロード日時;
  comment: string;
}

interface FileModalProps {
  doc: Document | null;
  onClose: () => void;
}

export default function FileModal({ doc, onClose }: FileModalProps) {
  if (!doc) return null;

  // バックエンドの仕様 (/app/public) および Nginx等の配信パスに合わせたURL
  const fileUrl = `/public/${doc.uuid}${doc.extension}`;

  // ダウンロード処理
  const handleDownload = async () => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      // バックエンド保存時の元のタイトル名 + 拡張子で保存
      a.download = `${doc.title}${doc.extension}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("ダウンロードに失敗しました", err);
    }
  };

  // 日付のフォーマット関数
  const formatDate = (dateString?: string) => {
    if (!dateString) return "不明";
    const date = new Date(dateString);
    return date.toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    // 外枠（背景）: opacity (bg-slate-900/60) をつけ、背後のホーム画面が透けて見えるように設定
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      {/* 背景クリックで閉じる */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* モーダル本体（画面中央に配置） */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-6 z-10 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X size={18} />
        </button>

        {/* ファイルヘッダー */}
        <div className="flex items-start gap-3 mt-1">
          <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 rounded-lg shrink-0">
            <FileText size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 break-words pr-5 leading-snug">
              {doc.title}
            </h2>
            <span className="inline-block mt-1 text-[10px] font-mono font-semibold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded">
              {doc.extension}
            </span>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800/60 my-1" />

        {/* バックエンド連携メタデータ情報領域 */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <HardDrive size={12} /> メタデータ詳細
          </h3>

          <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/40 p-3 rounded-lg space-y-2.5 font-mono text-xs">
            <div className="flex justify-between items-start gap-4">
              <span className="text-slate-400 shrink-0">UUID</span>
              <span className="text-slate-700 dark:text-slate-300 break-all text-right">
                {doc.uuid}
              </span>
            </div>

            <div className="flex justify-between items-center gap-4">
              <span className="text-slate-400 shrink-0 flex items-center gap-1">
                <Calendar size={12} /> アップロード日時
              </span>
              <span className="text-slate-700 dark:text-slate-300 text-right">
                {formatDate(doc.created_at)}
              </span>
            </div>

            <div className="flex justify-between items-center gap-4">
              <span className="text-slate-400 shrink-0 flex items-center gap-1">
                一言
              </span>
              <span className="text-slate-700 dark:text-slate-300 text-right">
                {doc.comment}
              </span>
            </div>

            <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-200/40 dark:border-slate-800/40">
              <span className="text-slate-400 flex items-center gap-1">
                <Tag size={12} /> 設定タグ
              </span>
              <div className="flex flex-wrap gap-1 mt-0.5">
                {doc.tags.split(",").map(
                  (tag, idx) =>
                    tag.trim() && (
                      <span
                        key={idx}
                        className="text-[10px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-400"
                      >
                        #{tag.trim()}
                      </span>
                    ),
                )}
                {!doc.tags.trim() && (
                  <span className="text-slate-400 italic">タグなし</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* アクションボタン（ブラウザで開く / ダウンロード） */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2 px-4 text-xs font-medium border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <ExternalLink size={14} />
            ブラウザで開く
          </a>
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 py-2 px-4 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            <Download size={14} />
            ダウンロード
          </button>
        </div>
      </div>
    </div>
  );
}
