import React, { Component } from "react";
import DisplayNode from "./DisplayNode";
export default class DisplayGrid extends Component{
    constructor(props){
        super(props);
        this.state = {
            start: [0,0],
            end: [14,14],
            dragObject: ""
        }
        this.renderTable = this.renderTable.bind(this);
        this.handelDrop = this.handelDrop.bind(this);
        this.setDragObject = this.setDragObject.bind(this);
    }

    handelDrop(pos){
        switch (this.state.dragObject){
            case "start":
                this.setState({start: pos});
                break;
            case "end":
                this.setState({end: pos});
                break;
            default:
                break;
        }
    }

    setDragObject(type){
        this.setState({
            dragObject:type
        })
    }

    renderTable(){
        return(
            <table>
                <tbody className="column">
                    {Array.from(Array(this.props.grid.height).keys()).map((_, i) => {
                        return(
                                <tr className={`row wall_right ${i === 0 ? "wall_top" : ""}`}>

                                    {Array.from(Array(this.props.grid.width).keys()).map((_, j) => {
                                        return(
                                            <DisplayNode key={i+j} wallLeft={this.props.grid.grid[i][j].wallLeft} wallBottom={this.props.grid.grid[i][j].wallBottom} pos={[i, j]} start={this.state.start} handelDrop = {this.handelDrop} end={this.state.end} setDragObject={this.setDragObject}/>
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
                <div style={{padding:10}}>
                    <this.renderTable />
                </div>
            )
        }else{
            return(
                <div></div>
            )
        }
        
    }
}