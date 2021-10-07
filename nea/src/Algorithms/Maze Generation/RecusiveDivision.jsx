
export default class RecursiveDivision{
    constructor(Grid){
        this.Grid = Grid
        this.divide(this.Grid.width, this.Grid.height)
    }

    divide(width, height){
        console.log(width)
        console.log(height)
        if (width<2 || height<2){
            return
        }else{
            //randomly select if maze should be split vertically or horizontally
            let direction = Math.floor(Math.random()*2) === 0 ? "vertical" : "horizontal";
            if (direction === "vertical"){
                let split = Math.floor(height/2)
                this.Grid.draw("vertical", split, width, height)
                this.divide(width, split)
                this.divide(width, height-split)
            }else{
                let split = Math.floor(width/2)
                this.Grid.draw("horizontal", split, width, height)
                this.divide(split, height)
                this.divide(width-split, height)
            }
        }
    }
}
