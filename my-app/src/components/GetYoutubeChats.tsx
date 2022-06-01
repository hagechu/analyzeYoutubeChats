import React, { useState, useEffect } from "react";
import axios from "axios";

import { Graph } from "./Graph";
// import { testData } from "./testData";

import { ChatPerMinute, Chat } from "../models/chatType";

export const GetYoutubeChats = () => {
  const [chats, setChats] = useState<Array<Chat>>([]); // チャットの全データを格納
  const [videoID, setVideoID] = useState(""); // サーバーに送る動画のID
  const [isLoading, setIsLoading] = useState(false); // リクエスト中の判別
  const [isTesting, setIsTesting] = useState(false); // test中の判別

  const [flowRatePerMinutes, setFlowRatePerMinutes] = useState<ChatPerMinute[]>(
    []
  ); // １分おきのチャット量のデータ
  const [flowRatePer5Minutes, setFlowRatePer5Minutes] = useState<
    ChatPerMinute[]
  >([]); // ５分おきのデータ
  const [flowRatePer10Minutes, setFlowRatePer10Minutes] = useState<
    ChatPerMinute[]
  >([]); // １０分おきのデータ

  const [searchWord, setSearchWord] = useState("");

  const [graphData, setGraphData] = useState<ChatPerMinute[]>([]); // グラフに描画するデータ

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

  //サーバーにポスト
  const postServer = () => {
    setIsLoading(true);
    if (isTesting) {
      axios
        .post("http://127.0.0.1:5000/getYoutubeChatsTest", { videoID: videoID })
        .then((response) => {
          setChats(response.data.chats);
          setIsLoading(false);
        });
    } else if (videoID === "test") {
      setIsTesting(true);
      setVideoID("");
      setIsLoading(false);
    } else {
      axios
        .post("http://127.0.0.1:5000/getYoutubeChats", { videoID: videoID })
        .then((response) => {
          setChats(response.data.chats);
          setIsLoading(false);
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
    if (chats === undefined) {
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

  //
  const inputWord = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }
    setSearchWord(target.value);
  };

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

  console.log(chats);

  return (
    <div>
      <div>
        <input value={videoID} onChange={generateVideoIDFromInput} />
        <button onClick={postServer}>getChats</button>
      </div>
      <div>{isTesting ? <p>testMode</p> : <p></p>}</div>
      <div>{isLoading ? <p>分析中...</p> : <p>待機中</p>}</div>
      {/* <div>
        <p>testURL : https://www.youtube.com/watch?v=HFi7I-Z-86E</p>
        <p>testURL : https://www.youtube.com/watch?v=dj2xt5wSA7A</p>
        <p>testURL : https://www.youtube.com/watch?v=v-vQpGo70A8</p>
        <p>testURL : https://www.youtube.com/watch?v=iMfSSZ_Utc0</p>
      </div> */}
      <div>
        <Graph graphData={graphData} dataKey="chatAmount" />
        {/* <button onClick={() => setChats(testData)}>test</button> */}
      </div>
      <div>
        <Graph graphData={graphData} dataKey="wordAmount" />
      </div>
      <div>
        <button onClick={() => setGraphData(flowRatePerMinutes)}>1分</button>
        <button onClick={() => setGraphData(flowRatePer5Minutes)}>5分</button>
        <button onClick={() => setGraphData(flowRatePer10Minutes)}>10分</button>
        <input value={searchWord} onChange={inputWord} />
        <button onClick={searchData}>検索してグラフに描画</button>
      </div>
    </div>
  );
};

// http://localhost:3000/

// https://www.youtube.com/watch?v=HFi7I-Z-86E
// https://www.youtube.com/watch?v=dj2xt5wSA7A
// https://www.youtube.com/watch?v=v-vQpGo70A8
// https://www.youtube.com/watch?v=iMfSSZ_Utc0
