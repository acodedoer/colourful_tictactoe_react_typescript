import Space from './Space';

const rowStyle = {
    display:"flex",
    flexWrap: "wrap",
    width:"36vw",
    height:"36vw"
}

const Board:React.FC<any> = ({board, setSpace, canPlay}) => {
    const playTurn = (key:number) => {
        if(canPlay){
            setSpace(key);
        }
        
    }
    return(
        <div style={rowStyle as React.CSSProperties}>
            {
                board.map((space:any, key:any)=>( 
                    <Space key={key} onClick ={()=>canPlay?playTurn(key):null} content={space}/>
                ))
            }
        </div>  
    )
}

export default Board;