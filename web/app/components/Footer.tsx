import Image from "next/image";
export default function Footer() {
  // 自動で現在の西暦（2026年など）を取得して表示に利用します
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 bg-white py-3 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* 左側：著作権表記 */}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {currentYear} Site Administrator. All rights reserved.
          </p>

          {/* 各種リンク */}
          <div className="flex text-sm text-gray-500 dark:text-gray-400 divide-x divide-gray-400">
            <a
              href="/"
              className="hover:text-gray-900 dark:hover:text-white transition-colors pr-5"
            >
              Home
            </a>
            <a
              href="/about"
              className="hover:text-gray-900 dark:hover:text-white transition-colors px-5"
            >
              About
            </a>
            <a
              href="/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 dark:hover:text-white transition-colors px-5"
            >
              Contact
            </a>
            <a
              href="https://github.com/suikamin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-gray-900 dark:hover:text-white transition-colors pl-5"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
