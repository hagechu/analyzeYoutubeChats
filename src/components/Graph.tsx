import React from "react";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";

import { GraphProps } from "../models/graphType";

type rechartsType = {
  activeTooltipIndex?: number;
  activeLabel?: string;
};

export const Graph = (props: GraphProps) => {
  const { graphData, dataKey, startTime, setStartTime } = props;

  const graphOnClick = (data: rechartsType) => {
    // console.log(data.activeTooltipIndex, data.activeLabel);

    const judgeNumber = (data?: number) => {
      if (data === undefined) {
        return 0;
      } else if (data === 0) {
        return 1;
      } else if (data * 60 === startTime) {
        return data * 60 - 1;
      } else {
        return data * 60;
      }
    };

    setStartTime(judgeNumber(data.activeTooltipIndex));
  };

  return (
    <GraphWrapper>
      <ResponsiveContainer minWidth={500} height={120}>
        <AreaChart
          data={graphData}
          syncId="anyId"
          margin={{ top: 5, right: 56, left: 0, bottom: 5 }}
          onClick={graphOnClick}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </GraphWrapper>
  );
};

const GraphWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;
