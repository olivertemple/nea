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
        end: [null, null]
      },
      size: {
        width:15,
        height:15
      }
    }

    this.solved = false;
    this.maze = false;
    this.fetchGrid = this.fetchGrid.bind(this);
    this.setAlgorithm = this.setAlgorithm.bind(this);
    this.clearGrid = this.clearGrid.bind(this);
    this.setSolve = this.setSolve.bind(this);
    this.solveGrid = this.solveGrid.bind(this);
    this.setSize = this.setSize.bind(this);
    this.setStart = this.setStart.bind(this);
    this.setEnd = this.setEnd.bind(this);

  }
  componentDidMount(){
    this.clearGrid();
  }
  setSize(size){//set the size of the grid when changed in settings
    this.setState({
      size: size
    }, () => {
      if (size.width > 0 && size.height > 0){
        this.clearGrid();
      }
    })
  }
  setStart(node){//set the start node
    this.setState({
      nodes:{
        start: node,
        end: this.state.nodes.end
      }
    }, () => {
      this.should_solve()
    })
  }
  setEnd(node){//set the end node
    this.setState({
      nodes:{
        start: this.state.nodes.start,
        end: node
      }
    }, () => {
      this.should_solve()
    })
  }
  should_solve(){//if the maze is already solved, then solve again. Only run when the start or end nodes are changed
    if (this.solved){
      this.solveGrid();   
    }
  }
  async fetchGrid(){//generate a new maze from the python API using the selected algorithm
    if (this.state.algorithm){
      let grid = await fetch("https://jkrlv64tsl.execute-api.eu-west-2.amazonaws.com/default/NEA?type=generate&width="+this.state.size.width+"&height="+this.state.size.height+"&generate="+this.state.algorithm)
      grid = await grid.json();
      this.setState({
        grid:grid
      })
      this.solved = false;
      this.maze = true;
    }else{
      alert("Please select a maze generating algorithm")
    } 
  }
  async solveGrid(){//send the maze to the python API to be solved with the requested algorithm
    if (this.maze && this.state.solve){
      let grid = await fetch(
        "https://jkrlv64tsl.execute-api.eu-west-2.amazonaws.com/default/NEA?type=solve&width="+this.state.size.width+"&height="+this.state.size.height+"&solve="+this.state.solve+"&start="+this.state.nodes.start+"&end="+this.state.nodes.end, {
        method: "POST",
        body: JSON.stringify(this.state.grid)
      })
      grid = await grid.json();
      this.setState({
        grid:grid
      })
      this.solved = true;
    }else{
      if (!this.maze){
        alert("Please generate a maze")
      }else{
        alert("Please select a solving algorithm")
      }
    }
    
  }
  async clearGrid(){//generate an empty maze from the API
    let grid = await fetch("https://jkrlv64tsl.execute-api.eu-west-2.amazonaws.com/default/NEA?type=empty_maze&width="+this.state.size.width+"&height="+this.state.size.height)
    grid = await grid.json();
    this.setState({
      grid:grid,
      nodes:{
        start: [0,0],
        end: [this.state.size.height - 1, this.state.size.width - 1]
      }
    })
    this.maze = false;
    this.solved = false;
  }
  setAlgorithm(algorithm){//set the maze generating algorithm
    this.setState({
      algorithm: algorithm
    })
  }
  setSolve(algorithm){//set the maze solving algorithm
    this.setState({
      solve:algorithm
    })
  }
  render(){
    return (
      <div className="App">
        <Menu setAlgorithm={this.setAlgorithm} setSolve={this.setSolve} generate={this.fetchGrid} clearGrid={this.clearGrid} solve={this.solveGrid} size={this.state.size} setSize={this.setSize}/>
        <MenuKey />
        <DisplayGrid grid={this.state.grid} nodes={this.state.nodes} size={this.state.size} setStart={this.setStart} setEnd={this.setEnd}/>
      </div>
    );
  }
}
export default App;
