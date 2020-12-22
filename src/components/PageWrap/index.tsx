import { useState, useEffect } from "react";
import styled from "styled-components";
import ScrollerMotion from "scroller-motion";
import { useMediaQuery } from "react-responsive";

import { breakpoints } from "@/theme";
import footerData from "@/_contents/footer.json";

import { Footer, FooterSpace } from "./Footer";
import { HeadMeta, HeadMetaProps } from "./HeadMeta";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";

interface Props {
  seoData?: HeadMetaProps;
  showFooter?: boolean;
  showHeader?: boolean;
}

const StyledScrollerMotion = styled(ScrollerMotion)`
  position: relative;
  z-index: 2;
  pointer-events: none;
`;

const PageInnerWrap = styled.div`
  position: relative;
  z-index: 2;
  background: ${({ theme }) => theme.colors.dark};
  pointer-events: all;
  padding-bottom: 1px;
`;

export const PageWrap: React.FC<Props> = ({
  children,
  seoData,
  showFooter = true,
  showHeader = true
}) => {
  const isMobile = useMediaQuery({
    query: `(max-width: ${breakpoints.mobile}px)`
  });
  const [showMobileNav, setShowMobileNav] = useState(false);

  useEffect(() => {
    const onClick = (e: Event): void => {
      const target = e.target as HTMLElement;

      if (target && target.tagName.toLowerCase() === "a") {
        const { href } = target as HTMLAnchorElement;

        if (href.includes("#")) {
          const [, hash] = href.split("#");

          const element = document.getElementById(hash);

          if (element) {
            e.preventDefault();
            window.scrollTo({ top: element.offsetTop });
          }
        }
      }
    };

    document.addEventListener("click", onClick);

    return () => document.removeEventListener("click", onClick);
  });

  return (
    <>
      {seoData && <HeadMeta {...seoData} />}

      <StyledScrollerMotion>
        <PageInnerWrap>
          {showHeader && (
            <Header onMobileMenuClick={() => setShowMobileNav(true)} />
          )}

          {children}

          {isMobile && showFooter && footerData && (
            <Footer data={footerData} isMobile />
          )}
        </PageInnerWrap>

        {!isMobile && showFooter && footerData && <FooterSpace />}
      </StyledScrollerMotion>

      {!isMobile && showFooter && footerData && <Footer data={footerData} />}

      {showHeader && isMobile && showMobileNav && (
        <MobileNav onCloseClick={() => setShowMobileNav(false)} />
      )}
    </>
  );
};
