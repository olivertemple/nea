import React from "react"
import ReactDOM from "react-dom"

export default class Settings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            heuristic: "euclidean"//set default heuristic to euclidean
        }
        //bind the methods to the object so that the "this" keyword refers to the object no matter where the method is called from
        this.handelSizeChange = this.handelSizeChange.bind(this);
        this.setHeuristic = this.setHeuristic.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    componentDidMount(){//add an event listener to the document so that the settings dropdown menu can be hidden if the user clicks outside of it
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount(){//remove the event listener from the document when the component is removed from the DOM
        document.removeEventListener("mousedown", this.handleClickOutside);
    }
    handleClickOutside(event){//hide the settings dropdown menu if the user clicks outside of it
        const domNode = ReactDOM.findDOMNode(this);
        if (!domNode || !domNode.contains(event.target)) {
            this.setState({show: false});
        }
    }
    handelSizeChange(e){//change the size of the grid when it is changed in the settings
        let value = e.target.value;
        this.props.setSize({height:value, width:value})
    }
    setHeuristic(heuristic){//set the heuristic to the selected heuristic
        this.setState({
            heuristic: heuristic
        })
        this.props.setHeuristic(heuristic)
    }
    renderSettings(){//render the settings dropdown menu
        return(
            <div className="settings_container">
                <div className="column">
                    <p>Size</p>
                    <input className="text_input" type="number" value={this.props.size.height} min={1} onChange={e => this.handelSizeChange(e)}/>
                </div>
                <div className="column">
                    <p>Greedy Heuristic</p>
                     <select className="algorithms" name="heuristic" id="algorithms" onChange={(e) => {this.setHeuristic(e.target.value)}} value={this.state.heuristic}>
                        <option value="manhattan">Manhattan</option>
                        <option value="euclidean">Euclidean</option>
                    </select>
                </div>
                <div className="column">
                    <p>Speed</p>
                    <input type="range" defaultValue={this.props.speed} min={0.01} max={0.3} step={0.01} onChange={(e) => {this.props.setSpeed(e.target.value)}} />    
                </div> 
               
            </div>
        )
    }
    render(){//render the settings button and the settings dropdown menu if it is clicked
        return(
            <div>
                <button className="button settings" onClick={() => {this.setState({show:!this.state.show})}}>Settings</button>
                {
                    //show the settings dropdown menu if the button is clicked
                    this.state.show ? this.renderSettings() : null 
                }
            </div>
        )
    }
}