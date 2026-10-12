"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, BookOpen, Folder, Newspaper, SquareArrowOutUpRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  const links = [
    {
      href: "https://docs.ctfdemanabu.net",
      label: "Docs",
      icon: BookOpen,
      external: true,
    },
    {
      href: "/files",
      label: "Files",
      icon: Folder,
      external: false,
    },
    {
      href: "https://blog.ctfdemanabu.net",
      label: "Blog",
      icon: Newspaper,
      external: true,
    },
  ];

  return (
    <div className="sm:hidden">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="p-2 rounded-md hover:bg-foreground/10 text-foreground transition-colors cursor-pointer flex items-center justify-center"
            aria-label="メニューを開く"
            title="メニュー"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-48 p-1.5 border border-border shadow-xl">
          <div className="flex flex-col gap-1">
            {links.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium hover:bg-foreground/5 text-foreground transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-foreground/70" />
                    <span>{item.label}</span>
                  </div>
                  {item.external && (
                    <SquareArrowOutUpRight className="w-3.5 h-3.5 text-foreground/40" />
                  )}
                </Link>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

