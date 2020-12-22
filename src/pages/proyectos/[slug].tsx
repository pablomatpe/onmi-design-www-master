import { useCallback, useMemo } from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import Router from "next/router";

import { PageWrap } from "@/components/PageWrap";
import { ProjectModal } from "@/components/ProjectModal";
import { getProjectsData, getProjectData, ProjectPageData } from "@/api";

interface Props {
  data: ProjectPageData;
  slug: string;
}

const Project: NextPage<Props> = ({ data, slug }) => {
  const onModalClose = useCallback(() => {
    Router.push("/proyectos");
  }, []);

  const seoData = useMemo(
    () => ({
      ...data.seo,
      slug: `proyectos/${slug}`
    }),
    [data, slug]
  );

  return (
    <PageWrap seoData={seoData} showFooter={false} showHeader={false}>
      <ProjectModal
        isVisible
        onCloseClick={onModalClose}
        src={data.behanceUrl}
        title={data.title}
      />
    </PageWrap>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getProjectData(params?.slug as string);

  return {
    props: {
      data,
      slug: params?.slug
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { projects = [] } = await getProjectsData();

  const paths = projects.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: false
  };
};

export default Project;
