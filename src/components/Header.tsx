import React, { useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import { Icon } from "./Icon";
import { SideMenu } from "./SideMenu";
import { InputForm } from "./InputForm";

type HeaderProps = {
  videoID: string;
  isTesting: boolean;
  colorMode: boolean;
  setColorMode: Dispatch<SetStateAction<boolean>>;
  generateVideoIDFromInput: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  postServer: () => void;
};

export const Header = (props: HeaderProps) => {
  const {
    videoID,
    isTesting,
    colorMode,
    setColorMode,
    generateVideoIDFromInput,
    postServer,
  } = props;

  const [isOpeningMenu, setIsOpeningMenu] = useState(false); // サイドメニューの表示判別

  return (
    <HeaderWrapper colorMode={colorMode}>
      <SideMenu
        isOpeningMenu={isOpeningMenu}
        colorMode={colorMode}
        setIsOpeningMenu={setIsOpeningMenu}
        setColorMode={setColorMode}
      />
      <HeaderLeft>
        <IconSpace>
          <MenuIcon onClick={() => setIsOpeningMenu(true)}>
            <Icon
              iconName="Menu"
              iconColor={colorMode ? "#fff" : "#000"}
              iconSize={32}
              iconWeight={300}
              iconFill={0}
            />
          </MenuIcon>
        </IconSpace>
        <div>{isTesting ? <p>testMode</p> : <p></p>}</div>
      </HeaderLeft>
      <InputForm
        colorMode={colorMode}
        placeholder={"videoID"}
        iconName={"vertical_align_bottom"}
        tooltipContents={"チャットを取得して解析"}
        value={videoID}
        boxMaxWidth={480}
        boxFunc={generateVideoIDFromInput}
        buttonFunc={postServer}
      />
      <HeaderRight></HeaderRight>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header<{ colorMode: boolean }>`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${(props) => (props.colorMode ? "#1f1f1f" : "#fff")};
  box-shadow: ${(props) =>
    props.colorMode ? "none" : "0px 0px 1px 0.2px #ddd"};
`;

const HeaderLeft = styled.div`
  width: 144px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconSpace = styled.div`
  width: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuIcon = styled.button`
  width: 24px;
`;

const HeaderRight = styled.div`
  width: 144px;
`;
