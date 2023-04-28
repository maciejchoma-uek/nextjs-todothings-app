import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body className="min-h-screen bg-neutral-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
