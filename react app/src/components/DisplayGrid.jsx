import React, { Component } from "react";
import DisplayNode from "./DisplayNode";
export default class DisplayGrid extends Component{
    constructor(props){
        super(props);
        this.state = {
            dragObject: ""
        }
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
                    {Array.from(Array(this.props.grid.height).keys()).map((_, i) => {
                        return(
                                <tr className={`row wall_right ${i === 0 ? "wall_top" : ""}`} key={i}>
                                    {Array.from(Array(this.props.grid.width).keys()).map((_, j) => {
                                        return(
                                            <DisplayNode key={j} wallLeft={this.props.grid.grid[i][j].wallLeft} wallBottom={this.props.grid.grid[i][j].wallBottom} pos={[i, j]} start={this.props.nodes.start} handelDrop = {this.handelDrop} end={this.props.nodes.end} setDragObject={this.setDragObject} type={this.props.grid.grid[i][j].type} index={this.props.grid.grid[i][j].index}/>
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
        if (this.props.grid){
            return(
                <div className="grid" style={{padding:10}}>
                    <this.renderTable />
                </div>
            )
        }else{
            return(
                <div className="grid"></div>
            )
        }
    }
}