import { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import he from "he";

import { CoffeeIcon } from "@/components/CoffeeIcon";
import { OnmiLogo } from "@/components/OnmiLogo";
import { media } from "@/theme";
import { FooterData } from "@/api";
import { vwScale, underlineLinkStyle } from "@/utils";
import { FOOTER_ID } from "@/constants";

interface Props {
  data: FooterData;
  isMobile?: boolean;
}

export const FOOTER_ID_INNER = "onmiPageFooterInner";

const FooterWrap = styled.footer`
  position: fixed;
  z-index: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.dark};
  padding: ${vwScale(130)} ${vwScale(50)} ${vwScale(60)};

  ${media.mobile`
    padding: 60px 20px 14px;
    position: relative;
    z-index: initial;
  `}
`;

const FooterInner = styled.div`
  max-width: ${vwScale(1024)};
  margin: 0 auto;
  display: flex;

  ${media.mobile`
    flex-direction: column;
    max-width: 100%;
  `}
`;

const FooterIconWrap = styled.div`
  margin-right: ${vwScale(35)};

  ${media.mobile`

    margin-right: 0;
    margin-bottom: 24px;
  `}
`;

const FooterCofeeIcon = styled(CoffeeIcon)`
  width: ${vwScale(61)};
  height: ${vwScale(55)};

  ${media.mobile`
    width: 62px;
    height: 57px;
    margin-right: 0;
    margin-bottom: 24px;
  `}
`;

const FooterMainContent = styled.div`
  margin-right: ${vwScale(138)};
  flex: 1 0 52%;

  ${media.tablet`
    margin-right: 68px;
  `}

  ${media.mobile`
    flex: initial;
    margin-right: 0;
    margin-bottom: 24px;
    max-width: 600px;
  `}
`;

const FooterMainTitle = styled.h5`
  font-size: ${vwScale(38)};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  ${media.mobile`
    font-size: 20px;
    margin-bottom: 18px;
  `}
`;

const FooterMainText = styled.div`
  p {
    font-size: ${vwScale(30)};
  }

  a {
    ${({ theme }) => underlineLinkStyle(theme.colors.dark, theme.colors.light)}
  }

  ${media.mobile`
    p {
      font-size: 20px;
    }
  `}
`;

const FooterRightBlocks = styled.div`
  ${media.mobile`
    max-width: 400px;
  `}
`;

const FooterRightBlock = styled.div`
  &:not(:last-child) {
    margin-bottom: ${vwScale(20)};

    ${media.mobile`
      margin-bottom: 26px;
    `}
  }
`;

const RightBlockHeading = styled.h6`
  font-size: ${vwScale(20)};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${vwScale(4)};

  ${media.mobile`
    font-size: 20px;
    margin-bottom: 5px;
  `}
`;

const RightBlockText = styled.p`
  font-size: ${vwScale(20)};
  line-height: 1.25;

  &:not(:last-of-type) {
    margin-bottom: 4px;
  }

  ${media.mobile`
    font-size: 20px;

    &:not(:last-of-type) {
      margin-bottom: 2px;
    }
  `}
`;

const UnderlineLink = styled.a`
  ${({ theme }) => underlineLinkStyle(theme.colors.dark, theme.colors.light)}
`;

const FooterCopyright = styled.p`
  color: ${({ theme }) => theme.colors.grey};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${vwScale(11)};
  margin-top: ${vwScale(85)};

  ${media.mobile`
    font-size: 9px;
    margin-top: 52px;
  `}
`;

const getFooterHeight = (): number => {
  const node = document.getElementById(FOOTER_ID_INNER);

  if (node) {
    return node?.getBoundingClientRect()?.height ?? 0;
  }

  return 0;
};

export const FooterSpace: React.FC = () => {
  const [footerHeight, setFooterHeight] = useState(0);

  useLayoutEffect(() => {
    const updateFooterHeight = (): void => setFooterHeight(getFooterHeight());

    updateFooterHeight();

    window.addEventListener("resize", updateFooterHeight);

    return () => window.removeEventListener("resize", updateFooterHeight);
  }, []);

  return <div id={FOOTER_ID} style={{ height: footerHeight }} />;
};

export const Footer: React.FC<Props> = ({ data, isMobile }) => (
  <FooterWrap id={!isMobile ? FOOTER_ID_INNER : FOOTER_ID}>
    <FooterInner>
      <FooterIconWrap>
        <FooterCofeeIcon />
      </FooterIconWrap>
      <FooterMainContent>
        <FooterMainTitle>{data.title}</FooterMainTitle>
        <FooterMainText
          dangerouslySetInnerHTML={{ __html: data.subtitle || "" }}
        />
      </FooterMainContent>
      <FooterRightBlocks>
        <FooterRightBlock>
          <RightBlockHeading>Síguenos</RightBlockHeading>
          {data.socialLinks.map((l) => (
            <RightBlockText key={l.text}>
              <UnderlineLink href={l.url} target="_blank" rel="noopener">
                {l.text}
              </UnderlineLink>
            </RightBlockText>
          ))}
        </FooterRightBlock>
        <FooterRightBlock>
          <RightBlockHeading>Hablemos</RightBlockHeading>
          <RightBlockText>
            <UnderlineLink
              href={`mailto:${he.decode(data.email)}`}
              rel="noopener noreferrer"
              dangerouslySetInnerHTML={{ __html: data.email }}
            />
          </RightBlockText>
          <RightBlockText>
            <UnderlineLink href={`tel:${data.phone}`} rel="noopener noreferrer">
              {data.phone}
            </UnderlineLink>
          </RightBlockText>
        </FooterRightBlock>
        <FooterRightBlock>
          <RightBlockHeading>Visítanos</RightBlockHeading>
          <RightBlockText>
            <UnderlineLink
              href={data.addressLink}
              target="_blank"
              rel="noopener"
            >
              {data.address}
            </UnderlineLink>
          </RightBlockText>
        </FooterRightBlock>
        <FooterRightBlock style={{ paddingTop: 8 }}>
          <OnmiLogo style={{ marginBottom: 11 }} />
          <RightBlockText>
            Descubre el universo Onmi y como puede ayudar a tu empresa en{" "}
            <UnderlineLink
              href="https://www.onmi.es"
              target="_blank"
              title="ONMI"
            >
              www.onmi.es
            </UnderlineLink>
          </RightBlockText>
        </FooterRightBlock>

        <FooterCopyright>{data.copyright}</FooterCopyright>
      </FooterRightBlocks>
    </FooterInner>
  </FooterWrap>
);
