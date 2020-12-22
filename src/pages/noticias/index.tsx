import { useCallback, useEffect, useMemo, useState } from "react";
import { NextPage, GetStaticProps } from "next";
import styled from "styled-components";

import { Filters } from "@/components/Filters";
import { PageHero } from "@/components/PageHero";
import { PageWrap } from "@/components/PageWrap";
import { PostGridItem } from "@/components/GridItems";
import { media } from "@/theme";
import { getNewsData, NewsData } from "@/api";
import { vwScale } from "@/utils";

interface Props {
  data: NewsData;
}

const PostsSection = styled.section`
  padding: 0 ${vwScale(50)};

  ${media.mobile`
    padding: 0;
  `}
`;

const PostsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const getFilterFromUrl = (): string => {
  const params = new URLSearchParams(window.location.search);
  return params.get("categoria") ?? "";
};

const News: NextPage<Props> = ({ data }) => {
  const [activeFilter, setActiveFilter] = useState("");

  const seoData = useMemo(
    () => ({
      ...data.seo,
      slug: "noticias"
    }),
    [data]
  );

  const onFilterItemClick = useCallback((slug: string): void => {
    setActiveFilter(slug);
  }, []);

  useEffect(() => {
    setActiveFilter(getFilterFromUrl());
  }, []);

  return (
    <PageWrap seoData={seoData}>
      <PageHero title={data.intro.title} content={data.intro.text} />

      <PostsSection>
        <Filters
          activeFilter={activeFilter}
          filters={data.postCategories}
          onFilterClick={onFilterItemClick}
        />

        <PostsGrid>
          {data.posts.map((project) => {
            if (activeFilter && !project.categories.includes(activeFilter)) {
              return null;
            }

            return (
              <PostGridItem
                key={project.slug}
                imageUrl={project.imageUrl}
                slug={project.slug}
                title={project.title}
              />
            );
          })}
        </PostsGrid>
      </PostsSection>
    </PageWrap>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await getNewsData();

  return {
    props: {
      data
    }
  };
};

export default News;
