"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, FileText } from "lucide-react";

interface Document {
  uuid: string;
  title: string;
  tags: string;
  extension: string;
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
      <div className="max-w-md mx-auto mt-12 border border-border rounded-lg p-6 bg-background text-foreground shadow-sm">
        <h2 className="text-xl font-bold mb-4 text-center">管理者ログイン</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">
              ユーザー名
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded p-2 text-sm bg-background border-border focus:outline-none focus:ring-2 focus:ring-foreground/50"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">
              パスワード
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded p-2 text-sm bg-background border-border focus:outline-none focus:ring-2 focus:ring-foreground/50"
              required
            />
          </div>
          {msg && <p className="text-xs text-red-500 font-medium">{msg}</p>}
          <button
            type="submit"
            className="w-full bg-foreground text-background font-medium py-2 rounded text-sm hover:opacity-90 transition-opacity cursor-pointer"
          >
            ログイン
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 text-foreground">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">管理者用ドキュメント管理</h2>
        <button
          onClick={handleLogout}
          className="text-xs border border-red-500 text-red-500 hover:bg-red-500/10 px-3 py-1.5 rounded transition-colors cursor-pointer"
        >
          ログアウト
        </button>
      </div>

      {msg && (
        <div className="p-3 bg-foreground/5 text-foreground rounded text-xs font-medium border border-border">
          {msg}
        </div>
      )}

      <form
        onSubmit={handleUpload}
        className="border border-border rounded-lg p-6 bg-background space-y-4 shadow-sm"
      >
        <h3 className="font-semibold text-sm border-b pb-2 border-border">
          新規ファイルのアップロード
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">
              タイトル
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded p-2 text-sm bg-background border-border focus:outline-none focus:ring-2 focus:ring-foreground/50"
              placeholder="作品または資料のタイトル"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">
              タグ (カンマ区切り)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full border rounded p-2 text-sm bg-background border-border focus:outline-none focus:ring-2 focus:ring-foreground/50"
              placeholder="React, Design"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">
              ファイルパスワード設定
            </label>
            <input
              type="text"
              value={filepass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full border rounded p-2 text-sm bg-background border-border focus:outline-none focus:ring-2 focus:ring-foreground/50"
              placeholder="password"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold mb-1 opacity-80">
              コメント
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border rounded p-2 text-sm bg-background border-border focus:outline-none focus:ring-2 focus:ring-foreground/50"
              placeholder="一言コメント"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1 opacity-80">
            ファイル
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            className="w-full text-sm opacity-80 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-foreground/10 file:text-foreground hover:file:bg-foreground/20 cursor-pointer"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-foreground text-background font-medium py-2 rounded text-sm hover:opacity-90 transition-opacity cursor-pointer"
        >
          アップロードを実行
        </button>
      </form>

      <div className="space-y-3">
        <h3 className="font-semibold text-sm pl-1">
          アップロード済みファイル一覧 ({docs.length}件)
        </h3>
        <div className="border border-border rounded-lg overflow-hidden bg-background shadow-sm divide-y divide-border">
          {docs.length === 0 ? (
            <p className="text-center opacity-50 py-8 text-sm">
              ファイルがありません。
            </p>
          ) : (
            docs.map((doc) => (
              <div
                key={doc.uuid}
                className="flex items-center justify-between p-3 sm:px-4 hover:bg-foreground/5 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1 mr-4">
                  <div className="p-2 bg-foreground/10 rounded">
                    <FileText size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{doc.title}</p>
                    <p className="text-[10px] font-mono opacity-50 truncate">
                      {doc.uuid}
                      {doc.extension}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(doc.uuid, doc.title)}
                  className="p-2 opacity-60 hover:opacity-100 text-red-500 rounded-md hover:bg-red-500/10 transition-all flex-shrink-0 cursor-pointer"
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
