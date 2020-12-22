import { useCallback, useEffect, useMemo, useState } from "react";
import { NextPage, GetStaticProps } from "next";
import styled from "styled-components";

import { Filters } from "@/components/Filters";
import { PageHero } from "@/components/PageHero";
import { PageWrap } from "@/components/PageWrap";
import { ProjectGridItem } from "@/components/GridItems";
import { ProjectModal } from "@/components/ProjectModal";
import { media } from "@/theme";
import { getProjectsData, ProjectsData } from "@/api";
import { vwScale } from "@/utils";

interface Props {
  data: ProjectsData;
}

const ProjectsSection = styled.section`
  padding: 0 ${vwScale(50)};

  ${media.mobile`
    padding: 0;
  `}
`;

const ProjectsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const getFilterFromUrl = (): string => {
  const params = new URLSearchParams(window.location.search);
  return params.get("categoria") ?? "";
};

const Projects: NextPage<Props> = ({ data }) => {
  const [activeFilter, setActiveFilter] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");
  const [iframeTitle, setIframeTitle] = useState("");

  const seoData = useMemo(
    () => ({
      ...data.seo,
      slug: "proyectos"
    }),
    [data]
  );

  const onFilterItemClick = useCallback((slug: string): void => {
    setActiveFilter(slug);
  }, []);

  const onGridItemClick = useCallback((title: string, url: string): void => {
    setIsModalVisible(true);
    setIframeTitle(title);
    setIframeUrl(url);
  }, []);

  useEffect(() => {
    setActiveFilter(getFilterFromUrl());
  }, []);

  return (
    <>
      <PageWrap seoData={seoData}>
        <PageHero title={data.intro.title} content={data.intro.text} />

        <ProjectsSection>
          <Filters
            activeFilter={activeFilter}
            filters={data.projectCategories}
            onFilterClick={onFilterItemClick}
          />

          <ProjectsGrid>
            {data.projects.map((project) => {
              if (activeFilter && !project.categories.includes(activeFilter)) {
                return null;
              }

              return (
                <ProjectGridItem
                  key={project.slug}
                  bottomGutter
                  imageUrl={project.imageUrl}
                  onClick={onGridItemClick}
                  projectUrl={project.behanceUrl}
                  slug={project.slug}
                  title={project.title}
                />
              );
            })}
          </ProjectsGrid>
        </ProjectsSection>
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
  const data = await getProjectsData();

  return {
    props: {
      data
    }
  };
};

export default Projects;
