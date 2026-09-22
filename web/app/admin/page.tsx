"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, FileText } from "lucide-react";

interface Document {
  uuid: string;
  title: string;
  tags: string;
  extension: string; // 拡張子プロパティを追加
  comment: string;
  filepass: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [comment, setComment] = useState("");
  const [filepass, setPass] = useState("");

  const [docs, setDocs] = useState<Document[]>([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    // 認証チェック時にクッキーを含める
    fetch("/api/auth/check", { credentials: "include" })
      .then((res) => {
        if (res.ok) {
          setAuth(true);
          fetchDocs();
        }
      })
      .catch(() => setAuth(false));
  }, []);

  const fetchDocs = async () => {
    try {
      // 一覧取得時にクッキーを含める
      const res = await fetch("/api/documents", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setDocs(data);
      }
    } catch (err) {
      console.error("Failed to fetch documents", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // ログイン応答の Set-Cookie を受け取るため credentials を指定
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (res.ok) {
      setAuth(true);
      setMsg("");
      fetchDocs();
    } else {
      setMsg("ログインに失敗しました。認証情報を確認してください。");
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMsg("ファイルを選択してください。");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("tags", tags);
    formData.append("file", file);
    formData.append("comment", comment);
    formData.append("filepass", filepass);

    // アップロード時にクッキー（認証トークン）を含める
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (res.ok) {
      setMsg("アップロードが完了しました。");
      setTitle("");
      setTags("");
      setFile(null);
      setComment("");
      setPass("");
      fetchDocs();
    } else {
      setMsg("アップロード中にエラーが発生しました。");
    }
  };

  const handleDelete = async (uuid: string, docTitle: string) => {
    const confirmed = window.confirm(
      `「${docTitle}」を削除しますか？\nこの操作は取り消せません。`,
    );
    if (!confirmed) return;

    try {
      // 削除リクエスト時にクッキーを含める
      const res = await fetch(`/api/documents/${uuid}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setMsg("ファイルを削除しました。");
        fetchDocs();
      } else {
        setMsg("ファイルの削除に失敗しました。");
      }
    } catch (err) {
      console.error("Delete error", err);
      setMsg("通信エラーが発生しました。");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    setAuth(false);
    router.push("/");
  };

  if (!auth) {
    return (
      <div className="max-w-md mx-auto mt-12 border border-slate-200 dark:border-slate-800 rounded-lg p-6 bg-white dark:bg-slate-900 shadow-sm">
        <h2 className="text-xl font-bold mb-4 text-center">管理者ログイン</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1">
              ユーザー名
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded p-2 text-sm bg-transparent border-slate-300 dark:border-slate-700"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">
              パスワード
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded p-2 text-sm bg-transparent border-slate-300 dark:border-slate-700"
              required
            />
          </div>
          {msg && <p className="text-xs text-red-500 font-medium">{msg}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded text-sm transition-colors"
          >
            ログイン
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">管理者用ドキュメント管理</h2>
        <button
          onClick={handleLogout}
          className="text-xs border border-red-500 text-red-500 hover:bg-red-500/10 px-3 py-1.5 rounded transition-colors"
        >
          ログアウト
        </button>
      </div>

      {msg && (
        <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded text-xs font-medium border border-indigo-100 dark:border-indigo-900">
          {msg}
        </div>
      )}

      <form
        onSubmit={handleUpload}
        className="border border-slate-200 dark:border-slate-800 rounded-lg p-6 bg-white dark:bg-slate-900 space-y-4 shadow-sm"
      >
        <h3 className="font-semibold text-sm border-b pb-2 border-slate-200 dark:border-slate-800">
          新規ファイルのアップロード
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1">タイトル</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded p-2 text-sm bg-transparent border-slate-300 dark:border-slate-700"
              placeholder="作品または資料のタイトル"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">
              タグ (カンマ区切り)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full border rounded p-2 text-sm bg-transparent border-slate-300 dark:border-slate-700"
              placeholder="React, Design"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">
              ファイルパスワード設定
            </label>
            <input
              type="text"
              value={filepass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full border rounded p-2 text-sm bg-transparent border-slate-300 dark:border-slate-700"
              placeholder="password"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold mb-1">コメント</label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border rounded p-2 text-sm bg-transparent border-slate-300 dark:border-slate-700"
              placeholder="一言コメント"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1">ファイル</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 dark:file:bg-slate-800 dark:file:text-slate-200 hover:file:bg-indigo-100 cursor-pointer"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded text-sm transition-colors"
        >
          アップロードを実行
        </button>
      </form>

      <div className="space-y-3">
        <h3 className="font-semibold text-sm pl-1">
          アップロード済みファイル一覧 ({docs.length}件)
        </h3>
        <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-white dark:bg-slate-900 shadow-sm divide-y divide-slate-200 dark:divide-slate-800">
          {docs.length === 0 ? (
            <p className="text-center text-slate-400 py-8 text-sm">
              ファイルがありません。
            </p>
          ) : (
            docs.map((doc) => (
              <div
                key={doc.uuid}
                className="flex items-center justify-between p-3 sm:px-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1 mr-4">
                  <div className="p-2 rounded">
                    <FileText size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                      {doc.title}
                    </p>
                    <p className="text-[10px] font-mono text-slate-400 truncate">
                      {doc.uuid}
                      {doc.extension}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(doc.uuid, doc.title)}
                  className="p-2 text-slate-400 hover:text-red-500 dark:hover:text-red-400 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex-shrink-0"
                  title="ファイルを削除"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
