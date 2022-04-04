import React from "react";

const buttonStyle = {
    minWidth: "10vw",
    height: "3em",
    margin: "1em",
    color:"#2c2c54", 
    fontSize:"1.5em", 
    fontWeight:"600",
    borderRadius:"1vw",
    boxShadow: "5px 5px 15px -5px #000000",
    border:"0px",
    cursor: "pointer"
}
const Footer = (props:any) => {
    return(
        <button onClick={props.replay} style={{...buttonStyle,visibility:`${props.visibility==false?"visible":"hidden"}`} as React.CSSProperties}>Replay</button>
    )
}

export default Footer;