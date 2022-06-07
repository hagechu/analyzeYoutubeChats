import React, { ReactNode, useState } from "react";
import styled from "styled-components";

import { Icon } from "./Icon";

type DropdownProps = {
  colorMode: boolean;
  iconName: string;
  dropdownName: string;
  children: ReactNode;
};

export const DropdownMenu = (props: DropdownProps) => {
  const { colorMode, iconName, dropdownName, children } = props;

  const [isOpeningMenu, setIsOpeningMenu] = useState(false);

  return (
    <MenuWrapper>
      <DropdownButton
        onClick={() => setIsOpeningMenu(!isOpeningMenu)}
        colorMode={colorMode}
      >
        <Icon
          iconName={iconName}
          iconColor={colorMode ? "#fff" : "#000"}
          iconSize={24}
          iconWeight={300}
          iconFill={0}
        />
        {dropdownName}
        <Icon
          iconName="Arrow_drop_down"
          iconColor={colorMode ? "#fff" : "#000"}
          iconSize={24}
          iconWeight={300}
          iconFill={0}
        />
      </DropdownButton>
      <MenuList bool={isOpeningMenu} onClick={() => setIsOpeningMenu(false)}>
        {children}
      </MenuList>
    </MenuWrapper>
  );
};

const MenuWrapper = styled.div`
  width: 240px;
`;

const DropdownButton = styled.button<{ colorMode: boolean }>`
  color: ${(props) => (props.colorMode ? "#fff" : "#000")};
  width: 100%;
  height: 48px;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border: solid 1px #ccc;
  border-radius: 4px;
`;

const MenuList = styled.ul<{ bool: boolean }>`
  width: 100%;
  display: ${(props) => (props.bool ? "flex" : "none")};
  flex-direction: column;

  max-height: ${(props) => (props.bool ? "800px" : "0")};

  list-style: none;
`;
