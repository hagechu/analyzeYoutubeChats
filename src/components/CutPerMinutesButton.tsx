import React from "react";
import styled from "styled-components";

import { Icon } from "./Icon";

export type cutButtonProps = {
  buttonFunc: () => void;
  buttonName: string;
  buttonSize: number;
};

export const CutPerMinutesButton = (props: cutButtonProps) => {
  const { buttonName, buttonSize, buttonFunc } = props;

  return (
    <CutButton onClick={buttonFunc} size={buttonSize}>
      <Icon iconName="content_cut" iconSize={16} />
      <ButtonName>{buttonName}</ButtonName>
    </CutButton>
  );
};

const CutButton = styled.button<{ size: number }>`
  font-size: ${(props) => `${props.size}px`};
  padding: 8px 16px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonName = styled.p`
  width: 40px;
`;
