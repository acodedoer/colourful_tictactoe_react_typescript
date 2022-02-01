import React, {useState} from 'react';
import logo from './logo.svg';
import Board from './Board';
import Header from './Header';
import Footer from './Footer';
import './App.css';

const appStyle = {
  width:"100vw",
  height:"100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems:"center"
}

const initialState = {
  score:0,
  turn:"x",
  game:["","","","","","","","",""]
}

type State = Readonly<typeof initialState>;

function App() {
  const [state, setState] = useState(initialState);

  const nextTurn = () => {
    setState({score:state.score, turn: state.turn=="o"?"x":"o", game:state.game});
  }

  const checkWin = () => {
    const winningSets = [[0,1,2], [3,4,5], [6,7,8],[0,3,6], [1,4,7], [2,5,8],[0,4,8], [2,4,6]];
    for(let i = 0; i<winningSets.length; i++){
      if(state.game[winningSets[i][0]] =="" || state.game[winningSets[i][1]] =="" || state.game[winningSets[i][2]] =="" ) continue;
      else if (state.game[winningSets[i][0]] == state.game[winningSets[i][1]] && state.game[winningSets[i][1]]== state.game[winningSets[i][2]]) return true;
    }
    return false;
  }

  const restartGame = () => {
    const emptyState = {
      score:0,
      turn:"x",
      game:["","","","","","","","",""]
    }
    setState({score:emptyState.score, turn: emptyState.turn, game:emptyState.game});
    console.log(state);
    console.log(emptyState);
  }

  const setSpace = (space:number) => {

    const newGame = state.game;
    newGame[space] = state.turn;
    if(checkWin()){
      restartGame();
    }
    else{
      nextTurn();
    }
  }

  return (
    <div style={appStyle as React.CSSProperties} className="App">
      <Header/>
      <Board gameState={state} nextTurn={nextTurn} setSpace={setSpace}/>
      <Footer/>
    </div>
  );
}

export default App;
