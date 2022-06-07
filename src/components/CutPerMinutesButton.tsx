import React from "react";
import styled from "styled-components";

import { Icon } from "./Icon";
import { ButtonTooltip } from "./ButtonTooltip";

export type cutButtonProps = {
  buttonFunc: () => void;
  buttonName: string;
  buttonSize: number;
};

export const CutPerMinutesButton = (props: cutButtonProps) => {
  const { buttonName, buttonSize, buttonFunc } = props;

  return (
    <ButtonTooltip tooltipContent={`${buttonName}おきのデータ`}>
      <CutButton onClick={buttonFunc} size={buttonSize}>
        <Icon
          iconName="content_cut"
          iconColor="#000"
          iconSize={16}
          iconWeight={400}
        />
        <ButtonName>{buttonName}</ButtonName>
      </CutButton>
    </ButtonTooltip>
  );
};

const CutButton = styled.button<{ size: number }>`
  font-size: ${(props) => `${props.size}px`};
  height: 32px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonName = styled.p`
  margin-left: 8px;
`;
