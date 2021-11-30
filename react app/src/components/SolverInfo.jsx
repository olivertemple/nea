export default function SolverInfo(props) {
    let info;
    let title;
    if (props.solver === "dijkstra"){
        title = "Dijkstra's Algorithm"
        info = "Dijkstra's algorithm works by expanding outwards from the start node, adding a distance from the start to each visited node, until the end node is found. The algorithm then works backwards from the end node, choosing the node with the smallest distance at all opportunities. It is guaranteed to find the shortest path."
        //TODO add info about dijkstra
    }else if (props.solver === "dfs"){
        title = "Depth First Search"
        info = "Depth First Search works by searching from a start node and fully exploring a path before moving on to the next node. It uses a stack to store the nodes that it needs to explore. It is not guaranteed to find the shortest path."
    }else if (props.solver === "bfs"){
        title = "Breadth First Search"
        info = "Depth First Search works by searching from a start node and expanding outwards radially until it reaches the end node. It uses a queue to store the nodes that it needs to explore. It is not guaranteed to find the shortest path."
    }else if (props.solver === "greedy"){
        title = "Greedy"
        info = "The greedy algorithm works by finding the node with the lowest heuristic value and expanding it. It is a greedy algorithm because it will always choose the node with the lowest heuristic value. It is not guaranteed to find the shortest path."
    }
    return(
        <div className="info">
            <h1>{title}</h1>
            <p>
                {info}
            </p>
        </div>
    )
}