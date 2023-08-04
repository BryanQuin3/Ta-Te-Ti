import { useState } from 'react'
import { TURNS } from './constants'
import { checkWinnerFrom,checkEndGame } from './logic/board'
import { saveGameToStorage,resetGameToStorage } from './logic/storage'
import { WinnerModal } from './components/WinnerModal'
import {TurnIndicator} from './components/TurnIndicator'
import { Header } from'./components/Header'
import { GameBoard } from './components/GameBoard'
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
    <main className='hero'>
      <img className='person' src="Main.png" alt="squid game soldier" />
      <Header resetGame={resetGame} />
      <article className='container'>
        <section className='board'>
          <GameBoard board={board} updateBoard={updateBoard} />
          <WinnerModal resetGame={resetGame} winner={winner} />
        </section>
        <TurnIndicator turn={turn} />
      </article>
    </main>
  );
}

export default App
