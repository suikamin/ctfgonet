import Link from "next/link";

export const metadata = {
  title: "ABOUT | FILEUPLOADER",
};

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-foreground">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2 border-border">
        About
      </h1>

      <p className="text-sm leading-relaxed mb-8 opacity-90">
        本サイトは、各種ファイルを共有・閲覧管理するためのプラットフォームです．
        利用にあたっては、以下のガイドラインおよび免責事項を必ずご確認ください．
      </p>

      <hr className="my-6 border-border" />

      {/* 1. 著作権 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3 flex items-center">
          <span className="mr-2">1.</span> 著作権および知的財産権について
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed opacity-90">
          <li>
            <strong className="font-bold opacity-100">権利の帰属:</strong>{" "}
            本サイトに掲載されているすべてのコンテンツ（テキスト、画像、ファイル、および圧縮データを含む）の著作権、その他の知的財産権は、すべて各コンテンツの著作者（権利者）に帰属します．
          </li>
          <li>
            <strong className="font-bold opacity-100">
              私的利用の範囲内でのダウンロード:
            </strong>{" "}
            ユーザーは、著作権法第30条（私的使用のための複製）に基づき、
            <strong>個人の私的利用の範囲内に限り</strong>
            、本サイトのコンテンツをダウンロードして使用することが正当に認められます．
          </li>
        </ul>
      </section>

      {/* 2. 二次配布禁止 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3 flex items-center">
          <span className="mr-2">2.</span> 二次配布・転載の厳格な禁止
        </h2>
        <div className="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r-md">
          <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed text-red-600 dark:text-red-400">
            <li>
              <strong>二次配布の禁止:</strong>{" "}
              ダウンロードしたコンテンツ、または本サイト上のデータを、著作者の事前の許可なく第三者へ再配布（二次配布）、共有、転載、または商用利用することは厳格に禁止します．
            </li>
            <li>
              <strong>違反への対処:</strong>{" "}
              悪質な著作権侵害や利用規約違反が発覚した場合は、プロバイダ責任制限法等に基づき、
              <strong>法的措置を含めた厳正な対処</strong>を行います．
            </li>
          </ul>
        </div>
      </section>

      {/* 3. 免責事項 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3 flex items-center">
          <span className="mr-2">3.</span> 免責事項およびお問い合わせ
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed opacity-90">
          <li>
            <strong className="font-bold opacity-100">
              内容の不備について:
            </strong>{" "}
            本サイトのコンテンツおよびシステムについては万全を期しておりますが、万が一不備や問題などがございましたら、お手数ですが
            <Link
              href="/contact"
              className="underline font-semibold mx-1 hover:opacity-80 transition-opacity"
            >
              お問い合わせフォーム
            </Link>
            よりご連絡ください．迅速に確認・対応いたします．
          </li>
          <li>
            <strong className="font-bold opacity-100">免責:</strong>{" "}
            本サイトの利用によって生じた直接的・間接的な損害について、運営者は一切の責任を負いかねますのであらかじめご了承ください．
          </li>
        </ul>
      </section>

      {/* 4. プライバシーポリシー */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-3 flex items-center">
          <span className="mr-2">4.</span>{" "}
          プライバシーポリシー（個人情報の取り扱い）
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed opacity-90">
          <li>
            <strong className="font-bold opacity-100">
              ユーザー情報の非収集:
            </strong>{" "}
            本サイトでは、一般的なWebサイトで行われるアクセスログ（Cookie等）の最低限の保持を除き、ユーザーの個人を特定できるような情報の収集・蓄積は原則として行いません．
          </li>
          <li>
            <strong className="font-bold opacity-100">
              お問い合わせ情報の保護:
            </strong>{" "}
            お問い合わせフォームから送信された情報（お名前、メールアドレス、内容など）は、ご質問への回答および本人確認の目的にのみ使用し、適切に管理いたします．
          </li>
        </ul>
      </section>

      <hr className="my-8 border-border" />

      {/* About Me セクション */}
      <section className="p-6 rounded-xl border border-border max-w-2xl mx-auto bg-foreground/5">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* 丸形アイコン */}
          <div className="flex-shrink-0">
            <img
              src="/avatar.jpg"
              alt="運営者のアイコン"
              className="w-20 h-20 rounded-full object-cover grayscale-[30%] opacity-90"
            />
          </div>

          {/* テキストコンテンツ */}
          <div className="flex-grow text-center sm:text-left">
            <div className="mb-2">
              <h2 className="text-lg font-medium inline-block mr-2">
                二個で百円
              </h2>
              <span className="text-xs opacity-60">/ 運営・開発</span>
            </div>

            <div className="text-xs leading-relaxed opacity-80 space-y-2">
              <p>
                地方国立大学生。工学部情報系専攻。
                <br />
                情報数学がメイン。最近は通信・Web開発に関心が高まる。
                <br />
                座右の銘は、「好きこそものの上手なれ」
                <br />
                数理、テクノロジーに関して、記事、備忘録、CTFのWriteUpを書いてまとめています。{" "}
                <br />
                コンタクトは、各種SNSまたは、ContactよりGoogleFormにお願いします。
              </p>
            </div>

            {/* リンク */}
            <div className="pt-2 flex justify-center sm:justify-start gap-4 text-xs font-medium">
              <a
                href="https://github.com/suikamin/ctfgonet"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition underline underline-offset-4"
              >
                GitHub
              </a>
              <a
                href="https://github.com/suikamin/ctfgonet"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition underline underline-offset-4"
              >
                X (旧Twitter)
              </a>
              <a
                href="https://github.com/suikamin/ctfgonet"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition underline underline-offset-4"
              >
                YouTube
              </a>
              <a
                href="https://github.com/suikamin/ctfgonet"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition underline underline-offset-4"
              >
                Discord
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
