import './App.css';
import { Component } from 'react';
import DisplayGrid from './components/DisplayGrid';
import Menu from './components/Menu';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      grid: null,
      algorithm: null
    }
    this.fetchGrid = this.fetchGrid.bind(this);
    this.setAlgorithm = this.setAlgorithm.bind(this);
  }

  async fetchGrid(){
    let grid = await fetch("https://jkrlv64tsl.execute-api.eu-west-2.amazonaws.com/default/NEA?width=15&height=15&algorithm="+this.state.algorithm)
    grid = await grid.json();
    this.setState({
      grid:grid
    })
  }
  
  setAlgorithm(algorithm){
    this.setState({
      algorithm: algorithm
    })
  }

  render(){
    return (
      <div className="App">
        <Menu setAlgorithm={this.setAlgorithm} generate={this.fetchGrid}/>
        <DisplayGrid grid={this.state.grid}/>
      </div>
    );
  }
}

export default App;
