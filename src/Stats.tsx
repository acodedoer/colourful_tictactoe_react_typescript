import React from "react";

const Stats = (props:any) => {
    const stats = props.stats();
    return(
        <div style={{color:"#2c2c54", fontSize:"1.5em", fontWeight:"600"}}>
            {`W: ${stats["W"]} D:${stats["D"]} L:${stats["L"]}`}
        </div>
    )
}

export default Stats;