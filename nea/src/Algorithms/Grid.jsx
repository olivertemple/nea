export default class Grid{
    constructor(height, width){
        this.height = height;
        this.width = width;

        this.grid = this.generateGrid();
    }

    generateGrid(){
        let grid = [];
        let i;
        for (i=0; i<this.height; i++){
            let row = [];
            let j;
            for (j=0; j<this.width; j++){
                row.push(new Node(j, i, "space"));
            }
            row.push(new Node(j, i, "space"));
            grid.push(row);
        }

        let row = [];
        let j;
        for (j=0; j<this.width + 1; j++){
            row.push(new Node(j, i, "space"));
        }
        grid.push(row);
        
        return grid;
    }
}


class Node{
    constructor(x, y, type){
        this.x = x;
        this.y = y;
        this.type = type;

        this.set = null;

        this.wallLeft = true;
        this.wallBottom = true;
    }
}