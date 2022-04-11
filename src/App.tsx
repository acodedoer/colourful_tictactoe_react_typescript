import React, {useCallback, useEffect,useReducer,useState} from 'react';
import Board from './Board';
import Header from './Header';
import Footer from './Footer';

const appStyle = {
  width:"100vw",
  height:"100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems:"center"
}

interface statObject {
  [W:string]: number, //index of type string returns number, W is a placeholder for string
}

const getStats = ():statObject=> {
  const stats:any = localStorage.getItem("tictactoestats");
  if (stats === null){
    localStorage.setItem("tictactoestats",JSON.stringify({'W':0, 'L':0, 'D':0}));
    return {W:0, L:0, D:0};
  }
  else{
    const statsObj = JSON.parse(stats);
    return statsObj;
  }
}

const o:string = "o";
const x:string = "x";

export enum RESULT {UNKNOWN, WON, LOST, DRAW};

type game = {
  turn:string,
  board: Array<string>,
  playCount:number,
  result: RESULT
}
const initialGame:game = {
  turn:x,
  board:["","","","","","","","",""],
  playCount:0,
  result: RESULT.UNKNOWN
}

const gameReducer = (oldGame:game,action:any):game => ({...oldGame,...action});

function App() {
  const [stats, setStats] = useState(()=>getStats());
  const [game, setGame] = useReducer(gameReducer,JSON.parse(JSON.stringify(initialGame)));  
  
  console.log("Rendered")
  const restartGame = () => {
    setGame(JSON.parse(JSON.stringify(initialGame)));
  }
  
  const playTurn =  useCallback((space: number) =>{
    const gameBoard = game.board;
    gameBoard[space] = game.turn;
    setGame({turn: game.turn===o?x:o,board:gameBoard,playCount:game.playCount+1});
    
    const checkBoard = () => {
      const winningSets = [[0,1,2], [3,4,5], [6,7,8],[0,3,6], [1,4,7], [2,5,8],[0,4,8], [2,4,6]];
      for(let i = 0; i<winningSets.length; i++){
        if(game.board[winningSets[i][0]] =="" || game.board[winningSets[i][1]] =="" || game.board[winningSets[i][2]] =="" ) continue;
        else if (game.board[winningSets[i][0]] == game.board[winningSets[i][1]] && 
                game.board[winningSets[i][1]]== game.board[winningSets[i][2]]) return [true,game.board[winningSets[i][0]]];
      }
      return [false,null];
    }
    const checkWin = () => {
      if(game.playCount>4){
        const check = checkBoard();
        let result = RESULT.UNKNOWN;
        if(check[0]){
          if(check[1]===x){
            updateStats("W");
            result = RESULT.WON;
          }
          else{
            updateStats("L");
            result = RESULT.LOST;
          }
          setGame({result});
          return true;
        }
        else if(game.playCount>=8){
          updateStats("D");
          setGame({result:RESULT.DRAW});
          return true;
        }
      }
      return false;
    }
    const updateStats = ( key:string ) => {
      const newStat:statObject = {...stats, [key]:stats[key]+1}
      setStats(newStat);
      localStorage.setItem("tictactoestats",JSON.stringify(newStat))
    }
    checkWin()
  },[game.board, game.playCount, game.turn,stats]);
  
  useEffect(()=> {
     if(game.turn===o && game.result===RESULT.UNKNOWN){
      let valid = false;
      while (!valid){
        let box = Math.floor(Math.random()*10);
        if(game.board[box]===""){
          valid = true;
          setTimeout(()=>playTurn(box),Math.random()* 1000);
          break
        }
      }
    }
  },[game.board, game.result, game.turn, playTurn])
  return (
    <div style={appStyle as React.CSSProperties} className="App">
      <Header stats={stats} turn = {[game.turn, game.result]}/>
      <Board board={game.board} setSpace={playTurn} canPlay={game.turn===x && game.result===RESULT.UNKNOWN}/>
      <Footer visibility={game.result===RESULT.UNKNOWN} replay={restartGame}/>
    </div>
  );
}

export default App;
