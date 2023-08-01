import { WINNER_COMBOS } from "../constants"
export const checkWinnerFrom = (boardToCheck)=>{
    // revisa todas las combinaciones ganadoras
    // para ver si ganó X u O
    for (const combo of WINNER_COMBOS) {
      const [a,b,c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    return null
}

export const checkEndGame = (newBoard)=>{
  // Revisa si ya no hay espacios vacíos en el tablero
  return newBoard.every((square)=> square !==null)
}