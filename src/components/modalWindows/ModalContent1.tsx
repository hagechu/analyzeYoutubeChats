import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import { DropdownMenu } from "../DropdownMenu";
import { Icon } from "../Icon";
import { ModalWindow } from "./ModalWindow";

type ModalContentProps = {
  colorMode: boolean;
  menuListBool: boolean[];
  closeModalMenu: (index: number) => void;
  setColorMode: Dispatch<SetStateAction<boolean>>;
};

export const ModalContent1 = (props: ModalContentProps) => {
  const { colorMode, menuListBool, closeModalMenu, setColorMode } = props;

  const selectElements = [
    { name: "ライトテーマ", setColorBool: false, iconName: "Light_Mode" },
    { name: "ダークテーマ", setColorBool: true, iconName: "Dark_Mode" },
  ];

  return (
    <ModalWindow
      menuNumber={1}
      iconName="info"
      modalContent="使い方"
      colorMode={colorMode}
      menuListBool={menuListBool}
      closeModalMenu={closeModalMenu}
    >
      <DropdownMenuTitle>カラーテーマを選択：</DropdownMenuTitle>
      <DropdownMenu
        colorMode={colorMode}
        iconName={colorMode ? "Dark_Mode" : "Light_Mode"}
        dropdownName={colorMode ? "ダークテーマ" : "ライトテーマ"}
      >
        {selectElements.map((element) => (
          <SelectElement>
            <SelectButton
              colorMode={colorMode}
              onClick={() => setColorMode(element.setColorBool)}
            >
              <Icon
                iconName={element.iconName}
                iconColor={colorMode ? "#fff" : "#000"}
                iconSize={24}
                iconWeight={300}
                iconFill={0}
              />
              {element.name}
              <AdjustSpace></AdjustSpace>
            </SelectButton>
          </SelectElement>
        ))}
      </DropdownMenu>
    </ModalWindow>
  );
};

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

const SelectButton = styled.button<{ colorMode: boolean }>`
  color: ${(props) => (props.colorMode ? "#fff" : "#000")};
  width: 100%;
  height: 100%;
  padding: 0 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: ${(props) => (props.colorMode ? "#333" : "#f3f3f3")};
  }
`;

const AdjustSpace = styled.div`
  width: 24px;
`;
