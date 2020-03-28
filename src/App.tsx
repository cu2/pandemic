import React from 'react';
import './App.css';
import { State, initialState, getNextState, getWorldStats } from './model';
import MapComponent from './Map';
import StatsComponent from './Stats';
import ChartComponent from './Chart';


type AppState = {
  world: State;
  isRunning: boolean;
};

class App extends React.Component<{}, AppState> {
  state: AppState = {
    world: initialState,
    isRunning: false,
  };

  reset = () => {
    this.setState({
      world: initialState,
    });
  }

  step = (cnt: number) => {
    let nextState = this.state.world;
    for(let i = 0; i < cnt; i++) {
      nextState = getNextState(nextState);
    }
    this.setState({
      world: nextState,
    });
  }

  render() {
    const world = this.state.world;
    return <div className="app">
      <h1>Pandemic Simulator</h1>
      <p>Day {world.day}</p>
      <div className="controls">
        <button onClick={() => this.step(1)}>+1</button>
        <button onClick={() => this.step(10)}>+10</button>
        <button onClick={this.reset}>Reset</button>
      </div>
      <div className="visuals">
        <StatsComponent worldStats={getWorldStats(world.cells)} />
        <ChartComponent worldStatsHistory={world.worldStatsHistory} />
      </div>
      <div className="map-container">
        <MapComponent cells={world.cells}/>
      </div>
    </div>;
  }
}

export default App;
