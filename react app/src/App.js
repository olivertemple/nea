import './App.css';
import { Component } from 'react';
import DisplayGrid from './components/DisplayGrid';
import Menu from './components/Menu';
import MenuKey from './components/MenuKey';
import Footer from './components/Footer';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      grid: null,//the grid of nodes
      algorithm: null,//algorithm for generating the maze
      solve:null,//algorithm for solving the maze
      nodes:{
        start: [0,0],//position of the start node
        end: [null, null]//position of the end node
      },
      size: {//size of the maze
        width:15,
        height:15
      },
      heuristic: "euclidean",
      speed:0.1
    }

    this.solved = false;
    this.maze = false;
    //bind the methods to the object so that the "this" keyword refers to the object no matter where the method is called from
    this.fetchGrid = this.fetchGrid.bind(this);
    this.setAlgorithm = this.setAlgorithm.bind(this);
    this.clearGrid = this.clearGrid.bind(this);
    this.setSolve = this.setSolve.bind(this);
    this.solveGrid = this.solveGrid.bind(this);
    this.setSize = this.setSize.bind(this);
    this.setStart = this.setStart.bind(this);
    this.setEnd = this.setEnd.bind(this);
    this.should_solve = this.should_solve.bind(this);
    this.setHeuristic = this.setHeuristic.bind(this);
    this.setSpeed = this.setSpeed.bind(this);
  }

  componentDidMount(){
    //generate a new maze empty when the page loads
    this.clearGrid();
  }

  setHeuristic(heuristic){//set the heuristic for the greedy algorithm
    this.setState({heuristic: heuristic});
  }
  setSpeed(speed){//set the speed of the animation
    this.clearGrid();
    this.setState({speed: speed});
  }
  setSize(size){//set the size of the grid when changed in settings
    this.setState({
      size: size
    }, () => {//setState is asynchronous, so we need to wait for it to finish before running the following code 
      if (size.width > 0 && size.height > 0 && size.width < 31 && size.height < 31){//if the size is valid, generate a new maze
        this.clearGrid();
      }else if(size.width > 30 && size.height > 30){//if the size is too large, alert the user
        alert("The size of the maze must be less than 30.")
      }
    })
  }
  setStart(node){//set the start node
    this.setState({
      nodes:{
        start: node,
        end: this.state.nodes.end
      }
    }, () => {//setState is asynchronous, so we need to wait for it to finish before running the following code
      this.should_solve()//solve the maze again if it is already solved
    })
  }
  setEnd(node){//set the end node
    this.setState({
      nodes:{
        start: this.state.nodes.start,
        end: node
      }
    }, () => {//setState is asynchronous, so we need to wait for it to finish before running the following code
      this.should_solve()//solve the maze again if it is already solved
    })
  }

  async should_solve(){//if the maze is already solved, then solve again. Only run when the start or end nodes are changed
    if (this.solved){
      this.clear_node_index()//clear the index of the nodes, as the maze is being solved again
      .then(() => {
        this.solveGrid();
      })
    }
  }

  async clear_node_index(){//clear the index of the nodes so that the maze can be solved again
    return new Promise(resolve => {//since there are asynchronous calls, we need to wait for them to finish before running the code after the clear_node_index function, hence we use a promise that is resolved once this code is finished
      let grid = this.state.grid.grid
      //iterate through the grid and clear the index of the nodes
      for (let i=0; i<this.state.size.height; i++){
        for(let j=0; j<this.state.size.width; j++){
          grid[i][j].index = null;
        }
      }
      //update the state with the grid that has been cleared of the index's
      this.setState({
        grid: {
          grid: grid,
          height: this.state.grid.height,
          width: this.state.grid.width
        }
      }, () => {
        resolve(); // resolve the promise once the state has been updated
      })
    })
    
  }
  async fetchGrid(){//generate a new maze from the python API using the selected algorithm
    if (this.state.algorithm){//check that there is an algorithm selected for generating the maze
      let grid = await fetch(`https://jkrlv64tsl.execute-api.eu-west-2.amazonaws.com/default/NEA?type=generate&width=${this.state.size.width}&height=${this.state.size.height}&generate=${this.state.algorithm}`)//fetch the generated grid from the python API
      grid = await grid.json();//convert the response to json
      this.setState({//update the state with the new grid
        grid:grid
      })
      this.solved = false;//the maze is no longer solved
      this.maze = true;//set the maze to true as a maze has been generated
    }else{//If there is no algorithm selected to generate the maze, alert the user
      alert("Please select a maze generating algorithm")
    } 
  }
  async solveGrid(){//send the maze to the python API to be solved with the requested algorithm
    await this.clear_node_index();//clear the index of the nodes, as the maze is being solved again
    if (this.maze && this.state.solve){//check that there is a maze and that there is an algorithm selected for solving the maze
      let grid = await fetch(
        `https://jkrlv64tsl.execute-api.eu-west-2.amazonaws.com/default/NEA?type=solve&width=${this.state.size.width}&height=${this.state.size.height}&solve=${this.state.solve}&start=${this.state.nodes.start}&end=${this.state.nodes.end}&heuristic=${this.state.heuristic}`, {
        method: "POST",
        body: JSON.stringify(this.state.grid)//set the body of the request to the grid
      })//send the maze to the python API to be solved, with the selected algorithm as a parameter
      grid = await grid.json();//convert the response to json
      this.setState({//update the state with the new grid
        grid:grid
      })
      this.solved = true;//the maze is now solved
    }else{
      if (!this.maze){//if there is no maze, alert the user that there is no maze to solve
        alert("Please generate a maze")
      }else{
        alert("Please select a solving algorithm")//If there is no algorithm selected to solve the maze, alert the user
      }
    }
    
  }
  async clearGrid(){//generate an empty maze from the API
    let grid = await fetch(`https://jkrlv64tsl.execute-api.eu-west-2.amazonaws.com/default/NEA?type=empty_maze&width=${this.state.size.width}&height=${this.state.size.height}`)//fetch the empty grid from the python API
    grid = await grid.json();//convert the response to json
    this.setState({//update the state
      grid:grid,//update the state with the new grid
      nodes:{//set the start and end nodes to default positions
        start: [0,0],
        end: [this.state.size.height - 1, this.state.size.width - 1]
      }
    })
    this.maze = false;//there is no longer a maze to solve
    this.solved = false;//the maze is no longer solved
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
        <Menu
          setAlgorithm={this.setAlgorithm}//callback function to set the generation algorithm from the menu
          setSolve={this.setSolve}//callback function to set the solving algorithm from the menu
          generate={this.fetchGrid}//callback function to generate a new maze from the menu
          clearGrid={this.clearGrid}//callback function to clear the maze from the menu
          solve={this.solveGrid}//callback function to solve the maze from the menu
          size={this.state.size}//the size of the maze
          setSize={this.setSize}//callback function to set the size of the maze from the menu
          setHeuristic={this.setHeuristic}//callback function to set the heuristic from the menu
          setSpeed={this.setSpeed}//callback function to set the speed from the menu
          speed={this.state.speed}//the speed of the maze
        />
        <MenuKey />
        <DisplayGrid
          grid={this.state.grid}//the grid of the maze
          nodes={this.state.nodes}//the start and end nodes
          size={this.state.size}//the size of the maze
          setStart={this.setStart}//callback function to set the start node
          setEnd={this.setEnd}//callback function to set the end node
          generateAlgorithm={this.state.algorithm}//the algorithm used to generate the maze
          solveAlgorithm={this.state.solve}//the algorithm used to solve the maze
          heuristic={this.state.heuristic}//the heuristic used for the greedy algorithm
          speed={this.state.speed}//the speed of the animation
        />
        <Footer />
      </div>
    );
  }
}
export default App;
