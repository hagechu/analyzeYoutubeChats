import React, { useState } from "react";
import axios from "axios";

export const GetYoutubeChats = () => {
  const [chats, setChats] = useState([]);

  const postServer = () => {
    axios.post("http://127.0.0.1:5000/getYoutubeChats").then((res) => {
      setChats(res.data);
    });
  };

  console.log(chats.chats);

  return (
    <div>
      <button onClick={postServer}>getChats</button>
    </div>
  );
};

// http://localhost:3000/
