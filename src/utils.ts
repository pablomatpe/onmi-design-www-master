import { css } from "styled-components";

export const vwScale = (px: number): string => `${(px / 1920) * 100}vw`;

export const underlineLinkStyle = (
  color = "white",
  hoverColor = "black"
): any => css`
  color: inherit;
  text-decoration: none;
  width: calc(100% + 1px);
  background-image: linear-gradient(
      transparent calc(100% - 1px),
      ${hoverColor} 1px
    ),
    linear-gradient(transparent calc(100% - 1px), ${color} 1px);
  background-repeat: no-repeat;
  background-size: 0% 100%, 100% 100%;
  background-position-y: -2px, -2px;
  transition: background-size 0.4s ease;

  &:hover {
    background-size: 100% 100%, 100% 100%;
    transition-duration: 0.6s;
  }
`;
