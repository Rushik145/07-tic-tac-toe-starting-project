import { useState } from "react"
 


export default function GameBoard({onSelectSquere,board}){
   
    // const [gameboard,setgameboard] = useState(initalGameBoard);

    // function handleSelectSquare(rowindex,colindex){
    //     setgameboard((prevGameBoard)=>{
    //         const updateBoard = [...prevGameBoard.map(innerArry => [...innerArry ])];
    //         updateBoard[rowindex][colindex]= activePlayerSymbol ;
    //         return updateBoard;
    //         });
    //         onSelectSquere();
    // }
    return(
        <ol id="game-board">
          {board.map((row, rowindex)=> <li key={rowindex}>
            <ol>
                {row.map((playerSymbol,colindex)=> 
                <li key={colindex}>
                    <button onClick={()=>onSelectSquere(rowindex,colindex)} disabled={playerSymbol!== null}>{playerSymbol}</button>
                </li>)}
            </ol>
          </li>)}
        </ol> 
    )
}