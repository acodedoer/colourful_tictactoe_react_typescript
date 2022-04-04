import { RESULT } from "./App";
const textStyle = {color:"#2c2c54", fontSize:"1.5em", fontWeight:"600",width: "5em", display:"flex", flexDirection: "row", justifyContent: "space-around", alignItems:"center"};
const oColor = {width:"1em", height: "1em", backgroundColor:"#2c2c54"};
const xColor = {width:"1em", height: "1em", backgroundColor:"#a40e4c"};

const Turn = (props: any) =>{
    return(
        (props.turn[1]==RESULT.UNKNOWN?
            props.turn[0]=="x"?
                <div style={textStyle as React.CSSProperties}>
                    <div style={xColor}></div>
                    <div>to play</div>
                </div>
            :
                <div style={textStyle as React.CSSProperties}>
                    <div style={oColor}></div>
                    <div>to play</div>
                </div>
        :
        props.turn[1]==RESULT.DRAW?
            <div style={textStyle as React.CSSProperties}>
                <div>DRAW</div>
            </div>
            :
            <div style={textStyle as React.CSSProperties}>
                {props.turn[1]==RESULT.WON? <div style={xColor}></div> : <div style={oColor}></div>}Won 
            </div>
            )
    )
}

export default Turn;