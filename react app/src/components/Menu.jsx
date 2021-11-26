import React, { Component } from 'react';
import Settings from './Settings';
export default class Menu extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="menu">
                <Settings size={this.props.size} setSize={this.props.setSize}></Settings>
                <select className="algorithms" name="algorithms" id="algorithms" onChange={(e) => {this.props.setAlgorithm(e.target.value)}}>
                    <option value="select">Select Generating Algorithm</option>
                    <option value="prims">Prims</option>
                    <option value="recursive_backtracking">recursive backtracking</option>
                </select>
                <button className="button" onClick={this.props.generate}>Generate</button>
                <button className="button" onClick={this.props.solve}>Solve</button>
                <select className="algorithms" name="algorithms" id="algorithms" onChange={(e) => {this.props.setSolve(e.target.value)}}>
                    <option value="select">Select Solving Algorithm</option>
                    <option value="dijkstra">Dijkstra</option>
                    <option value="dfs">Depth First Search</option>
                    <option value="bfs">Breadth First Search</option>
                </select>
                <button className="button clear" onClick={this.props.clearGrid}>Reset</button>
            </div>
        )
    }
}