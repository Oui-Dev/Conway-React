function Square(props) {
    // console.log(props);
    return (
        <button className="border border-white py-1 px-3" onClick={() => props.fct(props.coord[0], props.coord[1])}>
            {props.state ? '😐' : '☠️'}
        </button>
    );
}

export default Square;