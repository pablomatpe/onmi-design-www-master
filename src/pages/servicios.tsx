import { NextPage, GetStaticProps } from "next";
import { Fragment, useMemo } from "react";
import styled from "styled-components";

import { PageHero } from "@/components/PageHero";
import { PageWrap } from "@/components/PageWrap";
import { media } from "@/theme";
import { getServicesData, ServicesData } from "@/api";
import { vwScale } from "@/utils";

interface Props {
  data: ServicesData;
}

const ServiceSections = styled.section`
  padding: 0 ${vwScale(50)};

  ${media.mobile`
    padding: 0 20px;
  `}
`;

const Service = styled.div`
  width: ${vwScale(1582)};
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  border-top: 1px solid ${({ theme }) => theme.colors.light};
  padding: ${vwScale(45)} 0 ${vwScale(240)};

  ${media.mobile`
    flex-direction: column;
    padding-bottom: 54px;
  `}
`;

const ServiceTitle = styled.h2`
  font-size: ${vwScale(54)};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  flex: 1;
  padding-right: ${vwScale(40)};

  ${media.mobile`
    flex: initial;
    padding-right: 0;
    margin-bottom: 32px;
    font-size: 29px;
    width: 100%;
    position: relative;

    &::after {
      content: attr(data-index);
      font-size: 17px;
      position: absolute;
      right: 0;
      bottom:0;
    }
  `}
`;

const ServiceMain = styled.div`
  flex: 0 0 58%;
`;

const ServiceMainTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${vwScale(33)};
  margin-bottom: ${vwScale(42)};

  ${media.mobile`
    font-size: 17px;
    margin-bottom: 26px;
  `}
`;

const ServiceMainBody = styled.div`
  margin-bottom: ${vwScale(52)};

  p {
    font-size: ${vwScale(18)};

    &:not(:last-child) {
      margin-bottom: ${vwScale(35)};
    }
  }

  ${media.mobile`
    margin-bottom: 40px;

     p {
      font-size: 17px;

      &:not(:last-child) {
        margin-bottom: 24px;
      }
    }
  `}
`;

const SubServicesTitle = styled.h4`
  font-size: ${vwScale(18)};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  margin-bottom: ${vwScale(36)};

  strong {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }

  &::before {
    content: "➡";
    display: inline-block;
    margin-right: ${vwScale(8)};
  }

  ${media.mobile`
    font-size: 17px;
    margin-bottom: 16px;

    &::before {
      margin-right: 10px;
    }
  `}
`;

const SubServicesList = styled.h5`
  font-size: ${vwScale(24)};
  line-height: 1.8;
  display: flex;
  flex-wrap: wrap;

  span {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: ${({ theme }) => theme.fontWeights.bold};

    &:not(:last-of-type) {
      &::after {
        content: "/";
        margin: 0 ${vwScale(8)};
        display: inline-block;
        font-family: ${({ theme }) => theme.fonts.body};
        font-weight: ${({ theme }) => theme.fontWeights.normal};
      }
    }
  }

  ${media.mobile`
    font-size: 17px;
    line-height: 1.4;

    span:not(:last-of-type)::after {
      margin: 0 10px;
    }
  `}
`;

const Services: NextPage<Props> = ({ data }) => {
  const seoData = useMemo(
    () => ({
      ...data.seo,
      slug: "servicios"
    }),
    [data]
  );

  return (
    <PageWrap seoData={seoData}>
      <PageHero backgroundUrl={data.hero.image} title={data.hero.title} />

      <ServiceSections>
        {data.services.map(({ description, items, name, title }, index) => (
          <Service key={name}>
            <ServiceTitle data-index={`${index + 1}`.padStart(2, "0")}>
              {name}
            </ServiceTitle>
            <ServiceMain>
              <ServiceMainTitle>{title}</ServiceMainTitle>

              <ServiceMainBody
                dangerouslySetInnerHTML={{ __html: description }}
              />

              <SubServicesTitle>
                Servicios de <strong>{name}</strong>
              </SubServicesTitle>

              <SubServicesList>
                {items.map((item) => (
                  <Fragment key={`${name}_${item}`}>
                    <span>{item}</span>{" "}
                  </Fragment>
                ))}
              </SubServicesList>
            </ServiceMain>
          </Service>
        ))}
      </ServiceSections>
    </PageWrap>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await getServicesData();

  return {
    props: {
      data
    }
  };
};

export default Services;
