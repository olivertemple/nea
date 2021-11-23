import React, { Component } from "react"
export default class DisplayNode extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            style:{}
        }

        this.handelDragStart = this.handelDragStart.bind(this);
        this.handelDragEnd = this.handelDragEnd.bind(this);
        this.handelDragLeave = this.handelDragLeave.bind(this);
        this.handelDragOver = this.handelDragOver.bind(this);
        this.handelDrop = this.handelDrop.bind(this);

    }

    handelDragStart(){
        this.props.setDragObject(this.start ? "start" : this.end ? "end" : "")
    }

    handelDrop(){
        this.setState({style:{}});
        this.props.handelDrop(this.props.pos)
    }

    handelDragOver(e){
        e.preventDefault();
        this.setState({
            style:{
                backgroundColor:"pink"
            }
        })
    }
    
    handelDragLeave(){
        this.setState({
            style:{}
        })
    }

    handelDragEnd(){
        this.setState({
            style:{}
        })
    }
    render(){
        this.classList = ["node"];
        this.draggable = false;
        this.start = false;
        this.end = false;
        
        if (this.props.wallLeft){
            this.classList.push("wall_left")
        }
        if (this.props.wallBottom){
            this.classList.push("wall_bottom")
        }
        if (this.props.type === "path"){
            this.classList.push("node_path")
        }
        if (this.props.pos[0] === this.props.start[0] && this.props.pos[1] === this.props.start[1]){
            this.classList.push("node_start")
            this.draggable = true
            this.start = true
        }
        if (this.props.pos[0] === this.props.end[0] && this.props.pos[1] === this.props.end[1]){
            this.classList.push("node_end")
            this.draggable = true
            this.end=true
        }

        return(
            <td style={this.state.style} className={this.classList.join(" ")} draggable={this.draggable} onDragStart={this.handelDragStart} onDrop={this.handelDrop} onDragOver={this.handelDragOver} onDragLeave={this.handelDragLeave} onDragEnd={this.handelDragEnd}>
            </td>
        )
    }
    
}
