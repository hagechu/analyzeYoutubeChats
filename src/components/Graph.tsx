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

export const Graph = (props: GraphProps) => {
  const { graphData, dataKey } = props;

  return (
    <GraphWrapper>
      <ResponsiveContainer minWidth={500} height={120}>
        <AreaChart
          data={graphData}
          margin={{ top: 5, right: 60, left: 0, bottom: 5 }}
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
