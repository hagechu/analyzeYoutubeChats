import React, { useEffect, useState } from "react";

const clientId = "vqnduas69ytozizkjlfsyo7sytz2r6";
const authorization = "l5galxun2k0nfa45geled47acu2f4i";
const videoID = "1437460951";

const gameName = "APEX Legends";
const gameId = "";

//games?name=${gameName}
//streams?game_id=511224

export const GetTwitchData = () => {
  const [chats, setChats] = useState();

  const getLiveData = () => {
    fetch(`https://api.twitch.tv/helix/streams?game_id=511224`, {
      headers: {
        "Client-ID": clientId,
        Authorization: `Bearer ${authorization}`,
      },
    })
      .then((response) => response.json()) //取得したデータを.json化
      .then((data) => {
        setChats(data);
      });
  };

  const getCommentsData = () => {
    fetch(
      `https://api.twitch.tv/v5/videos/' + ${videoID} + '/comments?content_offset_seconds=0`,
      {
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${authorization}`,
        },
      }
    )
      .then((response) => response.json()) //取得したデータを.json化
      .then((data) => {
        setChats(data);
      });
  };

  console.log(chats);

  return (
    <div>
      <button
        onClick={function () {
          getLiveData();
          setInterval(getLiveData, 60000);
        }}
      >
        getData
      </button>
      <a href="https://id.twitch.tv/oauth2/authorize?client_id=vqnduas69ytozizkjlfsyo7sytz2r6&redirect_uri=http://localhost:3000&response_type=token&scope=bits:read">
        Twitch認証
      </a>
    </div>
  );
};
