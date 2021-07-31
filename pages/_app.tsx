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
        <link rel='icon' href='/images/logo.png' />
      </Head>
      <Global styles={resetStyle} />
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
