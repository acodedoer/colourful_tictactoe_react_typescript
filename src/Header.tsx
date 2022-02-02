import React from "react";
import Stats from "./Stats";
import Timer  from "./Timer";

const headerStyle = {
    width:"100vw",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems:"center"
}

const Header = (props:any) => {
    return(
        <div style={headerStyle as React.CSSProperties}>
            <h1><span style={{color:"#a40e4c"}}>Tic</span> <span style={{color:"#2c2c54"}}>Tac</span> <span style={{color:"#a40e4c"}}>Toe</span></h1>
            <Stats stats={props.stats}/>
        </div>
    )
}

export default Header;