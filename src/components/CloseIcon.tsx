import styled from "styled-components";

import { theme } from "@/theme";

interface Props {
  strokeWidth?: number;
}

const Svg = styled.svg`
  display: block;
`;

export const CloseIcon: React.FC<Props> = ({
  strokeWidth = 1.22,
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 15 15"
    width="15"
    height="15"
    {...props}
  >
    <path d="M.794.414L14.58 14.202"></path>
    <path
      fill="none"
      stroke={theme.colors.light}
      strokeMiterlimit="20"
      strokeWidth={strokeWidth}
      d="M.794.414L14.58 14.202"
    ></path>
    <path d="M14.581.414L.794 14.202"></path>
    <path
      fill="none"
      stroke={theme.colors.light}
      strokeMiterlimit="20"
      strokeWidth={strokeWidth}
      d="M14.581.414L.794 14.202"
    ></path>
  </Svg>
);
