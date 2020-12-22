import { Fragment, useMemo } from "react";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import styled, { css } from "styled-components";

import { PageWrap } from "@/components/PageWrap";
import { media } from "@/theme";
import { vwScale, underlineLinkStyle } from "@/utils";
import { getNewsData, getPostData, PostPageData } from "@/api";

interface Props {
  data: PostPageData;
  slug: string;
}

const h1Style = css`
  font-size: ${vwScale(54)};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  ${media.mobile`
    font-size: 32px;
  `}
`;

const h2Style = css`
  font-size: ${vwScale(42)};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  ${media.mobile`
    font-size: 28px;
  `}
`;

const h3Style = css`
  font-size: ${vwScale(33)};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  ${media.mobile`
    font-size: 18px;
  `}
`;

const h4Style = css`
  font-size: ${vwScale(24)};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  ${media.mobile`
    font-size: 17px;
  `}
`;

const h5Style = css`
  font-size: ${vwScale(18)};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  ${media.mobile`
    font-size: 15px;
  `}
`;

const h6Style = css`
  font-size: ${vwScale(12)};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  ${media.mobile`
    font-size: 12px;
  `}
`;

const HeroImage = styled.div<{ source: string }>`
  background: no-repeat center center / cover;
  background-image: ${({ source }) => `url('${source}')`};
  height: ${vwScale(816)};

  ${media.mobile`
    height: 375px;
  `}
`;

const PostOuter = styled.div`
  padding: ${vwScale(160)} ${vwScale(20)} ${vwScale(108)};

  ${media.mobile`
    padding: 30px 20px 50px;
  `}
`;

const PostInner = styled.article`
  width: ${vwScale(1280)};
  max-width: 100%;
  margin: 0 auto;

  ${media.tablet`
    width: 100%;
  `}
`;

const PostHeader = styled.header`
  margin: 0 0 ${vwScale(80)};

  ${media.mobile`
    margin-bottom: 40px;
  `}
`;

const PostTitle = styled.h1`
  ${h1Style}
`;

const PostContent = styled.section`
  h1 {
    ${h1Style}
    margin-bottom: ${vwScale(60)};
    
    ${media.mobile`
      margin-bottom: 38px;
    `}
  }

  h2 {
    ${h2Style}
    margin-bottom: ${vwScale(50)};

    ${media.mobile`
      margin-bottom: 34px;
    `}
  }

  h3 {
    ${h3Style}
    margin-bottom: ${vwScale(40)};

    ${media.mobile`
      margin-bottom: 30px;
    `}
  }

  h4 {
    ${h4Style}
  }

  h5 {
    ${h5Style}
  }

  h6 {
    ${h6Style}
  }

  h4,
  h5,
  h6 {
    margin-bottom: ${vwScale(30)};

    ${media.mobile`
      margin-bottom: 24px;
    `}
  }

  p {
    font-size: ${vwScale(18)};
    line-height: 1.3;
    font-weight: ${({ theme }) => theme.fontWeights.normal};
    margin-bottom: ${vwScale(24)};

    ${media.mobile`
      font-size: 17px;
      margin-bottom: 22px;
    `}
  }

  a {
    ${underlineLinkStyle()}
  }

  blockquote {
    display: block;
    text-align: center;
    line-height: 1.25;
    padding: 0 ${vwScale(64)};
    margin: ${vwScale(40)} 0;

    &, p {
      ${h3Style}
    }

    p {
      display: inline;
    }

    &::before,
    &::after {
      display: inline;
    }

    &::before {
      content: "“";
      padding-right: ${vwScale(3)};
    }

    &::after {
      content: "”";
      padding-left: ${vwScale(3)};
    }

    ${media.mobile`
      padding: 0 20px;
      margin: 30px 0;

      &::before {
        padding-right: 2px;
      }

      &::after {
        padding-left: 2px;
      }
    `}
  }

  img {
    display: block;
    max-width: 100%;
    margin: ${vwScale(60)} 0 ${vwScale(80)};

    &.aligncenter {
      margin: 0 auto;
    }

    &.alignright {
      margin-left: auto;
    }

    ${media.mobile`
      margin-top: 40px;
      margin-bottom: 40px;
    `}
  }

  ul {
    margin-bottom: ${vwScale(40)};
    list-style: none;

    li {
      position: relative;
      margin-bottom: ${vwScale(6)};
      padding-left: ${vwScale(22)};
      font-size: ${vwScale(18)};

      &::before {
        content: "\\27A1";
        position: absolute;
        top: ${vwScale(2)};
        left: 0;
        line-height: ${vwScale(18)};
      }
    }

    ${media.mobile`
      margin-bottom: 28px;

      li {
        font-size: 18px;
        padding-left: 22px;
        margin-bottom: 5px;

        &::before {
          top: 2px;
          line-height: 18px;
        }
      }
    `}
  }

  ol {
    list-style: none;
    margin-bottom: ${vwScale(40)};

    li {
      ${h4Style};
      margin-bottom: ${vwScale(6)};
    }

    ${media.mobile`
      margin-bottom: 30px;

      li {
        margin-bottom: 6px;
      }
    `}
  }
`;

const PostTags = styled.ul`
  margin-top: ${vwScale(50)};
  list-style: none;

  ${media.mobile`
    margin-top: 40px;
  `}
`;

const PostTag = styled.li`
  ${h5Style}
  display: inline-block;
`;

const NewsPost: NextPage<Props> = ({ data, slug }) => {
  const seoData = useMemo(
    () => ({
      ...data.seo,
      slug: `noticias/${slug}`
    }),
    [data, slug]
  );

  return (
    <PageWrap seoData={seoData}>
      <HeroImage source={data.imageUrl} />
      <PostOuter>
        <PostInner>
          <PostHeader>
            <PostTitle>{data.title}</PostTitle>
          </PostHeader>

          <PostContent dangerouslySetInnerHTML={{ __html: data.content }} />

          {!!data.tags?.length && (
            <PostTags>
              {data.tags.map((tag) => (
                <Fragment key={tag}>
                  <PostTag>#{tag}</PostTag>{" "}
                </Fragment>
              ))}
            </PostTags>
          )}
        </PostInner>
      </PostOuter>
    </PageWrap>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getPostData(params?.slug as string);

  return {
    props: {
      data,
      slug: params?.slug
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts = [] } = await getNewsData();

  const paths = posts.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: false
  };
};

export default NewsPost;
