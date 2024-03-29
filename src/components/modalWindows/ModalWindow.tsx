import React, { ReactNode } from "react";
import styled from "styled-components";

import { Icon } from "../Icon";

type ModalWindowProps = {
  menuNumber: number;
  iconName: string;
  modalContent: string;
  colorMode: boolean;
  menuListBool: boolean[];
  closeModalMenu: (index: number) => void;
  children: ReactNode;
};

export const ModalWindow = (props: ModalWindowProps) => {
  const {
    menuNumber,
    iconName,
    modalContent,
    colorMode,
    menuListBool,
    closeModalMenu,
    children,
  } = props;

  return (
    <Modal>
      <InnerModal bool={menuListBool[menuNumber]} colorMode={colorMode}>
        <ModalHeader colorMode={colorMode}>
          <Icon
            iconName={iconName}
            iconColor={colorMode ? "#fff" : "#333"}
            iconSize={24}
            iconWeight={300}
            iconFill={1}
          />
          <ModalTitle>{modalContent}</ModalTitle>
        </ModalHeader>
        <ModalContent>{children}</ModalContent>
        <ModalFooter>
          <CloseButton onClick={() => closeModalMenu(menuNumber)}>
            閉じる
          </CloseButton>
        </ModalFooter>
      </InnerModal>
    </Modal>
  );
};

const Modal = styled.li`
  width: 100%;
  height: 100%;
`;

const InnerModal = styled.div<{ bool: boolean; colorMode: boolean }>`
  width: 50%;
  height: 50%;

  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  border-radius: 8px;
  box-shadow: ${(props) =>
    props.colorMode ? "none" : "0 0 40px 3em rgba(100, 100, 100, 0.5)"};
  display: ${(props) => (props.bool ? "block" : "none")};

  background: ${(props) => (props.colorMode ? "#111" : "#fff")};
`;

const ModalHeader = styled.header<{ colorMode: boolean }>`
  height: 64px;
  padding: 0 32px;
  border-bottom: solid 0.5px #ccc;
  border-radius: 8px 9px 0px 0px;
  box-shadow: ${(props) => (props.colorMode ? "none" : "0px 1px 0.3px #ddd")};

  display: flex;
  align-items: center;
`;

const ModalTitle = styled.h3`
  font-size: 20px;
  font-weight: normal;
  margin-left: 16px;
`;

const ModalContent = styled.div`
  padding: 16px 32px;
`;

const ModalFooter = styled.footer`
  width: 100%;
  height: 48px;
  padding: 0 32px;
  border-top: solid 1px #ccc;

  position: fixed;
  left: 0;
  bottom: 0;

  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

const CloseButton = styled.button`
  color: #1e90ff;
`;
