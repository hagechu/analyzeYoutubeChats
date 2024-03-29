import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import { Icon } from "./Icon";
import { ModalContent0 } from "./modalWindows/ModalContent0";
import { ModalContent1 } from "./modalWindows/ModalContent1";

type SideMenuProps = {
  isOpeningMenu: boolean;
  colorMode: boolean;
  setIsOpeningMenu: Dispatch<SetStateAction<boolean>>;
  setColorMode: Dispatch<SetStateAction<boolean>>;
};

export const SideMenu = (props: SideMenuProps) => {
  const { isOpeningMenu, colorMode, setIsOpeningMenu, setColorMode } = props;

  const [menuStyleBool, setMenuStyleBool] = useState(false);
  const [isOpeningModal, setIsOpeningModal] = useState(false);
  const [menuListBool, setMenuListBool] = useState<Array<boolean>>(
    new Array(2).fill(false)
  );

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

  const openModalMenu = (index: number) => {
    setIsOpeningModal(true);
    const menuListBoolArray = [...menuListBool];
    menuListBoolArray[index] = true;
    setMenuListBool(menuListBoolArray);
  };

  const closeModalMenu = (index: number) => {
    setIsOpeningModal(false);
    const menuListBoolArray = [...menuListBool];
    menuListBoolArray[index] = false;
    setMenuListBool(menuListBoolArray);
  };

  const navList = [
    { name: "使い方", iconName: "info" },
    {
      name: colorMode ? "ダークテーマ" : "ライトテーマ",
      iconName: colorMode ? "Dark_Mode" : "Light_Mode",
    },
  ];

  return (
    <MenuWrapper sideMenuBool={isOpeningMenu}>
      <Cover
        sideMenuBool={menuStyleBool}
        modalBool={isOpeningModal}
        onClick={invalidateStyleBool}
      ></Cover>
      <Menu sideMenuBool={menuStyleBool} colorMode={colorMode}>
        <IconSpace>
          <MenuIcon onClick={invalidateStyleBool}>
            <Icon
              iconName="Menu"
              iconColor={colorMode ? "#fff" : "#000"}
              iconSize={32}
            />
          </MenuIcon>
        </IconSpace>
        <NavWrapper>
          <NavList>
            {navList.map((navElement, index) => (
              <li>
                <NavElement
                  colorMode={colorMode}
                  onClick={() => openModalMenu(index)}
                >
                  <NavIcon>
                    <Icon
                      iconName={navElement.iconName}
                      iconColor={colorMode ? "#fff" : "#000"}
                    />
                  </NavIcon>
                  <p>{navElement.name}</p>
                </NavElement>
              </li>
            ))}
          </NavList>
        </NavWrapper>
      </Menu>
      <ModalList modalBool={isOpeningModal}>
        <ModalContent0
          colorMode={colorMode}
          menuListBool={menuListBool}
          closeModalMenu={closeModalMenu}
        />
        <ModalContent1
          colorMode={colorMode}
          menuListBool={menuListBool}
          closeModalMenu={closeModalMenu}
          setColorMode={setColorMode}
        />
      </ModalList>
    </MenuWrapper>
  );
};

const MenuWrapper = styled.div<{ sideMenuBool: boolean }>`
  z-index: 100;

  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: ${(props) => (props.sideMenuBool ? "block" : "none")};
`;

const Cover = styled.div<{ sideMenuBool: boolean; modalBool: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: ${(props) =>
    props.sideMenuBool ? "rgba(1, 1, 1, 0.5)" : "rgba(1, 1, 1, 0)"};

  transition: background 0.3s;
  z-index: ${(props) => (props.modalBool ? "2" : "0")};
`;

const Menu = styled.div<{ sideMenuBool: boolean; colorMode: boolean }>`
  width: 240px;
  height: 100%;
  position: absolute;
  top: 0;
  left: ${(props) => (props.sideMenuBool ? "0" : "-240px")};
  background: ${(props) => (props.colorMode ? "#111" : "#fff")};
  box-shadow: ${(props) =>
    props.colorMode ? "none" : "0px 0px 1px 0.2px #ddd"};

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

const NavElement = styled.button<{ colorMode: boolean }>`
  width: 100%;
  padding: 0 24px;
  height: 48px;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: ${(props) => (props.colorMode ? "#fff" : "#000")};

  &:hover {
    background: ${(props) => (props.colorMode ? "#222" : "#f3f3f3")};
  }
`;

const NavIcon = styled.div`
  width: 32px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalList = styled.ul<{ modalBool: boolean }>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;

  display: ${(props) => (props.modalBool ? "block" : "none")};
  z-index: ${(props) => (props.modalBool ? "3" : "0")};
`;
