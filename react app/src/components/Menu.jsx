import React, { Component } from 'react';
export default class Menu extends Component {
    constructor(props) {
        super(props);
    }

    
    render() {
        return(
            <div className="menu">
                <label htmlFor="algorithms">Choose a maze generation algorithm</label>
                <select name="algorithms" id="algorithms" onChange={(e) => {this.props.setAlgorithm(e.target.value)}}>
                    <option value="select">select</option>
                    <option value="prims">Prims</option>
                    <option value="recursive_backtracking">recursive backtracking</option>
                </select>
                <button onClick={this.props.generate}>Press to generate</button>
            </div>
        )
    }
}