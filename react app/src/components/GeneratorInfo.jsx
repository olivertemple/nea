export default function GeneratorInfo(props) {
    let info;
    let title;
    if (props.generator === "prims"){
        title = "Prim's Algorithm"
        info = "Prim's algorithm starts at one point, and expands the graph by removing walls from the graph that connect the current node to the closest unvisited node. The algorithm continues until all nodes are connected."
    }else if (props.generator === "recursive_backtracking"){
        title = "Recursive Backtracking"
        info = "Recursive backtracking works by choosing a random wall to remove that connects the current node to another node that is not in the maze. The algorithm continues until all adjacent nodes are in the maze, and then it backtracks and repeats the process."
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