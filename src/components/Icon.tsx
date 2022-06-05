import React from "react";
import styled from "styled-components";

export type iconProps = {
  iconName: string;
  iconColor: string;
  iconSize: number;
  iconWeight: number;
};

export const Icon = (props: iconProps) => {
  const { iconName, iconColor, iconSize, iconWeight } = props;

  return (
    <IconStyle
      className="material-symbols-outlined"
      size={iconSize}
      color={iconColor}
      wght={iconWeight}
    >
      {iconName}
    </IconStyle>
  );
};

const IconStyle = styled.span<{ size: number; color: string; wght: number }>`
  font-size: ${(props) => `${props.size}px`};
  color: ${(props) => `${props.color}`};

  font-variation-settings: "FILL" 0, "wght" ${(props) => `${props.wght}`},
    "GRAD" 200, "opsz" 48;
`;
