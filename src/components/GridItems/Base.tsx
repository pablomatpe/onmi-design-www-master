import styled from "styled-components";

import { media } from "@/theme";
import { vwScale } from "@/utils";

export interface BaseProps extends React.HTMLAttributes<HTMLAnchorElement> {
  bottomGutter?: boolean;
  imageUrl: string;
  title: string;
}

const GridItem = styled.a<{ bg: string; bottomGutter?: boolean }>`
  background: url(${({ bg }) => bg}) no-repeat center center / cover;
  width: 50%;
  position: relative;
  overflow: hidden;
  margin-bottom: ${({ bottomGutter }) => (!bottomGutter ? 0 : vwScale(50))};

  &::before {
    content: "";
    display: block;
    padding-bottom: 56%;
    transition: opacity 0.2s ease, transform 0.2s ease;
    will-change: opacity, transform;
    opacity: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
    transform: translateY(25%);
  }

  &:hover {
    &::before {
      opacity: 1;
      transform: translateY(0);
    }
  }

  ${media.mobile`
    width: 100%;
    margin-bottom: 0;

    &::before {
      padding-bottom: 96%;
      opacity: 1;
      transform: initial;
    }
  `}
`;

const ItemContent = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 0 ${vwScale(34)} ${vwScale(34)};
  transform: translateY(50%);
  opacity: 0;
  visibility: hidden;
  transition: transform 0.2s ease, opacity 0.2s ease, visibility 0.2s ease;
  will-change: transform, opacity, visibility;

  ${GridItem}:hover & {
    transform: translateY(0%);
    opacity: 1;
    visibility: visible;
  }

  ${media.mobile`
    transform: initial;
    opacity: 1;
    visibility: visible;
    padding: 0 18px 18px;
  `}
`;

const ItemText = styled.p`
  font-size: ${vwScale(24)};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.light};
  text-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);

  ${media.mobile`
    font-size: 16px;
  `}
`;

export const Base: React.FC<BaseProps> = ({
  bottomGutter,
  imageUrl,
  title,
  ...props
}) => {
  return (
    <GridItem
      {...props}
      bg={imageUrl}
      bottomGutter={bottomGutter}
      title={title}
    >
      <ItemContent>
        <ItemText>{title}</ItemText>
      </ItemContent>
    </GridItem>
  );
};
