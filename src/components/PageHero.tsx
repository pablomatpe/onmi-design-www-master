import { useEffect, useState } from "react";

import styled, { css } from "styled-components";

import { media } from "@/theme";
import { vwScale } from "@/utils";

import { Marquee } from "./Marquee";

interface Props {
  backgroundUrl?: string;
  content?: string;
  title: string;
}

const HeroWrap = styled.div<{ bg?: string }>`
  padding: ${vwScale(140)} 0 0;
  margin-bottom: ${vwScale(168)};
  overflow: hidden;

  ${media.mobile`
    padding-top: 30px;
    margin-bottom: 48px;
  `}

  ${({ bg }) =>
    !!bg &&
    css`
      padding: 16vw 0; 
      background: no-repeat center center / cover;
      background-image: url('${bg}');

      ${media.mobile`
        padding: 33vw 0;
      `}
    `}
`;

const TitleWrap = styled.div`
  white-space: nowrap;
`;

const Title = styled.h1`
  display: inline-block;
  font-size: ${vwScale(187)};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-transform: uppercase;
  margin-right: ${vwScale(100)};
  margin-left: ${vwScale(50)};

  ${media.mobile`
    font-size: 70px;
    margin-left: 20px;
    margin-right: 40px;
  `}
`;

const Content = styled.p`
  font-size: ${vwScale(54)};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  padding: 0 ${vwScale(50)};
  margin-top: ${vwScale(140)};

  ${media.mobile`
    font-size: 24px;
    padding: 0 20px;
    margin-top: 30px;
  `}
`;

export const PageHero: React.FC<Props> = ({
  backgroundUrl,
  content,
  title
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <HeroWrap bg={backgroundUrl}>
      <TitleWrap>
        {hasMounted ? (
          <Marquee direction="left" childMargin={0} speed={0.2} delay={450}>
            <Title>{title}</Title>
          </Marquee>
        ) : (
          <Title>{title}</Title>
        )}
      </TitleWrap>
      {content && <Content>{content}</Content>}
    </HeroWrap>
  );
};
