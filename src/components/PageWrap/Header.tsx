import Link from "next/link";
import styled from "styled-components";

import { Logo } from "@/components/Logo";
import { media } from "@/theme";
import { vwScale, underlineLinkStyle } from "@/utils";
import { MENU_ITEMS } from "@/constants";

interface Props {
  onMobileMenuClick: () => void;
}

export const HeaderWrap = styled.header`
  height: ${vwScale(87)};
  background: ${({ theme }) => theme.colors.dark};
  display: flex;
  align-items: center;
  padding: 0 ${vwScale(90)};

  ${media.tablet`
    padding: 0 40px;
  `}

  ${media.mobile`
    padding: 0 24px;
    height: 84px;
  `}
`;

const Nav = styled.nav`
  margin-left: auto;

  ${media.mobile`
    display: none;
  `}
`;

const NavInner = styled.ul`
  display: flex;
  align-items: baseline;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  &:not(:last-child) {
    &::after {
      content: "/";
      color: ${({ theme }) => theme.colors.light};
      font-family: ${({ theme }) => theme.fonts.body};
      font-size: ${vwScale(16)};
      font-weight: ${({ theme }) => theme.fontWeights.normal};
      margin: 0 ${vwScale(8)};
    }
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.light};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${vwScale(16)};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  ${({ theme }) => underlineLinkStyle(theme.colors.dark, theme.colors.light)};
`;

export const NavMobileButton = styled.button`
  display: none;
  appearance: none;
  border: none;
  width: 27px;
  height: 24px;
  margin-left: auto;
  padding: 0;
  background: url("/icons/menu.svg") no-repeat center center / contain;
  cursor: pointer;
  text-align: center;

  ${media.mobile`
    display: block;
  `}
`;

export const Header: React.FC<Props> = ({ onMobileMenuClick }) => (
  <HeaderWrap>
    <Link href="/">
      <a>
        <Logo />
      </a>
    </Link>

    <Nav>
      <NavInner>
        {MENU_ITEMS.map((item) => {
          return (
            <NavItem key={item.path}>
              <Link href={item.path} passHref>
                <NavLink title={item.label}>{item.label}</NavLink>
              </Link>
            </NavItem>
          );
        })}
      </NavInner>
    </Nav>

    <NavMobileButton onClick={onMobileMenuClick} />
  </HeaderWrap>
);
