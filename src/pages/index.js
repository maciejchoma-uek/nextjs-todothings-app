import Head from "next/head";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>thingstodo</title>
        <meta name="description" content="thingstodo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={openSans.className}>Hello, world!</main>
    </>
  );
}
