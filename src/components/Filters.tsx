import { Fragment, useCallback } from "react";
import Link from "next/link";
import styled, { css } from "styled-components";

import { media } from "@/theme";
import { vwScale, underlineLinkStyle } from "@/utils";

interface Props {
  activeFilter?: string;
  filters: Array<{ slug: string; title: string }>;
  onFilterClick: (slug: string) => void;
}

const FilterWrap = styled.nav`
  margin-bottom: ${vwScale(54)};

  ${media.mobile`
    margin-bottom: 16px;
    padding: 0 20px;
  `}
`;

const FilterItems = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const FilterItem = styled.li`
  margin: 5px 0;
  display: flex;

  &:not(:last-of-type) {
    &::after {
      content: " / ";
      font-size: ${vwScale(16)};
      display: inline-block;
      margin: 0 ${vwScale(10)};
      color: ${({ theme }) => theme.colors.light};

      ${media.mobile`
        font-size: 10px;
        margin: 0 5px;
      `}
    }
  }
`;

const FilterLink = styled.a<{ active: boolean }>`
  font-size: ${vwScale(18)};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.light};

  ${({ active, theme }) =>
    !active
      ? underlineLinkStyle(theme.colors.dark, theme.colors.light)
      : css`
          text-decoration: underline;
        `}

  ${media.mobile`
    font-size: 10px;
  `}
`;

export const Filters: React.FC<Props> = ({
  activeFilter,
  filters,
  onFilterClick
}) => {
  const onFilterItemClick = useCallback(
    (e: React.SyntheticEvent, slug: string): void => {
      e.preventDefault();
      e.stopPropagation();

      onFilterClick(slug);
    },
    [onFilterClick]
  );

  return (
    <FilterWrap>
      <FilterItems>
        <FilterItem>
          <Link href="?" passHref scroll={false}>
            <FilterLink
              active={activeFilter === ""}
              onClick={(e) => onFilterItemClick(e, "")}
            >
              Todos
            </FilterLink>
          </Link>
        </FilterItem>{" "}
        {filters.map((filter) => (
          <Fragment key={filter.slug}>
            <FilterItem>
              <Link href={`?categoria=${filter.slug}`} passHref scroll={false}>
                <FilterLink
                  active={activeFilter === filter.slug}
                  onClick={(e) => onFilterItemClick(e, filter.slug)}
                >
                  {filter.title}
                </FilterLink>
              </Link>
            </FilterItem>{" "}
          </Fragment>
        ))}
      </FilterItems>
    </FilterWrap>
  );
};
