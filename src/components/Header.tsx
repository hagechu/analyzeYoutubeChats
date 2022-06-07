import React, { useState } from "react";
import styled from "styled-components";

import { Icon } from "./Icon";
import { SideMenu } from "./SideMenu";
import { InputForm } from "./InputForm";

type HeaderProps = {
  videoID: string;
  isTesting: boolean;
  generateVideoIDFromInput: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  postServer: () => void;
};

export const Header = (props: HeaderProps) => {
  const { videoID, isTesting, generateVideoIDFromInput, postServer } = props;

  const [isOpeningMenu, setIsOpeningMenu] = useState(false); // サイドメニューの表示判別

  return (
    <HeaderWrapper>
      <SideMenu
        isOpeningMenu={isOpeningMenu}
        setIsOpeningMenu={setIsOpeningMenu}
      />
      <HeaderLeft>
        <IconSpace>
          <MenuIcon onClick={() => setIsOpeningMenu(true)}>
            <Icon
              iconName="Menu"
              iconColor="#000"
              iconSize={32}
              iconWeight={300}
            />
          </MenuIcon>
        </IconSpace>
        <div>{isTesting ? <p>testMode</p> : <p></p>}</div>
      </HeaderLeft>
      <InputForm
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

const HeaderWrapper = styled.header`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: #fff;
  box-shadow: 0px 0px 1px 0.2px #ddd;
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
