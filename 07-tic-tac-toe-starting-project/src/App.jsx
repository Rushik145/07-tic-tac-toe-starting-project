import { useState } from "react"
import GameBoard from "../components/GameBoard"
import Player from "../components/player"
import Log from "../components/log";
import {WINNING_COMBINATIONS} from "./winning-combinations";
import GameOver from "../components/GameOver";

const initalGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
];

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X'; 
        if(gameTurns.length> 0  &&  gameTurns[0].player==='X'){
          currentPlayer='O';
        }
          return currentPlayer;
}

function App() {
  const [gameTurns,setGameTurns]=useState([]);
  // const [haswinner,setHasWinner]=useState(false); 
  // const [ActivePlayer,setActivePlayer]=useState('X');
  const ActivePlayer = deriveActivePlayer(gameTurns);

  let gameboard = [...initalGameBoard.map(array => [...array])];
  let winner;
  for(const turn of gameTurns){
      const {square,  player} = turn;
      const {row,col}=square;
      gameboard[row][col]=player;
  }

  for(const combinations of WINNING_COMBINATIONS){
    const firstSquareSymbol=gameboard[combinations[0].row][combinations[0].column];
    const SecondSquareSymbol=gameboard[combinations[1].row][combinations[1].column];
    const ThirdSquareSymbol=gameboard[combinations[2].row][combinations[2].column];

    if(firstSquareSymbol && firstSquareSymbol===SecondSquareSymbol && firstSquareSymbol===ThirdSquareSymbol){
      winner = firstSquareSymbol;
    }
  }
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowindex,colindex){
    // setActivePlayer((CurActivePlayer)=>CurActivePlayer==='X' ? 'O' : 'X');
    // setActivePlayer(ActivePlayer==='O' ? 'X' : 'O');
    setGameTurns(preTurns => {
      const currentPlayer = deriveActivePlayer(preTurns);
 
      // let currentPlayer = 'X';
      //   if(preTurns.length>0  &&  preTurns[0].player==='X');{
      //     currentPlayer='O';
      //   }

      const updateTurns =[ { 
        square: {row: rowindex , col:colindex}, player : ActivePlayer } , 
        ...preTurns];
        return updateTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }
  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player initalName="Player 1" symbol="X" isactive={ActivePlayer==='X'}/>
        <Player initalName="Player 2" symbol="O" isactive={ActivePlayer==='O'}/>
      </ol>
      {(winner|| hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/> }
        <GameBoard onSelectSquere={handleSelectSquare} 
          board={gameboard}
        />
    </div>
    <Log turns={gameTurns}/>
  </main> 
}

export default App
