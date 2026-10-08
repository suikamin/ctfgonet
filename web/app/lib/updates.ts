import fs from "fs";
import path from "path";

export type UpdateItem = {
  id: string;
  date: string;
  category: string;
  title: string;
  url?: string;
};

export async function getUpdates(): Promise<UpdateItem[]> {
  try {
    const candidatePaths = [
      path.join(process.cwd(), "app/data/updates.json"),
      path.join(process.cwd(), "data/updates.json"),
      path.resolve(__dirname, "../data/updates.json"),
      path.resolve(__dirname, "../../data/updates.json"),
    ];

    for (const filePath of candidatePaths) {
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(fileContent);
      }
    }
  } catch (error) {
    console.error("Failed to read updates.json:", error);
  }
  return [];
}

