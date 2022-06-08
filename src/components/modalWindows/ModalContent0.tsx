import React from "react";

import { ModalWindow } from "./ModalWindow";

type ModalContentProps = {
  colorMode: boolean;
  menuListBool: boolean[];
  closeModalMenu: (index: number) => void;
};

export const ModalContent0 = (props: ModalContentProps) => {
  const { colorMode, menuListBool, closeModalMenu } = props;

  return (
    <ModalWindow
      menuNumber={0}
      iconName="info"
      modalContent="使い方"
      colorMode={colorMode}
      menuListBool={menuListBool}
      closeModalMenu={closeModalMenu}
    >
      <p>
        YouTubeのライブのアーカイブから、チャットの流量を分析するツールです。
      </p>
      <p>
        YouTubeのURL、またはURL末尾の"v="以降の11桁の文字列を画面上部のテキストボックスに入力した後に、横にあるボタンを押すと分析が始まります。
      </p>
      <p>
        動画の長さによって分析にかかる時間は変わります。（１２時間ほどの長い動画では１０分ほどかかる場合もあります。）
      </p>
      <p>
        分析が終わると、流量がグラフに表示されグラフの中の指定した時間から動画を再生することができます。
      </p>
      <p>
        画面左下のテキストボックスでは、入力した単語に限定した流量を調べることができます。
      </p>
      <p>
        また、画面右下の１分、５分、１０分のボタンを押すことで、グラフをそれぞれの時間に対応した流量の表示に変更できます。
      </p>
    </ModalWindow>
  );
};
