import React, { useState, useEffect } from "react";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";

export const Graph = (props) => {
  const { chats } = props;

  const [graphData, setGraphData] = useState([]); // グラフに描画するデータ
  const [dataPerMinutes, setDataPerMinutes] = useState([]); // １分おきのデータ
  const [dataPer5Minutes, setDataPer5Minutes] = useState([]); // ５分おきのデータ
  const [dataPer10Minutes, setDataPer10Minutes] = useState([]); // １０分おきのデータ

  // propsのchatsに変化があったときに１分おきのデータを作ってグラフに割り当てる
  useEffect(() => {
    const chatPerMinutes = [];
    if (chats === undefined) {
      //初回マウントなにもしない
    } else {
      chats.forEach((chat, index) => {
        const dateMinute = chat.date.substr(0, 16);
        if (index === 0) {
          chatPerMinutes.push({ name: dateMinute, dataPerMinutes: 1 });
        } else if (chatPerMinutes[chatPerMinutes.length - 1].name !== dateMinute) {
          chatPerMinutes.push({ name: dateMinute, dataPerMinutes: 1 });
        } else {
          chatPerMinutes[chatPerMinutes.length - 1].dataPerMinutes += 1;
        }
      });
    }

    setDataPerMinutes(chatPerMinutes);
    setGraphData(chatPerMinutes);
  }, [chats]);

  // １分おきのデータができたら５分と１０分のデータを作る
  useEffect(() => {
    const chatPer5Minutes = [];
    const chatPer10Minutes = [];
    if (dataPerMinutes === []) {
      //初回マウントなにもしない
    } else {
      dataPerMinutes.forEach((chat, index) => {
        if (index % 10 === 0) {
          chatPer5Minutes.push({ name: chat.name, dataPerMinutes: 0 + chat.dataPerMinutes });
          chatPer10Minutes.push({ name: chat.name, dataPerMinutes: 0 + chat.dataPerMinutes });
        } else if (index % 5 === 0) {
          chatPer5Minutes.push({ name: chat.name, dataPerMinutes: 0 + chat.dataPerMinutes });
          chatPer10Minutes[chatPer10Minutes.length - 1].dataPerMinutes += chat.dataPerMinutes;
        } else {
          chatPer5Minutes[chatPer5Minutes.length - 1].dataPerMinutes += chat.dataPerMinutes;
          chatPer10Minutes[chatPer10Minutes.length - 1].dataPerMinutes += chat.dataPerMinutes;
        }
      });
    }

    setDataPer5Minutes(chatPer5Minutes);
    setDataPer10Minutes(chatPer10Minutes);
  }, [dataPerMinutes]);

  // グラフに表示するデータを割り当てるボタン
  const buttonMinutes = () => {
    setGraphData(dataPerMinutes);
  };

  const button5Minutes = () => {
    setGraphData(dataPer5Minutes);
  };

  const button10Minutes = () => {
    setGraphData(dataPer10Minutes);
  };

  return (
    <div>
      <LineChart width={1800} height={800} data={graphData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="dataPerMinutes" stroke="#8884d8" />
      </LineChart>
      <button onClick={buttonMinutes}>1分</button>
      <button onClick={button5Minutes}>5分</button>
      <button onClick={button10Minutes}>10分</button>
    </div>
  );
};
