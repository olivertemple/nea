import React, { Component } from "react";

export default class MenuKey extends Component {
    render(){
        return(
            <div className="key">
                <div className="key_item">
                    <div className="key_node_start"></div>
                    <p>Start Node</p>
                </div>
                <div className="key_item">
                    <div className="key_node_end"></div>
                    <p>Finish Node</p>
                </div>
                <div className="key_item">
                    <div className="key_node_via-point"></div>
                    <p>Via Point</p>
                </div>
            </div>
        )
    }
}