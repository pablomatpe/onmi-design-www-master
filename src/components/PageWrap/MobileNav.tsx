import styled, { createGlobalStyle } from "styled-components";
import Link from "next/link";

import { CloseIcon } from "@/components/CloseIcon";
import { Logo } from "@/components/Logo";
import { MENU_ITEMS } from "@/constants";

import { HeaderWrap, NavMobileButton } from "./Header";

interface Props {
  onCloseClick: () => void;
}

const GlobalStyles = createGlobalStyle`
  html, body {
    overflow: hidden;
  }
`;

const NavOuter = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.dark};
  z-index: 4;
  padding: 20px;
`;

const NavHeader = styled(HeaderWrap)`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
`;

const NavHeaderCloseButton = styled(NavMobileButton)`
  background: none;
  width: 27px;
  height: 25px;
`;

const NavHeaderCloseIcon = styled(CloseIcon).attrs(() => ({ strokeWidth: 2 }))`
  display: inline-block;
  width: 21px;
  height: 21px;
`;

const Nav = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NavItems = styled.ul`
  display: block;
  text-align: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 18px;
  }
`;

const NavLink = styled.a`
  font-size: 25px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.light};
  text-decoration: none;
`;

export const MobileNav: React.FC<Props> = ({ onCloseClick }) => (
  <>
    <GlobalStyles />
    <NavOuter>
      <NavHeader>
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>

        <NavHeaderCloseButton onClick={onCloseClick}>
          <NavHeaderCloseIcon />
        </NavHeaderCloseButton>
      </NavHeader>

      <Nav>
        <NavItems>
          {MENU_ITEMS.map((item) => (
            <NavItem key={item.path}>
              <Link href={item.path} passHref>
                <NavLink
                  title={item.label}
                  onClick={() => {
                    if (item.label === "Contacto") {
                      onCloseClick();
                    }
                  }}
                >
                  {item.label}
                </NavLink>
              </Link>
            </NavItem>
          ))}
        </NavItems>
      </Nav>
    </NavOuter>
  </>
);
