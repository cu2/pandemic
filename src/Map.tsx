import React from 'react';
import { parameters, Cell } from './model';


type CellComponentProps = {
  cell: Cell;
}

const CellComponent = ({cell}: CellComponentProps) => {
  if (cell.population === 0) return <div className="cell water">&nbsp;</div>;
  const susceptible = cell.population - cell.infected - cell.sick - cell.recovered - cell.dead;
  return <div className="cell land">
    {/* <div>{cell.population / 1000}k</div> */}
    <div>s = {(susceptible / cell.population * 100).toFixed(2)}</div>
    <div>I = {(cell.infected / cell.population * 100).toFixed(2)}</div>
    <div>S = {(cell.sick / cell.population * 100).toFixed(2)}</div>
    <div>R = {(cell.recovered / cell.population * 100).toFixed(2)}</div>
    <div>D = {(cell.dead / cell.population * 100).toFixed(2)}</div>
  </div>;
}


type RowComponentProps = {
  cells: Cell[];
}

const RowComponent = ({cells}: RowComponentProps) => <div className="row">
  {cells.map((cell, idx) => <CellComponent cell={cell} key={idx} />)}
</div>;


type MapComponentProps = {
  cells: Cell[];
}

const MapComponent = ({cells}: MapComponentProps) => {
  let rows: Cell[][] = [];
  for(let y = 0; y < parameters.mapHeight; y++) {
    let cols: Cell[] = [];
    for(let x = 0; x < parameters.mapWidth; x++) {
      cols.push(cells[parameters.mapWidth * y + x]);
    }
    rows.push(cols);
  }
  return <div className="map">
    {rows.map((row, idx) => <RowComponent cells={row} key={idx} />)}
  </div>
}

export default MapComponent;
