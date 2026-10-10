import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "ABOUT | ctfgo.net",
};

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-foreground">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2 border-border">
        About
      </h1>

      {/* このサイトについて */}
      <section className="mb-10 space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-foreground tracking-tight">
            このサイトについて
          </h2>

          <div className="p-4 sm:p-5 rounded-2xl border border-border/80 bg-foreground/[0.03] space-y-2">
            <p className="font-bold text-base sm:text-lg text-foreground">
              「Webはどうやって生まれ、コンピュータは裏側でどう動いているのか」
            </p>
            <p className="text-sm leading-relaxed opacity-90">
              <strong className="text-foreground">ctfgo.net</strong>{" "}
              は、CTF（Capture The
              Flag）の実践を通して、現代に必要な情報セキュリティの基礎を根本から学ぶための学習アーカイブです。
            </p>
          </div>
        </div>

        {/* 表面的な知識ではなく仕組みから理解する */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-foreground">
            表面的な知識ではなく、「仕組み」から理解する
          </h3>
          <p className="text-sm leading-relaxed opacity-90">
            セキュリティの脆弱性を学ぶとき、ツールの使い方や表面的な対策手順だけを覚えても、本当の理解にはつながりません。
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed opacity-90">
            <li>ブラウザの向こう側で、Web技術がどう発展してきたのか</li>
            <li>
              画面の裏側で、コンピュータがどのようにデータを処理しているのか
            </li>
          </ul>
          <p className="text-sm leading-relaxed opacity-90">
            「なぜ動くのか」「なぜ穴が生まれるのか」という土台から紐解くことで、変化の早い現代でも応用が利く本質的な知識が身につくと考えています。
          </p>
        </div>

        {/* CTFを通して手を動かして学ぶ */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-foreground">
            CTFを通して、手を動かして学ぶ
          </h3>
          <p className="text-sm leading-relaxed opacity-90">
            このサイトでは、主に <strong>Web</strong> と{" "}
            <strong>Pwn（低レイヤ・バイナリ）</strong>の分野を扱っています。
            <br />
            いきなり難しい専門用語に圧倒されることなく、実際に問題を解きながら、システムの裏側を見る面白さを体験しましょう。
          </p>
          <p className="text-sm leading-relaxed opacity-90">
            公開している解説記事やスライド資料が、セキュリティやコンピュータの仕組みに興味を持つ方の最初の一歩になれば幸いです。
          </p>
        </div>

        {/* 運営と更新について */}
        <div className="pt-2">
          <h2 className="text-2xl font-bold mb-4 text-foreground tracking-tight border-t border-border/60 pt-8">
            運営と更新について
          </h2>
          <div className="space-y-4 text-sm leading-relaxed opacity-90">
            <p>
              当サイトのコンテンツは、私自身が学びながら自分の言葉で整理・記録している学習ノートでもあります。
              そのため、至らない点や根拠の不足、誤った情報が含まれてしまうことがあるかもしれません。もしお気づきの点がありましたら、優しくご指摘いただけますと大変助かります。
            </p>
            <p>
              また、技術仕様や仕組みを理解する上で、様々な書籍や先人の知見を参考にしています。そのため、既存の解説や書籍と説明の流れ・言い回しが似通ってしまう場合がございます。何卒、ご了承願います。
            </p>
            <p>
              そして、コンテンツの追加は私の学習進度に合わせて少しずつ行っていくため、更新はスローペースになる予定です。もし更新に追いついてしまった場合は、ぜひ一緒に手を動かしながら、同じ学習の仲間として勉強していきましょう。
            </p>
          </div>
        </div>
      </section>

      <p className="text-sm leading-relaxed mb-8 opacity-90">
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

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-3 flex items-center">
          <span className="mr-2">5.</span> AI & Disclaimer
        </h2>
        <span className="space-y-2 text-sm leading-relaxed opacity-90">
          当サイト（ctfgo.net）と当サイトのコンテンツは、AI技術を活用して開発・運用されています。掲載情報の正確性や安全性には十分注意しておりますが、内容の保証はいたしかねます。当サイトの利用により生じた損害について、管理者は一切の責任を負いません。
          This website (ctfgo.net) is developed and operated with the assistance
          of AI technology. While we strive for accuracy, we cannot guarantee
          the complete reliability of all content. Use at your own risk.
        </span>
      </section>

      <hr className="my-8 border-border" />

      {/* About Me セクション */}
      <section className="p-6 rounded-xl border border-border max-w-2xl mx-auto bg-foreground/5">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* 丸形アイコン */}
          <div className="flex-shrink-0">
            <Image
              src="/author_icon.jpg"
              alt="運営者のアイコン"
              width={96}
              height={96}
              className="w-20 h-20 rounded-full object-cover grayscale-[30%] opacity-90"
            />
          </div>

          {/* テキストコンテンツ */}
          <div className="flex-grow text-center sm:text-left">
            <div className="mb-2">
              <h2 className="text-lg font-medium inline-block mr-2">
                nikodehyakuen
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
                href="https://github.com/suikamin/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition underline underline-offset-4"
              >
                GitHub
              </a>
              <a
                href="https://x.com/nikodehyakuen"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition underline underline-offset-4"
              >
                X (旧Twitter)
              </a>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition underline underline-offset-4"
              >
                YouTube - 準備中 -
              </a>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition underline underline-offset-4"
              >
                Discord - 準備中 -
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
