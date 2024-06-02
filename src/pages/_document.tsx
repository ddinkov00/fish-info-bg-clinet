import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon.png" />
        <title>FishInfo</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Seymour+One&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
