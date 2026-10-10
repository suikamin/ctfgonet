// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-background py-4 text-foreground">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm opacity-70">
            &copy; {currentYear} nikodehyakuen All rights reserved
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm opacity-70">
            <Link href="/" className="hover:opacity-100 transition-opacity">
              Home
            </Link>
            <Link
              href="/about"
              className="hover:opacity-100 transition-opacity"
            >
              About
            </Link>
            <a
              href="/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 transition-opacity"
            >
              Contact
            </a>
            <a
              href="https://github.com/suikamin/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 transition-opacity"
            >
              GitHub
            </a>
            <a
              href="https://bsky.app/profile/nikodehyakuen.bsky.social"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 transition-opacity"
            >
              Bluesky
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
