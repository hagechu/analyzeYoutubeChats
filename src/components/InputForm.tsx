import React from "react";
import styled from "styled-components";

import { Icon } from "./Icon";
import { ButtonTooltip } from "./ButtonTooltip";

type InputWrapperProps = {
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
        placeholder={placeholder}
        value={value}
        onChange={boxFunc}
        size={boxMaxWidth}
      />
      <ButtonTooltip tooltipContent={tooltipContents}>
        <Button onClick={buttonFunc}>
          <Icon
            iconName={iconName}
            iconColor="#666"
            iconSize={24}
            iconWeight={200}
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

const InputBox = styled.input<{ size: number }>`
  font-size: 16px;
  width: 100%;
  max-width: ${(props) => `${props.size}px`};
  line-height: 24px;
  padding: 8px 16px;
  border: solid 1px #ddd;
  border-radius: 2px 0 0 2px;
  box-shadow: 0px 0px 1px 0.2px #ddd inset;
`;

const Button = styled.button`
  font-size: 16px;
  width: 100%;
  max-width: 64px;
  line-height: 24px;
  padding: 8px 0;
  border: solid 1px #ddd;
  background-color: #eee;
  border-radius: 0 2px 2px 0;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  &:hover {
    background: #e8e8e8;
    box-shadow: 0px 0px 1px 0.2px #ddd;
  }
`;
