import React, { Component } from 'react';
export default class Menu extends Component {
    constructor(props) {
        super(props);
    }

    
    render() {
        return(
            <div className="menu">
                <button className="button settings">Settings</button>
                <select className="algorithms" name="algorithms" id="algorithms" onChange={(e) => {this.props.setAlgorithm(e.target.value)}}>
                    <option value="select">Select Generating Algorithm</option>
                    <option value="prims">Prims</option>
                    <option value="recursive_backtracking">recursive backtracking</option>
                </select>
                <button className="button" onClick={this.props.generate}>Run</button>
                <select className="algorithms" name="algorithms" id="algorithms" onChange={(e) => {this.props.setSolve(e.target.value)}}>
                    <option value="select">Select Solving Algorithm</option>
                    <option value="dijkstra">Dijkstra</option>
                </select>
                <button className="button clear" onClick={this.props.clearGrid}>Clear</button>
            </div>
        )
    }
}