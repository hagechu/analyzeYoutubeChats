import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";

import styled from "styled-components";

type videoProps = {
  videoID: string;
  startTime: number;
};

export const PlayYoutubeVideo = (props: videoProps) => {
  const { videoID, startTime } = props;

  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      start: startTime,
      autoplay: 1,
    },
  };

  return <YoutubeSpace videoId={videoID} opts={opts} />;
};

const YoutubeSpace = styled(YouTube)`
  width: 100%;
  max-width: 640px;

  aspect-ratio: 16 / 9;
`;
