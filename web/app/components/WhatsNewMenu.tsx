"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Bell } from "lucide-react";

export type UpdateItem = {
  id: string;
  date: string;
  category: string;
  title: string;
  url?: string;
};

const STORAGE_KEY = "blog_last_read_update_id";

export function WhatsNewMenu({ items = [] }: { items?: UpdateItem[] }) {
  const [hasUnread, setHasUnread] = useState(false);
  const latestId = items[0]?.id;

  useEffect(() => {
    if (!latestId) return;
    const lastReadId = localStorage.getItem(STORAGE_KEY);
    // 最新記事のIDとローカルストレージの記録が一致しない場合は未読
    if (lastReadId !== latestId) {
      setHasUnread(true);
    }
  }, [latestId]);

  const handleOpenChange = (open: boolean) => {
    if (open && latestId) {
      // 開いた時点で既読に更新
      localStorage.setItem(STORAGE_KEY, latestId);
      setHasUnread(false);
    }
  };

  return (
    <Popover onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          className="relative p-2 rounded-md hover:bg-foreground/10 text-foreground transition-colors cursor-pointer"
          aria-label="更新履歴・お知らせ"
          title="更新履歴・お知らせ"
        >
          <Bell className="w-5 h-5 text-foreground" />
          {hasUnread && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0 border border-border shadow-xl">
        <div className="p-3 border-b border-border text-sm font-semibold flex items-center justify-between">
          <span>更新履歴・お知らせ</span>
          {items.length > 0 && (
            <span className="text-xs text-foreground/60 font-normal">
              {items.length}件
            </span>
          )}
        </div>
        <ul className="max-h-80 overflow-y-auto divide-y divide-border text-sm no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.length === 0 ? (
            <li className="p-4 text-center text-xs text-foreground/60">
              現在お知らせはありません
            </li>
          ) : (
            items.map((item) => (
              <li
                key={item.id}
                className="p-3 hover:bg-foreground/5 transition-colors"
              >
                <div className="flex items-center gap-1.5 text-xs text-foreground/60 mb-1">
                  <span>{item.date}</span>
                  {item.category && (
                    <span className="inline-block px-1.5 py-0.5 text-[10px] rounded bg-foreground/10 text-foreground font-medium">
                      {item.category}
                    </span>
                  )}
                </div>
                {item.url ? (
                  <Link
                    href={item.url}
                    className="text-foreground hover:underline block font-medium leading-snug"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <div className="font-medium text-foreground leading-snug">
                    {item.title}
                  </div>
                )}
              </li>
            ))
          )}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

export default WhatsNewMenu;

