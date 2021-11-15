export default function DisplayNode(props){
    let classList = ["node"];
    if (props.wallLeft){
        classList.push("wall_left")
    }
    if (props.wallBottom){
        classList.push("wall_bottom")
    }
    return(
        <div className={classList.join(" ")}>
        </div>
    )
}