import { useState, useCallback } from "react";
import { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import styled from "styled-components";

import { Marquee } from "@/components/Marquee";
import { PageWrap } from "@/components/PageWrap";
import { ProjectGridItem } from "@/components/GridItems";
import { ProjectModal } from "@/components/ProjectModal";
import { media } from "@/theme";
import { HomeData, getHomeData } from "@/api";
import { underlineLinkStyle, vwScale } from "@/utils";

const HeroImage = styled.div<{ bg: string }>`
  height: ${vwScale(881)};
  background: no-repeat center center / cover;
  background-image: ${({ bg }) => `url('${bg}')`};

  ${media.mobile`
    height: 82vw;
  `};
`;

const HeroTextSection = styled.div`
  padding: ${vwScale(36)} ${vwScale(50)} ${vwScale(46)};

  ${media.mobile`
    padding: 12px 20px 14px;
  `}
`;

const HeroText = styled.h1`
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${vwScale(55)};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${vwScale(106)};

  ${media.mobile`
    font-size: 24px;
    margin-bottom: 28px;
  `}
`;

const HeroFootnote = styled.p`
  text-transform: uppercase;
  font-size: ${vwScale(18)};

  ${media.mobile`
    font-size: 17px;
  `}
`;

const ProjectsHeader = styled.header`
  background: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.dark};
  text-align: center;
  padding: ${vwScale(44)};

  ${media.mobile`
    padding: 22px;
  `}
`;

const ProjectsHeading = styled.h2`
  font-size: ${vwScale(24)};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  ${media.mobile`
    font-size: 10px;
    text-transform: uppercase;
  `}
`;

const ProjectsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: ${vwScale(38)};

  ${media.mobile`
    margin-bottom: 20px;
  `}
`;

const ProjectsFooter = styled.footer`
  text-align: center;
  margin-bottom: ${vwScale(78)};

  ${media.mobile`
    display: none;
  `}
`;

const ProjectsViewMoreLink = styled.a`
  color: ${({ theme }) => theme.colors.light};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${vwScale(18)};

  ${({ theme }) => underlineLinkStyle(theme.colors.dark, theme.colors.light)};
`;

const AboutSection = styled.section`
  padding: 0 ${vwScale(50)} ${vwScale(98)};

  ${media.mobile`
    padding: 0 20px 38px;
  `}
`;

const AboutHeading = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 69px;
  margin-bottom: 82px;

  ${media.mobile`
    font-size: 24px;
    margin-bottom: 30px;
  `}
`;

const AboutContent = styled.div`
  columns: 2;
  column-gap: ${vwScale(22)};
  width: 80%;

  p {
    font-size: ${vwScale(18)};
    font-weight: 400;
  }

  ${media.tablet`
    width: 100%;
  `}

  ${media.mobile`
    columns: 1;

    p {
      font-size: 17px;

      &:not(:last-child) {
        margin-bottom: 24px;
      }
    }
  `}
`;

const MarqueeWrap = styled.div`
  white-space: nowrap;
  margin-bottom: ${vwScale(130)};

  ${media.mobile`
    margin-bottom: 38px;
  `}
`;

const MarqueeText = styled.h4`
  display: inline-block;
  font-size: ${vwScale(187)};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-transform: uppercase;
  margin-left: ${vwScale(50)};
  margin-right: ${vwScale(150)};

  a {
    color: inherit;
    text-decoration: none;
  }

  ${media.mobile`
    font-size: 70px;
    margin-left: 20px;
    margin-right: 60px;
  `}
`;

const Home: NextPage<{
  data: HomeData;
}> = ({ data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");
  const [iframeTitle, setIframeTitle] = useState("");

  const onGridItemClick = useCallback((title: string, url: string): void => {
    setIsModalVisible(true);
    setIframeTitle(title);
    setIframeUrl(url);
  }, []);

  return (
    <>
      <PageWrap seoData={data.seo}>
        <section>
          <HeroImage bg={data.intro.image} />
          <HeroTextSection>
            <HeroText>{data.intro.title}</HeroText>
            <HeroFootnote>{data.intro.cite}</HeroFootnote>
          </HeroTextSection>
        </section>

        <section id="projects">
          <ProjectsHeader>
            <ProjectsHeading>{data.projects.title}</ProjectsHeading>
          </ProjectsHeader>
          <ProjectsGrid>
            {data.projects.items.map((item) => (
              <ProjectGridItem
                key={item.slug}
                imageUrl={item.imageUrl}
                onClick={onGridItemClick}
                projectUrl={item.behanceUrl}
                title={item.title}
                slug={item.slug}
              />
            ))}
          </ProjectsGrid>
          <ProjectsFooter>
            <Link href="/proyectos" passHref>
              <ProjectsViewMoreLink>
                {data.projects.linkText}
              </ProjectsViewMoreLink>
            </Link>
          </ProjectsFooter>
        </section>

        <AboutSection>
          <AboutHeading>{data.about.title}</AboutHeading>

          <AboutContent dangerouslySetInnerHTML={{ __html: data.about.text }} />
        </AboutSection>

        {data.about.scrollingText && (
          <MarqueeWrap>
            <Marquee direction="left" childMargin={0} speed={0.4} delay={800}>
              <MarqueeText
                dangerouslySetInnerHTML={{ __html: data.about.scrollingText }}
              />
            </Marquee>
          </MarqueeWrap>
        )}
      </PageWrap>

      <ProjectModal
        isVisible={isModalVisible}
        onCloseClick={() => setIsModalVisible(false)}
        src={iframeUrl}
        title={iframeTitle}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await getHomeData();

  return {
    props: {
      data
    }
  };
};

export default Home;
