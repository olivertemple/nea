import React from "react";

export default function MenuKey(props){//key for showing the different types of node
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
                    <div className="key_node_path"></div>
                    <p>Path Node</p>
                </div>
                <div className="key_item">
                    <div className="key_node_visited_node"></div>
                    <p>Visited Node</p>
                </div>
            </div>
        )
}