import React from 'react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Label
} from 'recharts';
import { WorldStats, colors } from './model';


const dataNames = [
  'Susceptible',
  'Infected',
  'Sick',
  'Recovered',
  'Dead',
];

const dataDef = dataNames.map((name) => ({
  label: name,
  prop: name.toLowerCase(),
  color: (colors as any)[name.toLowerCase()],
}));

type ChartComponentProps = {
  worldStatsHistory: WorldStats[];
}

const ChartComponent = ({worldStatsHistory}: ChartComponentProps) => {

  const data = worldStatsHistory.map((worldStats, idx) => ({
    ...worldStats,
    Day: idx
  }));

  const lines = dataDef.map((dd) => <Line
    dataKey={dd.prop}
    name={dd.label}
    stroke={dd.color}
    dot={false}
    isAnimationActive={false}
  />)

  return <div className="chart">
    <ResponsiveContainer>
      <LineChart
        data={data}
        margin={{
          top: 10, right: 20, left: 40, bottom: 20,
        }}
      >
        <XAxis dataKey="Day">
          <Label value="Day" position="bottom" />
        </XAxis>
        <YAxis />
        <Tooltip />
        {lines}
      </LineChart>
    </ResponsiveContainer>
  </div>;
}

export default ChartComponent;
