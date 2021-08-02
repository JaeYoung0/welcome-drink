import type { AppProps } from "next/app";
import Head from "next/head";
import { Global } from "@emotion/react";
import { resetStyle } from "@styles/resetStyle";
import { connectToDatabase } from "@lib/mongodb";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Welcome Drink</title>
        <link rel='icon' href='/images/clocker_pink_logo.png' />
        <meta property='og:type' content='website' />
        <meta name='description' content='음료를 선택해주세요. :)' />
        <meta property='og:image' content='/images/welcome.jpeg' />
      </Head>
      <Global styles={resetStyle} />
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
