import React, {useState} from 'react';
import logo from './logo.svg';
import Board from './Board';
import Header from './Header';
import Footer from './Footer';
import './App.css';
import Stats from './Stats';

const appStyle = {
  width:"100vw",
  height:"100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems:"center"
}

interface Stats {
  [w:string]: number,
  [d:string]:number,
  [l:string]: number
}
const getStats = ():Stats=> {
  const w = localStorage.getItem("tictactoestats_w");
  const d = localStorage.getItem("tictactoestats_d");
  const l = localStorage.getItem("tictactoestats_l");
  if (w === null || d === null || l === null){
    localStorage.setItem("tictactoestats_w","0");
    localStorage.setItem("tictactoestats_d","0");
    localStorage.setItem("tictactoestats_l","0");
    return {w:0, d:0, l:0};
  }
  else{
    const stats = {w:parseInt(w), d:parseInt(d), l:parseInt(l)}
    return stats;
  }
}

export enum RESULT {UNKNOWN, WON, LOST, DRAW};
const stats = getStats();

const initialState = {
  score:0,
  turn:"x",
  game:["","","","","","","","",""],
  count:0,
  stats:getStats,
  isPlaying:true,
}


type State = Readonly<typeof initialState>;

function App() {
  const [state, setState] = useState(initialState);
  const [result, setResult] = useState(RESULT.UNKNOWN);
  const nextTurn = () => {
    setState({score:state.score, turn: state.turn=="o"?"x":"o", game:state.game, count:state.count+1, stats: state.stats, isPlaying:true});
  }

  const checkWin = () => {
    const winningSets = [[0,1,2], [3,4,5], [6,7,8],[0,3,6], [1,4,7], [2,5,8],[0,4,8], [2,4,6]];
    for(let i = 0; i<winningSets.length; i++){
      if(state.game[winningSets[i][0]] =="" || state.game[winningSets[i][1]] =="" || state.game[winningSets[i][2]] =="" ) continue;
      else if (state.game[winningSets[i][0]] == state.game[winningSets[i][1]] && state.game[winningSets[i][1]]== state.game[winningSets[i][2]]) {
        return [true,state.game[winningSets[i][0]]];
      }
    }
    return [false,null];
  }

  const updateStats = ( key:string ) => {
    const oldStat = state.stats();
    oldStat[key]+=1;
    const localStorageKey = "tictactoestats_"+key;
    localStorage.setItem(localStorageKey,String(oldStat[key]))
    console.log(state.stats()) 
  }
  const restartGame = () => {
    const emptyState = {
      score:0,
      turn:"x",
      game:["","","","","","","","",""],
      count:0,
      isPlaying:true
    }
    setState({score:emptyState.score, turn: emptyState.turn, game:emptyState.game, count:emptyState.count, stats:getStats, isPlaying: emptyState.isPlaying});
    setResult(RESULT.UNKNOWN)
  }

  const setSpace = (space:number) => {

    const newGame = state.game;
    newGame[space] = state.turn;
    const check = checkWin();
    if(check[0]){
      if(check[1] == "x") {updateStats("w");setResult(RESULT.WON)}
      else if (check[1] == "o") {updateStats("l");setResult(RESULT.LOST)}
      setState({score:state.score, turn: state.turn, game:state.game, count:state.count, stats:getStats, isPlaying: false});
    }
    else if(state.count>=8){
      updateStats("d");
      setResult(RESULT.DRAW)
      setState({score:state.score, turn: state.turn, game:state.game, count:state.count, stats:getStats, isPlaying: false});
    }
    else{
      nextTurn();
    }
  }

  return (
    <div style={appStyle as React.CSSProperties} className="App">
      <Header stats={state.stats} turn = {[state.turn, result]}/>
      <Board gameState={state} nextTurn={nextTurn} setSpace={setSpace}/>
      <Footer visibility={state.isPlaying} replay={restartGame}/>
    </div>
  );
}

export default App;
