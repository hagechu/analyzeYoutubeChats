import React from "react";
import styled from "styled-components";

type LoadingProps = {
  colorMode: boolean;
  isLoading: boolean;
};

export const Loading = (props: LoadingProps) => {
  const { colorMode, isLoading } = props;

  return (
    <LoadingWrapper isLoading={isLoading}>
      <Cover></Cover>
      <LoadingModal colorMode={colorMode}>
        <LoadingModalInner>分析中...</LoadingModalInner>
      </LoadingModal>
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div<{ isLoading: boolean }>`
  z-index: 20;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: ${(props) => (props.isLoading ? "block" : "none")};
`;

const Cover = styled.div`
  width: 100%;
  height: 100%;

  background: rgba(1, 1, 1, 0.5);
`;

const LoadingModal = styled.div<{ colorMode: boolean }>`
  width: 10%;
  height: 10%;

  position: fixed;
  top: 20%;
  left: 50%;

  transform: translate(-50%, -50%);

  border-radius: 8px;

  background: ${(props) => (props.colorMode ? "#222" : "#fff")};
`;

const LoadingModalInner = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;
