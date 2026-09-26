// components/FileModal.tsx
"use client";

import { X, Download, FileText, Calendar, Tag, HardDrive, KeyRound, LockKeyholeOpen, LockKeyhole, Code, MessageSquare} from "lucide-react";


interface Document {
  uuid: string;
  title: string;
  tags: string;
  extension: string;
  created_at?: string;
  comment: string;
  isProtected?: boolean | number;
}

interface FileModalProps {
  doc: Document | null;
  onClose: () => void;
}

export default function FileModal({ doc, onClose }: FileModalProps) {
  if (!doc) return null;

  const handleDownload = async () => {
    let password = "";
    const isProtected =
      Number(doc.isProtected) === 1 || doc.isProtected === true;

    if (isProtected) {
      const inputPass = window.prompt("ファイルパスワードを入力してください:");
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

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${doc.title}${doc.extension}`;
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
      alert("通信エラーが発生しました。");
    }
  };

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-background text-foreground border border-border rounded-xl shadow-2xl p-6 z-10 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 opacity-60 hover:opacity-100 transition-opacity"
        >
          <X size={18} />
        </button>

        {/* ファイルヘッダー */}
        <div className="flex items-start gap-3 mt-1">
          <div className="p-2.5 bg-foreground/10 text-foreground rounded-lg shrink-0">
            <FileText size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-bold break-words pr-5 leading-snug">
              {doc.title}
            </h2>
            <span className="inline-block mt-1 text-[10px] font-mono font-semibold uppercase tracking-wider bg-foreground/10 opacity-80 px-1.5 py-0.5 rounded">
              {doc.extension}
            </span>
          </div>
        </div>

        <div className="border-t border-border my-1" />

        {/* メタデータ領域 */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold opacity-60 uppercase tracking-wider flex items-center gap-1.5">
            <HardDrive size={13} /> メタデータ詳細
          </h3>

          <div className="bg-foreground/5 border border-border p-3.5 rounded-xl space-y-3 font-mono text-xs">
            {/* UUID */}
            <div className="flex justify-between items-center gap-3">
              <span className="opacity-60 shrink-0 flex items-center gap-1">
                <Code size={12} /> uuid
              </span>
              <span className="text-right font-mono text-[11px] opacity-80 break-all select-all">
                {doc.uuid}
              </span>
            </div>

            {/* アップロード日時 */}
            <div className="flex justify-between items-center gap-3 pt-2 border-t border-border/50">
              <span className="opacity-60 shrink-0 flex items-center gap-1">
                <Calendar size={12} /> アップロード日時
              </span>
              <span className="text-right opacity-90">{formatDate(doc.created_at)}</span>
            </div>

            {/* パスワード保護 */}
            <div className="flex justify-between items-center gap-3 pt-2 border-t border-border/50">
              <span className="opacity-60 shrink-0 flex items-center gap-1">
                <KeyRound size={12} /> パスワード保護
              </span>
              <div>
                {Number(doc.isProtected) === 1 || doc.isProtected === true ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/30">
                    <LockKeyhole size={12} className="shrink-0" />
                    <span className="leading-none relative top-[0.5px]">あり</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] opacity-60 px-2 py-0.5 rounded-full bg-foreground/5 border border-border">
                    <LockKeyholeOpen size={12} className="shrink-0" />
                    <span className="leading-none relative">なし</span>
                  </span>
                )}
              </div>
            </div>

            {/* 一言コメント */}
            <div className="flex flex-col gap-1.5 pt-2 border-t border-border/50 font-sans">
              <span className="opacity-60 flex items-center gap-1 text-xs font-mono">
                <MessageSquare size={12} /> 一言
              </span>
              <div className="bg-background/50 border-l-2 border-border p-2 rounded-r text-xs opacity-90 break-words whitespace-pre-wrap leading-relaxed">
                {doc.comment || <span className="opacity-40 italic">なし</span>}
              </div>
            </div>

            {/* 設定タグ */}
            <div className="flex flex-col gap-1.5 pt-2 border-t border-border/50 font-sans">
              <span className="opacity-60 flex items-center gap-1 text-xs font-mono">
                <Tag size={12} /> 設定タグ
              </span>
              <div className="flex flex-wrap gap-1.5 mt-0.5">
                {doc.tags?.split(",").map((tag, idx) => {
                  const trimmed = tag.trim();
                  if (!trimmed) return null;
                  return (
                    <span
                      key={idx}
                      className="text-[10px] bg-background border border-border/80 px-2 py-0.5 rounded-md opacity-90 font-mono"
                    >
                      #{trimmed}
                    </span>
                  );
                })}
                {(!doc.tags || !doc.tags.trim()) && (
                  <span className="opacity-40 italic text-xs">タグなし</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="grid gap-3 mt-2">
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-medium border border-border rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Download size={14} />
            ファイルをダウンロード
          </button>
        </div>
      </div>
    </div>
  );
}
