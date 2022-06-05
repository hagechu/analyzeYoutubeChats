import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import { Graph } from "./Graph";
import { Icon } from "./Icon";
import { CutPerMinutesButton } from "./CutPerMinutesButton";
import { PlayYoutubeVideo } from "./PlayYoutubeVideo";
import { InputForm } from "./InputForm";

import { ChatPerMinute, Chat } from "../models/chatType";

export const GetYoutubeChats = () => {
  const [chats, setChats] = useState<Array<Chat>>([]); // チャットの全データを格納
  const [videoID, setVideoID] = useState(""); // サーバーに送る動画のID
  const [videoIDforPlay, setVideoIDforPlay] = useState("HFi7I-Z-86E"); // サーバーに送る動画のID

  const [isLoading, setIsLoading] = useState(false); // リクエスト中の判別
  const [isTesting, setIsTesting] = useState(false); // test中の判別
  const [isShowingVideo, setIsShowingVideo] = useState(false); // 動画を表示するかの判別

  const [flowRatePerMinutes, setFlowRatePerMinutes] = useState<ChatPerMinute[]>(
    []
  ); // １分おきのチャット量のデータ
  const [flowRatePer5Minutes, setFlowRatePer5Minutes] = useState<
    ChatPerMinute[]
  >([]); // ５分おきのデータ
  const [flowRatePer10Minutes, setFlowRatePer10Minutes] = useState<
    ChatPerMinute[]
  >([]); // １０分おきのデータ

  const [searchWord, setSearchWord] = useState(""); //グラフ内で検索するワード
  const [graphData, setGraphData] = useState<ChatPerMinute[]>([]); // グラフに描画するデータ
  const [startTime, setStartTime] = React.useState<number>(0); //グラフから動画を再生する時間を指定

  // URLからIDだけにする
  const generateVideoIDFromInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { target } = event;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    if (target.value.length > 11) {
      setVideoID(
        target.value.slice(
          target.value.indexOf("=") + 1,
          target.value.indexOf("=") + 12
        )
      );
    } else {
      setVideoID(target.value);
    }
  };

  //サーバーにポスト & 帰ってきたタイミングでそれぞれsetState
  const postServer = () => {
    setIsLoading(true);
    setIsShowingVideo(false);

    if (isTesting) {
      // testMode中の処理
      axios
        .post("http://127.0.0.1:5000/getYoutubeChatsTest", { videoID: videoID })
        .then((response) => {
          setChats(response.data.chats);
          setIsLoading(false);
          setVideoIDforPlay(videoID);
          setIsShowingVideo(true);
        });
    } else if (videoID === "test") {
      // testModeコマンド
      setIsTesting(true);
      setVideoID("");
      setIsLoading(false);
    } else {
      // 普段の処理
      axios
        .post("http://127.0.0.1:5000/getYoutubeChats", { videoID: videoID })
        .then((response) => {
          setChats(response.data.chats);
          setIsLoading(false);
          setVideoIDforPlay(videoID);
          setIsShowingVideo(true);
        });
    }
  };

  // 年と日付を表記するかの判別
  const omitDate = (date: string, index: number, data: ChatPerMinute[]) => {
    if (index === 0) {
      return date;
    } else if (date.slice(11, 16) === data[0].date.slice(11, 16)) {
      return date;
    } else if (date.slice(0, 4) !== data[0].date.slice(0, 4)) {
      return date;
    } else if (date.slice(0, 10) !== data[0].date.slice(0, 10)) {
      return date.slice(5, 16);
    } else {
      return date.slice(11, 16);
    }
  };

  // １分おきのデータを作成
  useEffect(() => {
    const chatPerMinutes: ChatPerMinute[] = [];
    if (chats === []) {
      //初回マウントなにもしない
    } else {
      chats.forEach((chat, index) => {
        const dateMinute = chat.date.slice(0, 16);

        // データの作成
        if (index === 0) {
          chatPerMinutes.push({
            date: omitDate(dateMinute, index, chatPerMinutes),
            chatAmount: 1,
            wordAmount: 0,
          });
        } else if (
          chatPerMinutes[chatPerMinutes.length - 1].date !==
          omitDate(dateMinute, index, chatPerMinutes)
        ) {
          if (
            chatPerMinutes.length > 1 &&
            omitDate(dateMinute, index, chatPerMinutes) ===
              chatPerMinutes[chatPerMinutes.length - 2].date
          ) {
            chatPerMinutes[chatPerMinutes.length - 1].chatAmount += 1;
          } else {
            chatPerMinutes.push({
              date: omitDate(dateMinute, index, chatPerMinutes),
              chatAmount: 1,
              wordAmount: 0,
            });
          }
        } else {
          chatPerMinutes[chatPerMinutes.length - 1].chatAmount += 1;
        }
      });
    }

    setFlowRatePerMinutes(chatPerMinutes);
    setGraphData(chatPerMinutes);
  }, [chats]);

  // １分おきのデータができたら５分と１０分のデータを作る
  useEffect(() => {
    const chatPer5Minutes: ChatPerMinute[] = [];
    const chatPer10Minutes: ChatPerMinute[] = [];
    if (flowRatePerMinutes === []) {
      //初回マウントなにもしない
    } else {
      flowRatePerMinutes.forEach((chat, index) => {
        if (index % 10 === 0) {
          chatPer5Minutes.push({
            date: chat.date,
            chatAmount: 0 + chat.chatAmount,
            wordAmount: 0,
          });
          chatPer10Minutes.push({
            date: chat.date,
            chatAmount: 0 + chat.chatAmount,
            wordAmount: 0,
          });
        } else if (index % 5 === 0) {
          chatPer5Minutes.push({
            date: chat.date,
            chatAmount: 0 + chat.chatAmount,
            wordAmount: 0,
          });
          chatPer10Minutes[chatPer10Minutes.length - 1].chatAmount +=
            chat.chatAmount;
          chatPer10Minutes[chatPer10Minutes.length - 1].wordAmount +=
            chat.wordAmount;
        } else {
          chatPer5Minutes[chatPer5Minutes.length - 1].wordAmount +=
            chat.wordAmount;
          chatPer10Minutes[chatPer10Minutes.length - 1].wordAmount +=
            chat.wordAmount;
        }
      });
    }

    setFlowRatePer5Minutes(chatPer5Minutes);
    setFlowRatePer10Minutes(chatPer10Minutes);
  }, [flowRatePerMinutes]);

  // 検索ワードの入力の判別
  const inputWord = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }
    setSearchWord(target.value);
  };

  // 入力されたワードで検索
  const searchData = () => {
    const chatArray = [...flowRatePerMinutes];
    const dateArray = flowRatePerMinutes.map((data) => data.date);

    chatArray.forEach((chat) => {
      chat.wordAmount = 0;
    });

    chats.forEach((chat, index) => {
      const dateMinute = chat.date.slice(0, 16);
      if (chat.message.match(searchWord)) {
        chatArray[
          dateArray.indexOf(omitDate(dateMinute, index, chatArray))
        ].wordAmount += 1;
      }
    });

    setFlowRatePerMinutes(chatArray);
    setGraphData(chatArray);
  };

  // りたーん
  return (
    <Body>
      <Header>
        <MenuIcon>
          <Icon
            iconName="Menu"
            iconColor="#000"
            iconSize={32}
            iconWeight={300}
          />
          <div>{isTesting ? <p>testMode</p> : <p></p>}</div>
        </MenuIcon>
        <InputForm
          placeholder={"videoID"}
          iconName={"vertical_align_bottom"}
          value={videoID}
          boxMaxWidth={480}
          boxFunc={generateVideoIDFromInput}
          buttonFunc={postServer}
        />
        <HeaderRight></HeaderRight>
      </Header>
      <Main>
        <div>{isLoading ? <p>分析中...</p> : <p>待機中</p>}</div>
        <VideoSpace>
          {isShowingVideo ? (
            <PlayYoutubeVideo videoID={videoIDforPlay} startTime={startTime} />
          ) : (
            <TemporaryVideoSpace></TemporaryVideoSpace>
          )}
        </VideoSpace>
        <Graph
          graphData={graphData}
          dataKey="chatAmount"
          startTime={startTime}
          setStartTime={setStartTime}
        />
        <Graph
          graphData={graphData}
          dataKey="wordAmount"
          startTime={startTime}
          setStartTime={setStartTime}
        />
        <ControllerWrapper>
          <ControllerWrapperRight>
            <InputForm
              placeholder={"ワード検索"}
              iconName={"search"}
              value={searchWord}
              boxMaxWidth={240}
              boxFunc={inputWord}
              buttonFunc={searchData}
            />
          </ControllerWrapperRight>
          <ControllerWrapperLeft>
            <CutPerMinutesButton
              buttonFunc={() => setGraphData(flowRatePerMinutes)}
              buttonName="1分"
              buttonSize={16}
            />
            <CutPerMinutesButton
              buttonFunc={() => setGraphData(flowRatePer5Minutes)}
              buttonName="5分"
              buttonSize={16}
            />
            <CutPerMinutesButton
              buttonFunc={() => setGraphData(flowRatePer10Minutes)}
              buttonName="10分"
              buttonSize={16}
            />
          </ControllerWrapperLeft>
        </ControllerWrapper>
      </Main>
    </Body>
  );
};

//style
const Body = styled.div`
  height: 100vh;
  background: #fafafa;
`;

const Header = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: #fff;
`;

const MenuIcon = styled.button`
  width: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderRight = styled.div`
  width: 72px;
`;

const Main = styled.div`
  margin: 0 auto;
  max-width: 1000px;

  display: flex;
  flex-flow: column;
  justify-content: center;
`;

const VideoSpace = styled.div`
  width: 100%;
  height: 400px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const TemporaryVideoSpace = styled.div`
  width: 100%;
  max-width: 640px;
  border: 2px dotted #ccc;

  aspect-ratio: 16 / 9;
`;

const ControllerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ControllerWrapperRight = styled.div`
  display: flex;
`;

const ControllerWrapperLeft = styled.div`
  width: 240px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// http://localhost:3000/

// https://www.youtube.com/watch?v=HFi7I-Z-86E
// https://www.youtube.com/watch?v=dj2xt5wSA7A
// https://www.youtube.com/watch?v=v-vQpGo70A8
// https://www.youtube.com/watch?v=vIlEoMschL4&t=12s
// https://www.youtube.com/watch?v=iMfSSZ_Utc0
