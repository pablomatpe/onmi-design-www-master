import { ThemeType } from "@/theme";

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {} // eslint-disable-line @typescript-eslint/no-empty-interface
}
