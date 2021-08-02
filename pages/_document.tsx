import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel='manifest' href='/manifest.json' />
          <link
            rel='apple-touch-icon'
            href='/images/icon_pink-192x192.png'
          ></link>
          <link
            rel='apple-touch-icon'
            href='/images/icon_pink-256x256.png'
          ></link>
          {/* <link rel='apple-touch-icon' href='/images/icon-192x192.png'></link> */}
          <meta name='theme-color' content='#fff' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
