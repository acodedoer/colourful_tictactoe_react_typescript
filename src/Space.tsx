import React from "react";

const spaceStyle ={
    height: "10vw",
    margin:"1vw",
    cursor:"pointer",
    flexBasis:"10vw",
    borderRadius:"1vw",
    boxShadow: "5px 5px 15px -5px #000000"
}

const redStyle ={
    height: "10vw",
    margin:"1vw",
    backgroundColor:"#a40e4c",
    cursor:"pointer",
    flexBasis:"10vw",
    borderRadius:"1vw",
    boxShadow: "5px 5px 15px -5px #000000"
}

const blueStyle = {
    height: "10vw",
    margin:"1vw",
    backgroundColor:"#2c2c54",
    cursor:"pointer",
    flexBasis:"10vw",
    borderRadius:"1vw",
    boxShadow: "5px 5px 15px -5px #000000"
}

const Space = (props:any) => {
    let style = spaceStyle;
    if(props.content=="o") style = blueStyle;
    else if(props.content=="x") style = redStyle;
    return(
        <div onClick={props.onClick} style={style}>
        </div>
    )
}

export default Space;