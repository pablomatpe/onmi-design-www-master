import styled, { keyframes } from "styled-components";

import theme from "@/theme";

const Svg = styled.svg`
  display: block;
`;

const flip = keyframes`
0% {
  transform: scaleX(1);
}

50% {
  transform: scaleX(-1) translateX(13%);
}

100% {
  transform: scaleX(1);
}
`;

const AnimatedPath = styled.path`
  transform-origin: center center;
  animation: ${flip} 1.5s step-end infinite;
`;

export const CoffeeIcon: React.FC = (props) => {
  return (
    <Svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 106 98">
      <g fill="none" stroke={theme.colors.dark} strokeWidth="2.786">
        <AnimatedPath
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M22.89 37.18l11.09-11.09-11.09-11.1L33.97 3.91m8.11 33.27l11.1-11.09-11.1-11.1L53.16 3.91m8.12 33.27l11.09-11.09-11.09-11.1L72.36 3.91"
        />
        <path d="M91.52 49.1v1.05c0 24.24-19.65 43.88-43.89 43.88-24.24 0-43.89-19.64-43.89-43.88V49.1h87.78zm-4.96 21.32c1.5.74 3.18 1.15 4.96 1.15 6.2 0 11.23-5.03 11.23-11.23 0-6.21-5.03-11.24-11.23-11.24" />
      </g>
    </Svg>
  );
};
