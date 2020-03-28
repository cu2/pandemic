export interface Cell {
  population: number;
  infected: number;
  sick: number;
  recovered: number;
  dead: number;
}

export interface State {
  day: number;
  cells: Cell[];
  worldStatsHistory: WorldStats[];
}

export const colors = {
  susceptible: 'rgb(0, 0, 255)',
  infected: 'rgb(255, 160, 0)',
  sick: 'rgb(255, 0, 0)',
  recovered: 'rgb(0, 200, 0)',
  dead: 'rgb(0, 0, 0)',
}

export interface WorldStats {
  population: number;
  susceptible: number;
  infected: number;
  sick: number;
  recovered: number;
  dead: number;
}

export const getWorldStats = (cells: Cell[]): WorldStats => {
  let population = 0;
  let infected = 0;
  let sick = 0;
  let recovered = 0;
  let dead = 0;
  for(const cell of cells) {
    population += cell.population;
    infected += cell.infected;
    sick += cell.sick;
    recovered += cell.recovered;
    dead += cell.dead;
  }
  return {
    population: population,
    susceptible: population - infected - sick - recovered - dead,
    infected: infected,
    sick: sick,
    recovered: recovered,
    dead: dead,
  };
};


// const worldMap =
// `        xx
// xxxxxxx xx  xxxxxxxxxxx
// xxxxxxx    xxxxxxxxxxxx
//  xxxxxx    xxxxxxxxxxx
//  xxxxx     xxxxxxxxxxx
//   xx      xxxxxxxxxxx
//    xxxx   xxxxxx x xx
//     xxxx    xxx     x
//     xxxx    xxx       x
//      xxx    xxx     xxxx
//      xx     xx      xxxx
//      xx`;

const worldMap =
`   
 x 
   `;

// const patientZeroCoord = [20, 3];
const patientZeroCoord = [1, 1];

const worldMapRows = worldMap.split('\n');
const mapHeight = worldMapRows.length;
const mapWidth = Math.max(...worldMapRows.map((row) => row.length));

export const parameters: any = {
  mapWidth: mapWidth,
  mapHeight: mapHeight,
  mapSize: mapWidth * mapHeight,
  infectionRate: 0.9,  // probability that you get infected if you meet an infected person
  sickRate: 0.1,
  recoverRate: 0.2,
  sickRecoverRate: 0.1,
  sickDeadRate: 0.1,
};

const getInitialCell = (coord: number) => {
  const y = Math.floor(coord / mapWidth);
  const x = coord % mapWidth;
  const pop = worldMapRows[y][x] === 'x' ? 1000000 : 0;
  const infected = (x === patientZeroCoord[0] && y === patientZeroCoord[1]) ? 10 : 0;
  return {
    population: pop,
    infected: infected,
    sick: 0,
    recovered: 0,
    dead: 0,
  };
};

const initialCells = Array.from(Array(parameters.mapSize)).map((_, coord) => getInitialCell(coord));

export const initialState: State = {
  day: 0,
  cells: initialCells,
  worldStatsHistory: [getWorldStats(initialCells)],
};


const getNextCellState = (cell: Cell) => {
  if (cell.population === 0) {
    return {
      ...cell
    };
  };
  if (cell.infected + cell.sick === 0) {
    return {
      ...cell
    };
  };
  //
  let infected = cell.infected;
  let sick = cell.sick;
  let recovered = cell.recovered;
  let dead = cell.dead;
  // susceptible -> infected
  const susceptible = cell.population - cell.infected - cell.sick - cell.recovered - cell.dead;
  const infectedRate = (cell.infected + cell.sick) / cell.population;
  const newInfection = Math.min(susceptible, Math.ceil(susceptible * infectedRate * parameters.infectionRate));
  infected += newInfection;
  // infected -> sick
  const newSickness = Math.min(infected, Math.ceil(infected * parameters.sickRate));
  infected -= newSickness;
  sick += newSickness;
  // infected -> recovered
  const newRecovered = Math.min(infected, Math.ceil(infected * parameters.recoverRate));
  infected -= newRecovered;
  recovered += newRecovered;
  // sick -> dead
  const newSickDead = Math.min(sick, Math.ceil(sick * parameters.sickDeadRate));
  sick -= newSickDead;
  dead += newSickDead;
  // sick -> recovered
  const newSickRecovered = Math.min(sick, Math.ceil(sick * parameters.sickRecoverRate));
  sick -= newSickRecovered;
  recovered += newSickRecovered;
  //
  return {
    population: cell.population,
    infected: infected,
    sick: sick,
    recovered: recovered,
    dead: dead,
  };
};


export const getNextState = (state: State): State => {
  const newCells = state.cells.map((cell, coord) => getNextCellState(cell));
  return {
    day: state.day + 1,
    cells: newCells,
    worldStatsHistory: [...state.worldStatsHistory, getWorldStats(newCells)],
  };
};
