export default class Generator{
    constructor(){
        return
    }

    prims(Grid){
        let inMaze = [[0,0]];
        let frontier = [[[0,1],["left"]],[[1,0],["top"]]];

        while(frontier.length > 0){
            let randIndex = Math.floor(Math.random() * (frontier.length));
            let newWall = frontier.pop(randIndex);

            let toAdd = newWall[0];

            let wall = newWall[1][Math.floor(Math.random() * (newWall[1].length))]
            inMaze.push(toAdd)
            if (wall == "bottom"){
                Grid.grid[toAdd[0]][toAdd[1]].wallBottom = false
            }

            if (wall == "left"){
                Grid.grid[toAdd[0]][toAdd[1]].wallLeft = false
            }

            if (wall == "top" && toAdd[0] > 0){
                Grid.grid[toAdd[0]-1][toAdd[1]].wallBottom = false
            }

            if (wall == "right" && toAdd[1] < Grid.width){
                Grid.grid[toAdd[0]][toAdd[1]+1].wallLeft = false
            }

            let possible = [[toAdd[0]-1, toAdd[1]],[toAdd[0]+1,toAdd[1]],[toAdd[0],toAdd[1]-1],[toAdd[0], toAdd[1]+1]]

            for (let i = 0; i < 4; i++){
                let p = possible[i];
                let walls = ["bottom", "top", "right", "left"];
                let wall = walls[i];
                if (0 <=p[0]<Grid.height && 0<=p[1]<Grid.width){
                    if (!inMaze.includes(p)){
                        let found = false
                        for (let j = 0; j < frontier.length; j++){
                            let item = frontier[j]
                            if (item[0] == p){
                                item[1].push(wall)
                                found = true
                            }
                        }
                        if (!found){
                            frontier.push([p, [wall]])
                        }
                    }
                }
            }
        }
        return Grid
    }
}