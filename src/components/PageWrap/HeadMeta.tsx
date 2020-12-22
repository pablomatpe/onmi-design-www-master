import { useMemo } from "react";
import Head from "next/head";

import { SeoData } from "@/api";

export interface HeadMetaProps extends SeoData {
  slug?: string;
}

export const HeadMeta: React.FC<HeadMetaProps> = ({
  children,
  description,
  keywords,
  image,
  siteName,
  siteUrl,
  slug = "",
  title
}) => {
  const pageUrl = useMemo(() => `${siteUrl}/${slug}`, [siteUrl, slug]);

  return (
    <Head key={pageUrl}>
      {title && (
        <>
          <title>{title}</title>
          <meta property="og:title" content={title} />
          <meta name="twitter:image:alt" content={title} />
        </>
      )}

      {keywords && <meta name="keywords" content={keywords} />}

      {siteName && <meta property="og:site_name" content={siteName} />}
      <meta property="og:type" content="website" />

      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
        </>
      )}

      {pageUrl && <meta property="og:url" content={pageUrl} />}
      <meta property="og:locale" content="es_ES" />

      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta property="og:image:width" content="1600" />
          <meta property="og:image:height" content="800" />
        </>
      )}

      <meta name="twitter:card" content="summary_large_image" />

      {siteUrl && <link href={siteUrl} rel="home" />}

      {pageUrl && <link href={pageUrl} rel="canonical" />}

      {children}
    </Head>
  );
};
