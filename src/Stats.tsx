import React from "react";

const Stats = (props:any) => {
    const stats = props.stats();
    return(
        <div style={{color:"#2c2c54", fontSize:"1.5em", fontWeight:"600"}}>
            {`W: ${stats["w"]} D:${stats["d"]} L:${stats["l"]}`}
        </div>
    )
}

export default Stats;