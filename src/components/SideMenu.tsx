import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import { Icon } from "./Icon";
import { ModalWindow } from "./ModalWindow";
import { DropdownMenu } from "./DropdownMenu";

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

  return (
    <MenuWrapper sideMenuBool={isOpeningMenu}>
      <Cover
        sideMenuBool={menuStyleBool}
        modalBool={isOpeningModal}
        onClick={invalidateStyleBool}
      ></Cover>
      <Menu sideMenuBool={menuStyleBool}>
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
              <NavElement onClick={() => openModalMenu(0)}>
                <NavIcon>
                  <Icon
                    iconName="info"
                    iconColor="#000"
                    iconSize={24}
                    iconWeight={300}
                  />
                </NavIcon>
                <p>使い方</p>
              </NavElement>
            </li>
            <li>
              <NavElement onClick={() => openModalMenu(1)}>
                <NavIcon>
                  <Icon
                    iconName={colorMode ? "Dark_Mode" : "Light_Mode"}
                    iconColor="#000"
                    iconSize={24}
                    iconWeight={300}
                  />
                </NavIcon>
                <p>{colorMode ? "ダークテーマ" : "ライトテーマ"}</p>
              </NavElement>
            </li>
          </NavList>
        </NavWrapper>
      </Menu>
      <ModalList modalBool={isOpeningModal}>
        <ModalWindow
          menuNumber={0}
          iconName="info"
          modalContent="使い方"
          menuListBool={menuListBool}
          closeModalMenu={closeModalMenu}
        >
          <p>
            YouTubeのライブのアーカイブから、チャットの流量を分析するツールです。
            YouTubeのURL、またはURL末尾の"v="以降の11桁の文字列を画面上部のテキストボックスに入力した後に、横にあるボタンを押すと分析が始まります。
            動画の長さによって分析にかかる時間は変わります。（１２時間ほどの長い動画では１０分ほどかかる場合もあります。）
            分析が終わると、流量がグラフに表示されグラフの中の指定した時間から動画を再生することができます。
            画面左下のテキストボックスでは、入力した単語に限定した流量を調べることができます。
            また、画面右下の１分、５分、１０分のボタンを押すことで、グラフをそれぞれの時間に対応した流量の表示に変更できます。
          </p>
        </ModalWindow>
        <ModalWindow
          menuNumber={1}
          iconName="Brightness_4"
          modalContent="カラーテーマ"
          menuListBool={menuListBool}
          closeModalMenu={closeModalMenu}
        >
          <DropdownMenuTitle>カラーテーマを選択：</DropdownMenuTitle>
          <DropdownMenu
            iconName={colorMode ? "Dark_Mode" : "Light_Mode"}
            dropdownName={colorMode ? "ダークテーマ" : "ライトテーマ"}
          >
            <SelectElement>
              <SelectButton onClick={() => setColorMode(false)}>
                <Icon
                  iconName="Light_Mode"
                  iconColor="#000"
                  iconSize={24}
                  iconWeight={300}
                />
                ライトテーマ
                <AdjustSpace></AdjustSpace>
              </SelectButton>
            </SelectElement>
            <SelectElement>
              <SelectButton onClick={() => setColorMode(true)}>
                <Icon
                  iconName="Dark_Mode"
                  iconColor="#000"
                  iconSize={24}
                  iconWeight={300}
                />
                ダークテーマ
                <AdjustSpace></AdjustSpace>
              </SelectButton>
            </SelectElement>
          </DropdownMenu>
        </ModalWindow>
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

const Menu = styled.div<{ sideMenuBool: boolean }>`
  width: 240px;
  height: 100%;
  position: absolute;
  top: 0;
  left: ${(props) => (props.sideMenuBool ? "0" : "-240px")};
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

const ModalList = styled.ul<{ modalBool: boolean }>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;

  display: ${(props) => (props.modalBool ? "block" : "none")};
  z-index: ${(props) => (props.modalBool ? "3" : "0")};
`;

const DropdownMenuTitle = styled.h4`
  font-weight: normal;
  margin-bottom: 12px;
`;

const SelectElement = styled.li`
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;

  border: solid 1px #ccc;
`;

const SelectButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 0 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: #f3f3f3;
  }
`;

const AdjustSpace = styled.div`
  width: 24px;
`;
