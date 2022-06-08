import React from "react";
import styled from "styled-components";

import { Icon } from "./Icon";
import { ButtonTooltip } from "./ButtonTooltip";

export type cutButtonProps = {
  colorMode: boolean;
  buttonFunc: () => void;
  buttonName: string;
  buttonSize: number;
};

export const CutPerMinutesButton = (props: cutButtonProps) => {
  const { colorMode, buttonName, buttonSize, buttonFunc } = props;

  return (
    <ButtonTooltip tooltipContent={`${buttonName}おきのデータ`}>
      <CutButton onClick={buttonFunc} size={buttonSize} colorMode={colorMode}>
        <Icon
          iconName="content_cut"
          iconColor={colorMode ? "#fff" : "#000"}
          iconSize={16}
        />
        <ButtonName>{buttonName}</ButtonName>
      </CutButton>
    </ButtonTooltip>
  );
};

const CutButton = styled.button<{ size: number; colorMode: boolean }>`
  color: ${(props) => (props.colorMode ? "#fff" : "#000")};
  font-size: ${(props) => `${props.size}px`};
  height: 32px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonName = styled.p`
  margin-left: 8px;
`;
