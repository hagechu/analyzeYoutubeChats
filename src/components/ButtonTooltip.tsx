import React, { useState, ReactNode } from "react";
import styled from "styled-components";

type ButtonTooltipProps = {
  tooltipContent: string;
  children: ReactNode;
};

export const ButtonTooltip = (props: ButtonTooltipProps) => {
  const { tooltipContent, children } = props;

  const [isShowingTooltip, setIsShowingTooltip] = useState(false);

  return (
    <TooltipContainer>
      <Element
        onMouseEnter={() => setIsShowingTooltip(true)}
        onMouseLeave={() => setIsShowingTooltip(false)}
      >
        {children}
      </Element>
      <TooltipContent bool={isShowingTooltip}>
        <p>{tooltipContent}</p>
      </TooltipContent>
    </TooltipContainer>
  );
};

const TooltipContainer = styled.div`
  position: relative;

  width: 100%;
  max-width: 64px;
`;

const Element = styled.div`
  width: 100%;
`;

const TooltipContent = styled.div<{ bool: boolean }>`
  font-size: 12px;
  color: #fff;
  padding: 8px;
  background: rgba(4, 4, 4, 0.9);
  border-radius: 2px;
  white-space: nowrap;

  position: absolute;
  top: 60px;
  left: 50%;

  transform: translate(-50%, 0);

  display: flex;
  align-items: center;

  display: ${(props) => (props.bool ? "inline-block" : "none")};
`;
