import { useState } from "react";
import Board from "./Board";
import { difference } from "lodash";
const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
const isWon = (board) => {
    for (let i = 0; i < winPattern.length; i++) {
        let [a, b, c] = winPattern[i];
        if (board[a] && board[a] === board[b] & board[b] === board[c]) {
            return true
        }
    }
    return false

}

const isDraw = (board) => {
    return board.filter(box => !box).length === 0;
}

function Game() {

    const handleRefesh = () => {
        setBoard(Array(9).fill(""));
        setIsGameStopped(false)
        setMessage('Click to start')


    }
    const [board, setBoard] = useState(Array(9).fill(""));
    const [isGameStopped, setIsGameStopped] = useState(false)
    const [message, setMessage] = useState("Tic Tac Toe")

    const player = {
        human: "X",
        computer: "O"
    }
    const handleClick = (pos) => {
        if (isGameStopped) {
            return
        }
        if (board[pos]) {
            return;
        }

        const boardCopy = [...board]
        boardCopy[pos] = player.human;
        setBoard(boardCopy);
        //check win and draw condition
        if (isWon(boardCopy)) {
            setMessage(`Won ${player.human}`)
            setIsGameStopped(true)
            return
        }

        if (isDraw(boardCopy)) {
            setMessage("DRAW")
            setIsGameStopped(true)
            return
        }

        //ComputerMove
        setTimeout(() => {
            const computerIndex = determineComputerMove(boardCopy, player)
            const boardCopy2 = [...boardCopy]
            boardCopy2[computerIndex] = player.computer;
            setBoard(boardCopy2);

            if (isWon(boardCopy2)) {
                setMessage(`Won ${player.computer}`)
                setIsGameStopped(true)
                return
            }

            if (isDraw(boardCopy)) {
                setIsGameStopped(true)
                return
            }

        }, 500);



    }
    const styleTitle = {
        display: "flex",
        justifyContent: "center",
        height: "100px",
        alignItems: "center"
    }


    return (
        <>
            <h1 style={styleTitle}><span style={{ backgroundColor: "#d5a5a5", minHeight: "80px", minWidth: "300px", textAlign: "center", marginBottom: "20px", borderRadius: "8px", lineHeight: "80px" }}>{message}</span> </h1>
            <Board value={board} onClick={handleClick} />
            <button style={{ display: "flex", height: "38px", borderRadius: "5px", margin: "50px auto", alignItems: "center", cursor: "pointer", backgroundColor: "rgb(195 174 174)" }} onClick={handleRefesh}>Refresh Game</button>
        </>
    );
}

export default Game;


function determineComputerMove(board, player) {
    const computerMoves = [];
    const humanMoves = [];
    board.forEach((box, index) => {
        if (box === player.computer) {
            computerMoves.push(index)
        }
        if (box === player.human) {
            humanMoves.push(index)
        }
    });
    // if can win , then win
    for (let pattern of winPattern) {
        const winPositions = difference(pattern, computerMoves)
        if (winPositions.length === 1) {
            const winPos = board[winPositions[0]]
            if (!winPos) {
                return winPositions[0]
            }
        }

    }
    //if cannot win, then block
    for (let pattern of winPattern) {
        const winPositions = difference(pattern, humanMoves)
        if (winPositions.length === 1) {
            const winPos = board[winPositions[0]]
            if (!winPos) {
                return winPositions[0]
            }
        }

    }


    //if cannot block, tack the middle
    const centerSqure = 4
    if (!board[centerSqure]) {
        return centerSqure;

    }

    //if cannot take the middle random

    let randomPosition = getRandomInt(0, 9)
    while (board[randomPosition]) {
        randomPosition = getRandomInt(0, 9)
    }
    return randomPosition
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min) + min)

}