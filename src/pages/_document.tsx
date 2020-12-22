import NextDocument, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript
} from "next/document";
import { ServerStyleSheet } from "styled-components";
import htmlParser from "html-react-parser";

import scriptsData from "@/_contents/scripts.json";

const HEAD_SCRIPTS = scriptsData.head ? htmlParser(scriptsData.head) : null;
const BODY_SCRIPTS = scriptsData.body ? htmlParser(scriptsData.body) : null;

export default class Document extends NextDocument {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await NextDocument.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="es">
        <Head>
          {HEAD_SCRIPTS}
          <link
            rel="preload"
            as="font"
            href="/fonts/DrukWide-Medium.woff2"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="font"
            href="/fonts/DrukWide-Bold.woff2"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="font"
            href="/fonts/proximanova-regular.woff2"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
          {BODY_SCRIPTS}
        </body>
      </Html>
    );
  }
}
