function Box(props) {
    return (
        <button style={{ fontWeight: "600", fontSize: "40px", color: "#rgb(133 3 3)" }} onClick={() => props.onClick(props.index)}>
            {props.value}
        </button>


    );
}

export default Box;