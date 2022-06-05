import { Dispatch, SetStateAction } from "react";
import { ChatPerMinute } from "./chatType";

export type GraphProps = {
  graphData: ChatPerMinute[];
  dataKey: string;
  startTime: number;
  setStartTime: Dispatch<SetStateAction<number>>;
};
