import React, { useState } from "react";
import axios from "axios";

import { Graph } from "./Graph";

export const GetYoutubeChats = () => {
  const [chats, setChats] = useState([]); // チャットの全データを格納
  const [videoID, setVideoID] = useState(""); // サーバーに送る動画のID
  const [isLoading, setIsLoading] = useState(false); // リクエスト中の判別

  //サーバーにポスト
  const postServer = () => {
    setIsLoading(true);
    axios.post("http://127.0.0.1:5000/getYoutubeChats", { videoID: videoID }).then((response) => {
      setChats(response.data);
      setIsLoading(false);
    });
  };

  // URLからIDだけにする
  const substrURL = (url) => {
    setVideoID(url.target.value.substr(url.target.value.length - 11));
  };

  return (
    <div>
      <input value={videoID} onChange={substrURL} />
      <button onClick={postServer}>getChats</button>
      {isLoading ? <p>分析中...</p> : <p>待機中</p>}
      <p>testURL : https://www.youtube.com/watch?v=HFi7I-Z-86E</p>
      <p>testURL : https://www.youtube.com/watch?v=dj2xt5wSA7A</p>
      <p>testURL : https://www.youtube.com/watch?v=VH5z21x7_3c</p>
      <Graph chats={chats.chats} />
    </div>
  );
};

// http://localhost:3000/

// https://www.youtube.com/watch?v=HFi7I-Z-86E
// https://www.youtube.com/watch?v=dj2xt5wSA7A
// https://www.youtube.com/watch?v=VH5z21x7_3c
