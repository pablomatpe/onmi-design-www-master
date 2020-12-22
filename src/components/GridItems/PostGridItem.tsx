import Link from "next/link";

import { Base } from "./Base";

interface Props {
  imageUrl: string;
  slug: string;
  title: string;
}

export const PostGridItem: React.FC<Props> = ({ imageUrl, slug, title }) => (
  <Link href="/noticias/[slug]" as={`/noticias/${slug}`} passHref>
    <Base bottomGutter imageUrl={imageUrl} title={title} />
  </Link>
);
