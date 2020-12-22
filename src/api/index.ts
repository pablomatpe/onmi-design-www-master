import WPAPI from "wpapi";

const apiUrl = process.env.NEXT_PUBLIC_ONMI_API_URL as string;

const wp = new WPAPI({ endpoint: apiUrl });
wp.getHome = wp.registerRoute("pages/v1", "/home");
wp.getServices = wp.registerRoute("pages/v1", "/services");
wp.getProjects = wp.registerRoute("pages/v1", "/projects");
wp.getNews = wp.registerRoute("pages/v1", "/news");
wp.getProject = wp.registerRoute("posts/v1", "/project/(?P<projectSlug>\\S+)");
wp.getPost = wp.registerRoute("posts/v1", "/post/(?P<postSlug>\\S+)");

interface BaseData {
  slug: string;
  title: string;
  imageUrl: string;
  categories: string[];
}

export interface PostData extends BaseData {
  content: string;
  tags: string[];
}

export interface ProjectData extends BaseData {
  behanceUrl: string;
}

export interface SeoData {
  title: string;
  description: string;
  image: string;
  keywords: string;
  siteName: string;
  siteUrl: string;
}

export interface FooterData {
  title: string;
  subtitle?: string;
  socialLinks: Array<{ text: string; url: string }>;
  email: string;
  phone: string;
  address: string;
  addressLink: string;
  copyright: string;
}

export interface ScriptsData {
  head: string;
  body: string;
}

export interface HomeData {
  intro: {
    image: string;
    title: string;
    cite: string;
  };
  projects: {
    title: string;
    items: ProjectData[];
    linkText: string;
  };
  about: {
    title: string;
    text: string;
    scrollingText: string;
  };
  seo: SeoData;
}

export const getHomeData = (): Promise<HomeData> =>
  wp.getHome().then(({ data = {} }) => data);

export interface ServicesData {
  hero: {
    image: string;
    title: string;
  };
  services: Array<{
    name: string;
    title: string;
    description: string;
    items: string[];
  }>;
  seo: SeoData;
}

export const getServicesData = (): Promise<ServicesData> =>
  wp.getServices().then(({ data = {} }) => data);

export interface ProjectsData {
  intro: {
    title: string;
    text: string;
  };
  projectCategories: Array<{
    title: string;
    slug: string;
  }>;
  projects: ProjectData[];
  seo: SeoData;
}

export const getProjectsData = (): Promise<ProjectsData> =>
  wp.getProjects().then(({ data = {} }) => data);

export interface NewsData {
  intro: {
    title: string;
    text: string;
  };
  postCategories: Array<{
    title: string;
    slug: string;
  }>;
  posts: PostData[];
  seo: SeoData;
}

export const getNewsData = (): Promise<NewsData> =>
  wp.getNews().then(({ data = {} }) => data);

export interface ProjectPageData extends ProjectData {
  seo: SeoData;
}

export const getProjectData = (slug: string): Promise<ProjectPageData> => {
  return wp
    .getProject()
    .projectSlug(slug)
    .get()
    .then(({ data = {} }) => data);
};

export interface PostPageData extends PostData {
  seo: SeoData;
}

export const getPostData = (slug: string): Promise<PostPageData> => {
  return wp
    .getPost()
    .postSlug(slug)
    .get()
    .then(({ data = {} }) => data);
};
