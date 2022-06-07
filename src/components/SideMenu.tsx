import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import { Icon } from "./Icon";

type SideMenuProps = {
  isOpeningMenu: boolean;
  setIsOpeningMenu: Dispatch<SetStateAction<boolean>>;
};

export const SideMenu = (props: SideMenuProps) => {
  const { isOpeningMenu, setIsOpeningMenu } = props;

  const [menuStyleBool, setMenuStyleBool] = useState(false);

  useEffect(() => {
    if (isOpeningMenu) {
      setMenuStyleBool(true);
    } else {
    }
  }, [isOpeningMenu]);

  const invalidateStyleBool = () => {
    setMenuStyleBool(false);
    setTimeout(() => setIsOpeningMenu(false), 300);
  };

  return (
    <MenuWrapper bool={isOpeningMenu}>
      <Cover bool={menuStyleBool} onClick={invalidateStyleBool}></Cover>
      <Menu bool={menuStyleBool}>
        <IconSpace>
          <MenuIcon onClick={invalidateStyleBool}>
            <Icon
              iconName="Menu"
              iconColor="#000"
              iconSize={32}
              iconWeight={300}
            />
          </MenuIcon>
        </IconSpace>
        <NavWrapper>
          <NavList>
            <li>
              <NavElement>
                <NavIcon>
                  <Icon
                    iconName="info"
                    iconColor="#000"
                    iconSize={24}
                    iconWeight={300}
                  />
                </NavIcon>
                使い方
              </NavElement>
            </li>
            <li>
              <NavElement>
                <NavIcon>
                  <Icon
                    iconName="Light_Mode"
                    iconColor="#000"
                    iconSize={24}
                    iconWeight={300}
                  />
                </NavIcon>
                ライトテーマ
              </NavElement>
            </li>
          </NavList>
        </NavWrapper>
      </Menu>
    </MenuWrapper>
  );
};

const MenuWrapper = styled.div<{ bool: boolean }>`
  z-index: 100;

  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: ${(props) => (props.bool ? "block" : "none")};
`;

const Cover = styled.div<{ bool: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: ${(props) =>
    props.bool ? "rgba(1, 1, 1, 0.5)" : "rgba(1, 1, 1, 0)"};

  transition: 0.3s;
`;

const Menu = styled.div<{ bool: boolean }>`
  width: 240px;
  height: 100%;
  position: absolute;
  top: 0;
  left: ${(props) => (props.bool ? "0" : "-240px")};
  background: #fff;
  box-shadow: 0px 0px 1px 0.2px #ddd;

  transition: 0.3s;
`;

const IconSpace = styled.div`
  width: 72px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuIcon = styled.button`
  width: 24px;
`;

const NavWrapper = styled.nav`
  width: 100%;
  margin: 0 auto;
`;

const NavList = styled.ul`
  list-style: none;
`;

const NavElement = styled.button`
  width: 100%;
  padding: 0 24px;
  height: 48px;
  font-size: 16px;
  display: flex;
  align-items: center;

  &:hover {
    background: #f3f3f3;
  }
`;

const NavIcon = styled.div`
  width: 32px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
