import React from 'react';
import { WorldStats, colors } from './model';


const formatInteger = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

const statRows = [
  {
    label: 'Population',
    prop: 'population',
    showRatio: false,
    color: 'rgb(0, 0, 0)',
  },
  {
    label: 'Susceptible',
    prop: 'susceptible',
    showRatio: true,
    color: colors.susceptible,
  },
  {
    label: 'Infected',
    prop: 'infected',
    showRatio: true,
    color: colors.infected,
  },
  {
    label: 'Sick',
    prop: 'sick',
    showRatio: true,
    color: colors.sick,
  },
  {
    label: 'Recovered',
    prop: 'recovered',
    showRatio: true,
    color: colors.recovered,
  },
  {
    label: 'Dead',
    prop: 'dead',
    showRatio: true,
    color: colors.dead,
  },
]

type StatsComponentProps = {
  worldStats: WorldStats;
}

const StatsComponent = ({worldStats}: StatsComponentProps) => <table className="stats">
  <tbody>
    {
      statRows.map((statRow, idx) => <tr key={idx}>
        <th style={{color: statRow.color}}>{statRow.label}</th>
        <td>{formatInteger((worldStats as any)[statRow.prop])}</td>
        <td>{statRow.showRatio ? ((worldStats as any)[statRow.prop] / worldStats.population * 100).toFixed(2) : null}</td>
      </tr>)
    }
  </tbody>
</table>;

export default StatsComponent;
