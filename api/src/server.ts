import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import mysql from "mysql2/promise";
import multer from "multer";
import path from "path";
import fs, { mkdirSync } from "fs";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cors from "cors";
import bcrypt, { compare } from "bcryptjs";

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";
const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "adminpass";

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "mydatabase",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function initDB(maxRetries = 10, delayMs = 3000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const connection = await pool.getConnection();
      try {
        await connection.query(`
                CREATE TABLE IF NOT EXISTS documents (
                    uuid VARCHAR(36) PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    tags VARCHAR(255) NOT NULL,
                    extension VARCHAR(10) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    comment VARCHAR(511) NOT NULL
                )
            `);
        console.log("[DB] Successed to initiallize Database");
        return;
      } finally {
        connection.release();
      }
    } catch (e: any) {
      console.warn(
        `[DB] Failed to connect. (${attempt}/${maxRetries}): ${e.message}`,
      );

      if (attempt == maxRetries) {
        console.error("[DB] Stopped attempt to connect.");
        process.exit(1);
      }

      await sleep(delayMs);
    }
  }
}
initDB();

const uploadDir = "/app/public";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uuid = uuidv4();
    const ext = path.extname(file.originalname).toLocaleLowerCase();
    cb(null, `${uuid}${ext}`);
  },
});

const upload = multer({ storage });

// 認証ミドルウェア
const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.cookies.admin_token;
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  jwt.verify(token, JWT_SECRET, (err: any) => {
    if (err) {
      res.status(403).json({ error: "Forbidden or Token Expired" });
      return;
    }
    next();
  });
};

// --- API エンドポイント ---
// Next.js側のfetchに合わせ、すべてのエンドポイントの先頭に `` を追加しました。

// 1. ログイン
app.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (
    username === ADMIN_USER &&
    (await bcrypt.compare(password, ADMIN_PASSWORD))
  ) {
    const token = jwt.sign({ user: "admin" }, JWT_SECRET, { expiresIn: "2h" });
    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: false, // HTTPS環境では true に変更してください
      maxAge: 2 * 60 * 60 * 1000,
    });
    res.json({ success: true });
    return;
  }
  res.status(401).json({ error: "Invalid credentials" });
});

// 2. ログアウト
app.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("admin_token");
  res.json({ success: true });
});

// 3. 認証確認用チェック
app.get("/auth/check", authenticateToken, (req: Request, res: Response) => {
  res.json({ authenticated: true });
});

// 4. ドキュメント検索・一覧取得
app.get("/documents", async (req: Request, res: Response) => {
  const search = req.query.search as string;
  try {
    let query = "SELECT * FROM documents";
    let params: any[] = [];

    if (search) {
      query += " WHERE title LIKE ? OR tags LIKE ?";
      const searchParam = `%${search}%`;
      params = [searchParam, searchParam];
    }

    query += " ORDER BY created_at DESC";
    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (err: any) {
    console.error("Fetch documents error:", err);
    res.status(500).json({ error: err.message });
  }
});

// 5. ファイルアップロード (拡張子をDBに保存)
app.post(
  "/upload",
  authenticateToken,
  upload.single("file"),
  async (req: Request, res: Response) => {
    const { title, tags, comment } = req.body;
    if (!req.file) {
      res.status(400).json({ error: "File is required" });
      return;
    }

    // 保存されたファイル名から拡張子を特定
    // 元の filename（例: "archive.tar.gz" や "photo.JPEG"）
    const filename = req.file.originalname;

    // 最初のドットの位置を見つける
    const firstDotIndex = filename.indexOf(".");

    // ドットが存在すればそこから切り出し、存在しなければ空文字にする
    const ext =
      firstDotIndex !== -1
        ? filename.substring(firstDotIndex).toLowerCase()
        : "";
    const uuid = path.basename(
      req.file.filename,
      path.extname(req.file.filename),
    );

    try {
      await pool.query(
        "INSERT INTO documents (uuid, title, tags, extension, comment) VALUES (?, ?, ?, ?, ?)",
        [uuid, title, tags || "", ext, comment || ""],
      );
      res.json({ success: true, uuid, extension: ext });
    } catch (err: any) {
      console.error("Upload DB insertion error:", err);
      res.status(500).json({ error: err.message });
    }
  },
);

// 6. ドキュメント削除 (DBから拡張子を取得して物理削除)
app.delete(
  "/documents/:uuid",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { uuid } = req.params;

    try {
      // 1. データベースからレコードを取得して存在確認（拡張子を取得するため）
      const [rows]: any = await pool.query(
        "SELECT * FROM documents WHERE uuid = ?",
        [uuid],
      );
      if (rows.length === 0) {
        res.status(404).json({ error: "Document not found" });
        return;
      }

      const ext = rows[0].extension;
      const filePath = path.join("/app/public", `${uuid}${ext}`);

      // 2. データベースからレコードを削除
      await pool.query("DELETE FROM documents WHERE uuid = ?", [uuid]);

      // 3. ホストからマウントされているファイルを物理削除
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      res.json({ success: true, message: "Document deleted successfully" });
    } catch (err: any) {
      console.error("Delete document error:", err);
      res.status(500).json({ error: err.message });
    }
  },
);

app.listen(PORT, () => {
  console.log(`node server is running on port ${PORT}`);
});
