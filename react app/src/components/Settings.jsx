import React from "react"
export default class Settings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
        }
    }
    handelSizeChange(e){//set the size of the grid when it is changed in the settings
        let value = e.target.value;
        this.props.setSize({height:value, width:value})
    }
    renderSettings(){//render the settings dropdown menu
        return(
            <div className="settings_container">
                <div className="row" style={{gap:10}}>
                    <p>Size</p>
                    <input className="text_input" type="number" value={this.props.size.height} min={1} onChange={e => this.handelSizeChange(e)}/>
                </div>
               
            </div>
        )
    }
    render(){
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