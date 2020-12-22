import styled from "styled-components";

import { media } from "@/theme";
import { vwScale } from "@/utils";

const Svg = styled.svg`
  display: block;
  max-width: 100%;
  width: ${vwScale(90)};
  height: auto;

  ${media.mobile`
    width: 84px;
  `}
`;

const Path = styled.path`
  fill-rule: evenodd;
  fill: ${({ theme }) => theme.colors.dark};
`;

export const OnmiLogo: React.FC<React.SVGAttributes<SVGElement>> = (props) => (
  <Svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewBox="0 0 662 122.3"
    preserveAspectRatio="xMinYMin"
  >
    <title>ONMI®</title>
    <g>
      <Path d="M93.1 0c76 0 85.8 36.3 85.8 58.4v4.8c0 22-9.7 59.1-85.8 59.1H86c-76.3 0-86-37.1-86-59.1v-4.8C0 36.2 9.7 0 86 0h7.1zm39.3 59.5c0-12.5-8.1-27.9-42.9-27.9C54 31.6 46.6 47 46.6 59.5v1.9c0 12.4 8.1 29 42.9 29s42.9-16 42.9-28.7v-2.2zM240.6 2.2l68.4 67v-67h44.7V120h-45l-73.8-71.4V120h-44.7V2.2h50.4zM368.8 2.2h61.8l36.1 66.2 36.7-66.2h59.2V120h-44.5V46.5L476.8 120h-23l-41.2-73.5V120h-43.9V2.2h.1zM622.7 120h-44.8V2.2h44.8V120z" />
      <Path d="M662 14.4c0 8.2-6.4 14.6-14.7 14.6s-14.8-6.4-14.8-14.6c0-8 6.6-14.4 14.8-14.4 8.3 0 14.7 6.4 14.7 14.4zm-25.9 0c0 6.4 4.7 11.5 11.2 11.5 6.3 0 11-5.1 11-11.4 0-6.4-4.7-11.6-11.1-11.6S636.1 8 636.1 14.4zm8.9 7.5h-3.3V7.5c1.3-.3 3.2-.4 5.5-.4 2.7 0 4 .4 5 1.1.8.6 1.4 1.8 1.4 3.2 0 1.6-1.2 2.8-3 3.3v.2c1.4.5 2.2 1.6 2.6 3.5.4 2.2.7 3.1 1.1 3.6h-3.6c-.4-.5-.7-1.8-1.1-3.5-.3-1.6-1.1-2.3-3-2.3H645v5.7zm.1-8.2h1.6c1.8 0 3.3-.6 3.3-2.1 0-1.3-1-2.2-3.1-2.2-.9 0-1.5.1-1.8.2v4.1z" />
    </g>
  </Svg>
);
