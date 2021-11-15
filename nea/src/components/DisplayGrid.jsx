import React, { Component } from "react";
import DisplayNode from "./DisplayNode";
export default class DisplayGrid extends Component{
    constructor(props){
        super(props);
        this.renderTable = this.renderTable.bind(this);
    }

    renderTable(){
        return(
            <table>
                <tbody className="column">
                    {Array.from(Array(this.props.grid.height).keys()).map((_, i) => {
                        return(
                            <tr className="column">                                
                                <tr className={`row wall_right ${i === 0 ? "wall_top" : ""}`}>

                                    {Array.from(Array(this.props.grid.width).keys()).map((_, j) => {
                                        return(
                                            <DisplayNode key={i+j} wallLeft={this.props.grid.grid[i][j].wallLeft}/>
                                        )
                                    })}
                                </tr>
                                <tr className="row wall_right">
                                    {Array.from(Array(this.props.grid.width).keys()).map((_, j) => {
                                        return(
                                            <DisplayNode key={i+j} wallLeft={this.props.grid.grid[i][j].wallLeft} wallBottom={this.props.grid.grid[i][j].wallBottom}/>
                                        )
                                    })}
                                </tr>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
        
    }
    /*
    
                    <tr className="endwall">
                        {Array.from(Array(this.props.grid.width).keys()).map((_, i) => {
                            return(
                                <DisplayNode key={i} node={{wallLeft:true}} />
                            )
                        })}
                    </tr>
    */
    render(){
        if (this.props.grid){
            console.log(Array.from(Array(this.props.grid.width).keys()))
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