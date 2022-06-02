import React from "react";
import styled from "styled-components";

export type iconProps = {
  iconName: string;
  iconSize: number;
};

export const Icon = (props: iconProps) => {
  const { iconName, iconSize } = props;

  return (
    <IconStyle className="material-symbols-outlined" size={iconSize}>
      {iconName}
    </IconStyle>
  );
};

const IconStyle = styled.span<{ size: number }>`
  font-size: ${(props) => `${props.size}px`};
`;
