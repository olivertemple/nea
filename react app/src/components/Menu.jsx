import React from 'react';
import Settings from './Settings';
export default function Menu(props) {//Menu bar for the app 
        return(
            <div className="menu">
                <Settings
                    size={props.size}//size of the maze
                    setSize={props.setSize}//callback to set the size of the maze from the settings
                    setHeuristic={props.setHeuristic}//callback to set the heuristic from the settings
                    setSpeed={props.setSpeed}//callback to set the speed from the settings
                    speed={props.speed}//speed of the animation 
                />
                <select className="algorithms" name="algorithms" id="algorithms" onChange={(e) => {props.setAlgorithm(e.target.value)}}>
                    <option value="select">Select Generating Algorithm</option>
                    <option value="prims">Prims</option>
                    <option value="recursive_backtracking">recursive backtracking</option>
                </select>
                <button className="button" onClick={props.generate}>Generate</button>
                <select className="algorithms" name="algorithms" id="algorithms" onChange={(e) => {props.setSolve(e.target.value)}}>
                    <option value="select">Select Solving Algorithm</option>
                    <option value="dijkstra">Dijkstra</option>
                    <option value="dfs">Depth First Search</option>
                    <option value="bfs">Breadth First Search</option>
                    <option value="greedy">Greedy</option>
                </select>
                <button className="button" onClick={props.solve}>Solve</button>
                <button className="button clear" onClick={props.clearGrid}>Reset</button>
            </div>
        )
}