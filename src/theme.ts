import { createGlobalStyle, css, ThemedCssFunction } from "styled-components";

const fallbackFonts = `Helvetica, Arial, sans-serif`;

export const theme = {
  colors: {
    dark: "#000000",
    grey: "#999999",
    light: "#ffffff"
  },
  fonts: {
    body: `ProximaNova, ${fallbackFonts}`,
    heading: `DrukWide, ${fallbackFonts}`
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 800
  }
};

export type ThemeType = typeof theme;

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'DrukWide';
    src: url('/fonts/DrukWide-Medium.woff2') format('woff2'),
        url('/fonts/DrukWide-Medium.woff') format('woff'),
        url('/fonts/DrukWide-Medium.ttf') format('truetype');
    font-weight: ${theme.fontWeights.medium};
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'DrukWide';
    src: url('/fonts/DrukWide-Bold.woff2') format('woff2'),
        url('/fonts/DrukWide-Bold.woff') format('woff'),
        url('/fonts/DrukWide-Bold.ttf') format('truetype');
    font-weight: ${theme.fontWeights.bold};
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'ProximaNova';
    src: url('/fonts/proximanova-regular.woff2') format('woff2'),
         url('/fonts/proximanova-regular.woff') format('woff');
    font-weight:  ${theme.fontWeights.normal};
    font-style: normal;
    font-display: swap;
  }

  body {
    padding: 0;
    margin: 0;
    font-family: ${theme.fonts.body};
    font-weight: ${theme.fontWeights.normal};
    color: ${theme.colors.light};
    background: ${theme.colors.dark};
    transition: background 0.2s ease;
    overscroll-behavior: none;
  }

  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
  ol,
  li {
    margin: 0;
    padding: 0;
  }
`;

type BreakpointEnum = "mobile" | "tablet" | "desktop" | "desktopLarge";

export const breakpoints: { [key in BreakpointEnum]: number } = {
  mobile: 812,
  tablet: 1112,
  desktop: 1600,
  desktopLarge: 1920
};

type MediaType = { [key in BreakpointEnum]: ThemedCssFunction<ThemeType> };

// @ts-ignore
export const media: MediaType = Object.keys(breakpoints).reduce((acc, b) => {
  const size = breakpoints[b as BreakpointEnum];

  return {
    ...acc,
    [b]: (...args: any) =>
      css`
        @media (max-width: ${size}px) {
          ${//
          // @ts-ignore
          css(...args)}
        }
      `
  };
}, {});

export default theme;
