import React, { Component } from "react";
import DisplayNode from "./DisplayNode";
import GeneratorInfo from "./GeneratorInfo";
import SolverInfo from "./SolverInfo";
export default class DisplayGrid extends Component{
    constructor(props){
        super(props);
        this.state = {
            dragObject: ""
        }
        //bind the methods to the object so that the "this" keyword refers to the object no matter where the method is called from
        this.renderTable = this.renderTable.bind(this);
        this.handelDrop = this.handelDrop.bind(this);
        this.setDragObject = this.setDragObject.bind(this);
    }
    handelDrop(pos){//move the node that was being dragged to the new position
        switch (this.state.dragObject){
            case "start":
                this.props.setStart(pos)
                break;
            case "end":
                this.props.setEnd(pos)
                break;
            default:
                break;
        }
    }
    setDragObject(type){//set weather start or end node is being dragged
        this.setState({
            dragObject:type
        })
    }
    renderTable(){//render the grid as a table
        return(
            <table>
                <tbody className="column">
                    {Array.from(Array(this.props.grid.height).keys()).map((_, i) => {//iterate through the rows of the grid
                        return(
                            <tr className={`row wall_right ${i === 0 ? "wall_top" : ""}`} key={i}>
                                {Array.from(Array(this.props.grid.width).keys()).map((_, j) => {//iterate through the nodes in each row
                                    return(
                                        <DisplayNode 
                                            key={j}
                                            wallLeft={this.props.grid.grid[i][j].wallLeft} //bool: is there a wall to the left of this node
                                            wallBottom={this.props.grid.grid[i][j].wallBottom} //bool: is there a wall below this node
                                            pos={[i, j]} //position of the node
                                            start={this.props.nodes.start} //position of the start node
                                            end={this.props.nodes.end} //position of the end node
                                            handelDrop = {this.handelDrop} //callback function to move the start or end node to a new position
                                            setDragObject={this.setDragObject} // callback function to set weather the start or end node is being dragged
                                            type={this.props.grid.grid[i][j].type} //type of node
                                            index={this.props.grid.grid[i][j].index} //index of the node for visualization
                                            speed={this.props.speed} //speed of the animation
                                            height={this.props.grid.height}
                                            width={this.props.grid.width}
                                        /> 
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
        
    }
    render(){
        //If there is a grid, render it, else show a message
        if (this.props.grid){
            return(
                <div className="grid" style={{padding:10}}>
                    <GeneratorInfo generator={this.props.generateAlgorithm}/>
                    <this.renderTable />
                    <SolverInfo solver={this.props.solveAlgorithm} heuristic={this.props.heuristic}/>
                </div>
            )
        }
        return(
            <div className="grid message column">
                <h1>No grid to display</h1>
                <h2>Check your internet connection</h2>
            </div>
        )
    }
}