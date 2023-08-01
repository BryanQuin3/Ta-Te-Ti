import { useState } from 'react'
import { Square } from './components/Square'
import { TURNS } from './constants'
import { checkWinnerFrom,checkEndGame } from './logic/board'
import { saveGameToStorage,resetGameToStorage } from './logic/storage'
import { WinnerModal } from './components/WinnerModal'
import confetti from 'canvas-confetti'
import './App.css'



function App() {
  const [board,setBoard] = useState(()=>{
    const boardFromLocalStorage = window.localStorage.getItem('board')
    return boardFromLocalStorage 
      ? JSON.parse(boardFromLocalStorage)
      : Array(9).fill(null)
  })
  const[turn,setTurn] = useState(()=>{
    const turnFromLocalStorage = window.localStorage.getItem('turn')
    return turnFromLocalStorage ?? TURNS.X
  })
  
  const [winner,setWinner] = useState(null)
  
  const resetGame = ()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameToStorage()
  }

  const updateBoard = (index) => {
    // no se actualiza si ya tiene algo
    if(board[index] || winner) return
    const newBoard = [...board]
    // Actualizar tablero
    newBoard[index] = turn
    setBoard(newBoard)
    // Cambiar turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    saveGameToStorage({
      board : newBoard,
      turn : newTurn
    })
    const newWinner = checkWinnerFrom(newBoard);
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }
    else if(checkEndGame(newBoard)){
      // No hubo ganador
      setWinner(false)
    }
  }
  return (
    <main className='board'>
      <h1>Ta-Te-Ti</h1>
      <button onClick={resetGame}>Reset</button>
      <section className='game'>
        {
          board.map((square,index)=>{
            return(
              <Square 
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected = {turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected = {turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerModal 
        resetGame={resetGame}
        winner={winner}
      >
      </WinnerModal>
    </main>
  )
}

export default App
