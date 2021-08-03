import type { AppProps } from "next/app";
import Head from "next/head";
import { Global } from "@emotion/react";
import { resetStyle } from "@styles/resetStyle";

import { Provider } from "react-redux";
import { store } from "@store/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome Drink</title>
        <link rel='icon' href='/images/clocker_pink_logo.png' />
        <meta property='og:type' content='website' />
        <meta name='description' content='음료를 선택해주세요. :)' />
        <meta property='og:image' content='/images/welcome.jpeg' />
      </Head>
      <Global styles={resetStyle} />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
export default MyApp;
