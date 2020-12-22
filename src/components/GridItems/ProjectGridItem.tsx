import Link from "next/link";
import { useCallback } from "react";

import { Base } from "./Base";

interface Props {
  bottomGutter?: boolean;
  imageUrl: string;
  onClick: (title: string, url: string) => void;
  projectUrl: string;
  slug: string;
  title: string;
}

export const ProjectGridItem: React.FC<Props> = ({
  bottomGutter,
  imageUrl,
  onClick,
  projectUrl,
  slug,
  title
}) => {
  const onGridItemClick = useCallback(
    (e: React.SyntheticEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      onClick(title, projectUrl);
    },
    [onClick, projectUrl, title]
  );

  return (
    <Link href="/proyectos/[slug]" as={`/proyectos/${slug}`} passHref>
      <Base
        bottomGutter={bottomGutter}
        imageUrl={imageUrl}
        title={title}
        onClick={onGridItemClick}
      />
    </Link>
  );
};
