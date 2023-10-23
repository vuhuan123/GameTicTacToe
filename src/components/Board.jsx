import Box from "./Box";


const style = {
    width: "400px",
    height: "400px",
    margin: "0 auto",
    display: "grid",
    gridTemplate: "repeat(3, 1fr)/repeat(3,1fr)"

}
function Board(props) {
    return (
        <div style={style}>
            {
                [...Array(9)].map((_, index) => (
                    <Box key={index} onClick={props.onClick} value={props.value[index]} index={index} />
                ))
            }
        </div>

    );
}

export default Board;