import React from "react";
import styled from "styled-components";

type iconProps = {
  iconName: string;
  iconColor: string;
  iconSize: number;
  iconWeight: number;
  iconFill: number;
};

export const Icon = (props: iconProps) => {
  const { iconName, iconColor, iconSize, iconWeight, iconFill } = props;

  return (
    <IconStyle
      className="material-symbols-outlined"
      size={iconSize}
      color={iconColor}
      wght={iconWeight}
      fill={iconFill}
    >
      {iconName}
    </IconStyle>
  );
};

const IconStyle = styled.span<{
  size: number;
  color: string;
  wght: number;
  fill: number;
}>`
  font-size: ${(props) => `${props.size}px`};
  color: ${(props) => `${props.color}`};

  font-variation-settings: "FILL" ${(props) => `${props.fill}`},
    "wght" ${(props) => `${props.wght}`}, "GRAD" 200, "opsz" 48;
`;
