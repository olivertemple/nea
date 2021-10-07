export default class Grid{
    constructor(height, width){
        this.Grid = []

        //Fills the grid with walls around the edge and empty spaces in the middle
        for (let i = 0; i <= height; i++){
            let row = []
            for (let j = 0; j <= width; j++){
                if (i === 0 || i === height || j === 0 || j === width){
                    //Adds edges
                    row.push(1)
                }else{
                    //Fills the middle
                    row.push(0)
                }
            }
            this.Grid.push(row)
        }
    }

    draw(orientation, split, width, height){
        switch(orientation){
            case "vertical":
                for (let i = 0; i <= height; i++){
                    this.Grid[i][split] = 1
                }
            
            case "horizontal":
                for (let i = 0; i <= width; i++){
                    this.Grid[split][i] = 1
                }
        }
        console.log(this.Grid)
    }
}
