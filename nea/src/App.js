import logo from './logo.svg';
import './App.css';
import Grid from './Algorithms/Grid';
import RecursiveDivision from './Algorithms/Maze Generation/RecusiveDivision';
import { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    let myGrid = new Grid(10,10)
    let myRecursiveDivision =  new RecursiveDivision(myGrid)
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
