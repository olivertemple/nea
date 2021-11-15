import logo from './logo.svg';
import './App.css';
import Grid from "./Algorithms/Grid.jsx";
import { Component } from 'react';
import DisplayGrid from './components/DisplayGrid';
import Generator from './Algorithms/Generator';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      grid: null
    }
    this.fetchGrid();
  }

  async fetchGrid(){
    let grid = await fetch("https://jkrlv64tsl.execute-api.eu-west-2.amazonaws.com/default/NEA?width=10&height=10&algorithm=prims")
    grid = await grid.json();
    this.setState({
      grid:grid
    })
  }

  logGrid(){
    let width = this.state.grid.width;
    let height = this.state.grid.height;

    console.log(" __" * width)

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        let cell = ""
        if (this.state.grid.grid[i][j].wallLeft) {
          cell += "|"
        }
        else{
          cell += " ";
        }
        cell += "  "
        console.log(cell)
      }
      console.log("|")

      for (let j = 0; j < width; j++) {
        let cell = ""
        if (this.state.grid.grid[i][j].wallLeft){
          cell += "|"
        }else{
          cell += " ";
        }

        if (this.state.grid.grid[i][j].wallBottom){
          cell += "_"
        }else{
          cell += " ";
        }
        console.log(cell)
      }
      console.log("|")
    }
  }
  render(){
    return (
      <div className="App">
        <DisplayGrid grid={this.state.grid}/>
      </div>
    );
  }
}

export default App;
