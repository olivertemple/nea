import './App.css';
import { Component } from 'react';
import DisplayGrid from './components/DisplayGrid';
import Menu from './components/Menu';
import MenuKey from './components/MenuKey';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      grid: null,
      algorithm: null,
      solve:null,
      nodes:{
        start: [0,0],
        end: [14, 14]
      }
    }
    this.fetchGrid = this.fetchGrid.bind(this);
    this.setAlgorithm = this.setAlgorithm.bind(this);
    this.clearGrid = this.clearGrid.bind(this);
    this.getNodes = this.getNodes.bind(this);
    this.setSolve = this.setSolve.bind(this);

  }

  componentDidMount(){
    this.clearGrid();
  }

  getNodes(nodes){
    this.setState({
      nodes: nodes
    })
  }

  async fetchGrid(){
    if (this.state.algorithm && this.state.solve){
      let grid = await fetch("https://jkrlv64tsl.execute-api.eu-west-2.amazonaws.com/default/NEA?type=maze&width=15&height=15&generate="+this.state.algorithm+"&solve="+this.state.solve+"&start="+this.state.nodes.start+"&end="+this.state.nodes.end)
      grid = await grid.json();
      this.setState({
        grid:grid
      })
    }else{
      alert("please select an algorithm for maze generation and solving")
    }
    
  }
  
  setAlgorithm(algorithm){
    this.setState({
      algorithm: algorithm
    })
  }

  setSolve(algorithm){
    this.setState({
      solve:algorithm
    })
  }

  async clearGrid(){
    let grid = await fetch("https://jkrlv64tsl.execute-api.eu-west-2.amazonaws.com/default/NEA?type=empty_maze&width=15&height=15")
    grid = await grid.json();
    this.setState({
      grid:grid
    })
  }

  render(){
    return (
      <div className="App">
        <Menu setAlgorithm={this.setAlgorithm} setSolve={this.setSolve} generate={this.fetchGrid} clearGrid={this.clearGrid}/>
        <MenuKey />
        <DisplayGrid grid={this.state.grid} getNodes={this.getNodes}/>
      </div>
    );
  }
}

export default App;
