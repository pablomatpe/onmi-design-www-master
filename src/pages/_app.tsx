import NextApp from "next/app";
import { ThemeProvider } from "styled-components";

import theme, { GlobalStyles } from "@/theme";

export default class App extends NextApp {
  render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />

        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
