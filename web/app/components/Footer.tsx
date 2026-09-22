// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-background py-4 text-foreground">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm opacity-70">
            &copy; {currentYear} Site Administrator. All rights reserved.
          </p>

          <div className="flex text-sm opacity-70 divide-x divide-border">
            <Link
              href="/"
              className="hover:opacity-100 transition-opacity pr-5"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="hover:opacity-100 transition-opacity px-5"
            >
              About
            </Link>
            <a
              href="/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 transition-opacity px-5"
            >
              Contact
            </a>
            <a
              href="https://github.com/suikamin/ctfgonet"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 transition-opacity pl-5"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
