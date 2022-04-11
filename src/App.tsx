import React, {useEffect,useState} from 'react';
import Board from './Board';
import Header from './Header';
import Footer from './Footer';
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
  const stats = localStorage.getItem("tictactoestats");
  console.log("gettin stats")
  if (stats === null){
    localStorage.setItem("tictactoestats",JSON.stringify({'W':0, 'L':0, 'D':0}));
    return {W:0, L:0, D:0};
  }
  else{
    const statsObj = JSON.parse(stats);
    return statsObj;
  }
}

export enum RESULT {UNKNOWN, WON, LOST, DRAW};

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
    const newStat = {...oldStat, [key]:oldStat[`${key}`]+1}
    localStorage.setItem("tictactoestats",JSON.stringify(newStat))
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
      if(check[1] == "x") {updateStats("W");setResult(RESULT.WON)}
      else if (check[1] == "o") {updateStats("L");setResult(RESULT.LOST)}
      console.log("here");
      setState({score:state.score, turn: state.turn, game:state.game, count:state.count, stats:getStats, isPlaying: false});
    }
    else if(state.count>=8){
      updateStats("D");
      setResult(RESULT.DRAW)
      setState({score:state.score, turn: state.turn, game:state.game, count:state.count, stats:getStats, isPlaying: false});
    }
    else{
      nextTurn();
    }
  }

  const autoPlay = () => {
    if(state.turn==="o" && state.isPlaying){
      let valid = false;
      while (!valid){
        let box = Math.floor(Math.random()*10);
        if(state.game[box]===""){
          valid = true;
          setTimeout(()=>setSpace(box),Math.random()* 1000);
          break
        }
      }
    }
  }
  useEffect(()=> {
    autoPlay();
  },[state])
  return (
    <div style={appStyle as React.CSSProperties} className="App">
      <Header stats={state.stats} turn = {[state.turn, result]}/>
      <Board gameState={state} nextTurn={nextTurn} setSpace={setSpace}/>
      <Footer visibility={state.isPlaying} replay={restartGame}/>
    </div>
  );
}

export default App;
