import React, {useState} from "react";
import Space from './Space';

const rowStyle = {
    display:"flex",
    flexWrap: "wrap",
    width:"36vw",
    height:"36vw"
}

const Board = (props:any) => {
    const [size, setSize] = useState(9);

    const playTurn = (key:number, canPlay:boolean) => {
        if(canPlay){
            props.setSpace(key);
        }
        
    }
    return(
        <div style={rowStyle as React.CSSProperties}>
            {
                props.gameState.game.map((space:any, key:any)=>( 
                    <Space key={key} onClick ={()=>playTurn(key, props.gameState.isPlaying)} content={space}/>
                ))
            }
        </div>  
    )
}

export default Board;