import React from "react";
import styled from "styled-components";

import { Icon } from "./Icon";
import { ButtonTooltip } from "./ButtonTooltip";

type InputWrapperProps = {
  colorMode: boolean;
  placeholder: string;
  value: string;
  iconName: string;
  tooltipContents: string;
  boxMaxWidth: number;
  boxFunc: (event: React.ChangeEvent<HTMLInputElement>) => void;
  buttonFunc: () => void;
};

export const InputForm = (props: InputWrapperProps) => {
  const {
    colorMode,
    placeholder,
    value,
    iconName,
    tooltipContents,
    boxMaxWidth,
    boxFunc,
    buttonFunc,
  } = props;

  return (
    <Form>
      <InputBox
        colorMode={colorMode}
        placeholder={placeholder}
        value={value}
        onChange={boxFunc}
        size={boxMaxWidth}
      />
      <ButtonTooltip tooltipContent={tooltipContents}>
        <Button onClick={buttonFunc} colorMode={colorMode}>
          <Icon
            iconName={iconName}
            iconColor={colorMode ? "#ddd" : "#666"}
            iconSize={24}
            iconWeight={200}
            iconFill={0}
          />
        </Button>
      </ButtonTooltip>
    </Form>
  );
};

const Form = styled.div`
  display: flex;
  justify-content: center;
`;

const InputBox = styled.input<{ size: number; colorMode: boolean }>`
  font-size: 16px;
  width: 100%;
  max-width: ${(props) => `${props.size}px`};
  line-height: 24px;
  padding: 8px 16px;
  border: ${(props) => (props.colorMode ? "solid 1px #444" : "solid 1px #ddd")};
  border-radius: 2px 0 0 2px;
  color: ${(props) => (props.colorMode ? "#fff" : "#000")};
  background-color: ${(props) => (props.colorMode ? "#111" : "#fff")};
  box-shadow: ${(props) =>
    props.colorMode ? "none" : "0px 0px 1px 0.2px #ddd inset"};
`;

const Button = styled.button<{ colorMode: boolean }>`
  font-size: 16px;
  width: 100%;
  max-width: 64px;
  line-height: 24px;
  padding: 8px 0;
  border: ${(props) => (props.colorMode ? "solid 1px #333" : "solid 1px #ddd")};
  background-color: ${(props) => (props.colorMode ? "#333" : "#eee")};
  border-radius: 0 2px 2px 0;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  &:hover {
    background: ${(props) => (props.colorMode ? "#343434" : "#e8e8e8")};
    box-shadow: ${(props) =>
      props.colorMode ? "0px 0px 1px 0.2px #444" : "0px 0px 1px 0.2px #ddd"};
  }
`;
