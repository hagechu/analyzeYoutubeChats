import React from "react";
import YouTube from "react-youtube";

import styled from "styled-components";

import { videoProps } from "../models/videoType";

export const PlayYoutubeVideo = (props: videoProps) => {
  const { videoID } = props;

  return (
    <YoutubeWrapper>
      <YouTube videoId={videoID} />
    </YoutubeWrapper>
  );
};

const YoutubeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
