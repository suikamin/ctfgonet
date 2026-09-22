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
  isProtected?: boolean | number;
}

interface FileModalProps {
  doc: Document | null;
  onClose: () => void;
}

export default function FileModal({ doc, onClose }: FileModalProps) {
  if (!doc) return null;

  // ダウンロードハンドラー関数
  const handleDownload = async () => {
    let password = "";

    // isProtected が 1 または true の場合はパスワードを要求
    const isProtected =
      Number(doc.isProtected) === 1 || doc.isProtected === true;

    if (isProtected) {
      const inputPass = window.prompt("ファイルパスワードを入力してください:");
      // キャンセルされた場合は処理を中断
      if (inputPass === null) return;
      password = inputPass;
    }

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uuid: doc.uuid,
          password: password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        alert(errorData.error || "ダウンロードに失敗しました。");
        return;
      }

      // レスポンスのファイル本体をBlobとして受け取りダウンロードをキック
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      // 保存時のファイル名を「タイトル+拡張子」に設定
      a.download = `${doc.title}${doc.extension}`;
      document.body.appendChild(a);
      a.click();

      // 後処理
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
      alert("通信エラーが発生しました。");
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
            <div className="flex justify-between items-center gap-4">
              <span className="text-slate-400 shrink-0 flex items-center gap-1">
                <Calendar size={12} /> アップロード日時
              </span>
              <span className="text-slate-700 dark:text-slate-300 text-right">
                {formatDate(doc.created_at)}
              </span>
            </div>

            <div className="flex justify-between items-center gap-4">
              <span className="text-slate-400 shrink-0">パスワード保護</span>
              <span className="text-slate-700 dark:text-slate-300 break-all text-right">
                {/* 1 または true の場合に「あり」、それ以外は「なし」と表示 */}
                {Number(doc.isProtected) === 1 || doc.isProtected === true ? (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                    🔒 あり
                  </span>
                ) : (
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    なし
                  </span>
                )}
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

        <div className="grid gap-3 mt-2">
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 py-2 px-4 text-xs font-medium border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Download size={14} />
            ファイルをダウンロード
          </button>
        </div>
      </div>
    </div>
  );
}
