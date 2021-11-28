import React from "react"
export default class DisplayNode extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            style:{}
        }
        this.handelDragStart = this.handelDragStart.bind(this);
        this.handelDragLeave = this.handelDragLeave.bind(this);
        this.handelDragOver = this.handelDragOver.bind(this);
        this.handelDrop = this.handelDrop.bind(this);
    }
    handelDragStart(){//set the type of node that is being dragged
        this.props.setDragObject(this.start ? "start" : this.end ? "end" : "")
    }
    handelDrop(){//move the node that was being dragged to the new position
        this.setState({style:{}});
        this.props.handelDrop(this.props.pos)
    }

    handelDragOver(e){//when another node is dragged over this node, set the style of the node to be pink
        e.preventDefault();
        this.setState({
            style:{
                backgroundColor:"pink"
            }
        })
    }
    handelDragLeave(){//remove the pink style when the node is no longer being dragged over
        this.setState({
            style:{}
        })
    }
    render(){
        //generate a list of css classes for this node
        this.classList = ["node"];
        //set default values for the node
        this.draggable = false;
        this.start = false;
        this.end = false;
        //add walls to the node classList
        if (this.props.wallLeft){
            this.classList.push("wall_left")
        }
        if (this.props.wallBottom){
            this.classList.push("wall_bottom")
        }
        //add path to node classList
        if (this.props.type === "path"){
            this.classList.push("node_path")
        }else{
            //Remove the "node_path" item from the classList if it isn't a path, as when maze is resolved the nodes would remain a path node if it was a path node before.
            this.classList.filter(x => {return x != "node_path"})
        }
        //add attributes for the start node
        if (this.props.pos[0] === this.props.start[0] && this.props.pos[1] === this.props.start[1]){
            this.classList.push("node_start")
            this.draggable = true
            this.start = true
        }else{
            this.classList.filter(x => {return x != "node_start"})
        }
        //add attributes for the end node
        if (this.props.pos[0] === this.props.end[0] && this.props.pos[1] === this.props.end[1]){
            this.classList.push("node_end")
            this.draggable = true
            this.end=true
        }else{
            this.classList.filter(x => {return x != "node_end"})
        }

        if(this.props.index){
            if (this.props.type != "path"){
                this.state.style = {
                    animation: "visit_node 2s linear forwards",
                    animationDelay: `${this.props.index*0.1}s`
                }
            }else{
                this.state.style = {
                    animation: "visit_node_path 2s linear forwards",
                    animationDelay: `${this.props.index * 0.1}s`
                }
            }
        }else{
            if (!this.state.style.backgroundColor){
                this.state.style = {
                }
            }
        }
        return(
            <td style={this.state.style} className={this.classList.join(" ")} draggable={this.draggable} onDragStart={this.handelDragStart} onDrop={this.handelDrop} onDragOver={this.handelDragOver} onDragLeave={this.handelDragLeave}>
            </td>
        )
    }
    
}
