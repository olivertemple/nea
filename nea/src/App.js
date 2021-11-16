import './App.css';
import { Component } from 'react';
import DisplayGrid from './components/DisplayGrid';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      grid: null
    }
    this.fetchGrid();
  }

  async fetchGrid(){
    let grid = await fetch("https://jkrlv64tsl.execute-api.eu-west-2.amazonaws.com/default/NEA?width=15&height=15&algorithm=prims")
    grid = await grid.json();
    this.setState({
      grid:grid
    })
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
