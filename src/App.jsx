import { useState } from "react";

const App = () => {
    const [currentPlayer, setCurrentPlayer] = useState(false);
    const initialGameState = {
        gameWon: false,
        winner: "",
        winCondition: 0,
    };
    const [gameState, setGameState] = useState(initialGameState);
    const [resetGame, setResetGame] = useState(false);
    const [animationClass, setAnimationClass] = useState(
        "connector no-display"
    );
    const handleClick = (event) => {
        if (!gameState.gameWon) {
            console.log(!gameState.gameWon);
            if (
                event.target.innerHTML === "X" ||
                event.target.innerHTML === "O"
            ) {
                return;
            }
            if (currentPlayer) {
                event.target.innerHTML = "X";
            } else {
                event.target.innerHTML = "O";
            }
            setCurrentPlayer(!currentPlayer);
            const results = checkGame();
            if (results.gameWon) {
                setGameState(results);
                displayWinner(results);
                setResetGame(true);
            }
        } else {
            return;
        }
    };
    const displayWinner = (results) => {
        // eslint-disable-next-line default-case
        switch (results.winCondition) {
            case 1:
                setAnimationClass("connector rotate-up");
                break;
            case 2:
                setAnimationClass("connector rotate");
                break;
            case 3:
                setAnimationClass("connector rotate-down");
                break;
            case 4:
                setAnimationClass("connector move-left");
                break;
            case 5:
                setAnimationClass("connector");
                break;
            case 6:
                setAnimationClass("connector move-right");
                break;
            case 7:
                setAnimationClass("connector rotate-right");
                break;
            case 8:
                setAnimationClass("connector rotate-left");
                break;
        }
    };
    const handleReset = () => {
        setResetGame(false);
        setGameState(initialGameState);
        setAnimationClass("connector no-display");
        const fields = document.querySelectorAll(".tic-tac");
        for (let i = 0; i < fields.length; i++) {
            fields[i].innerHTML = "";
        }
    };
    const checkGame = () => {
        const fields = document.querySelectorAll(".tic-tac");
        let gameWon = false;
        let winner = "";
        let winCondition = 0;
        if (
            fields[0].innerHTML === fields[1].innerHTML &&
            fields[1].innerHTML === fields[2].innerHTML &&
            fields[1].innerHTML !== ""
        ) {
            gameWon = true;
            winner = fields[0].innerHTML;
            winCondition = 1;
        } else if (
            fields[3].innerHTML === fields[4].innerHTML &&
            fields[4].innerHTML === fields[5].innerHTML &&
            fields[3].innerHTML !== ""
        ) {
            gameWon = true;
            winner = fields[3].innerHTML;
            winCondition = 2;
        } else if (
            fields[6].innerHTML === fields[7].innerHTML &&
            fields[7].innerHTML === fields[8].innerHTML &&
            fields[6].innerHTML !== ""
        ) {
            gameWon = true;
            winner = fields[6].innerHTML;
            winCondition = 3;
        } else if (
            fields[0].innerHTML === fields[3].innerHTML &&
            fields[3].innerHTML === fields[6].innerHTML &&
            fields[0].innerHTML !== ""
        ) {
            gameWon = true;
            winner = fields[0].innerHTML;
            winCondition = 4;
        } else if (
            fields[1].innerHTML === fields[4].innerHTML &&
            fields[4].innerHTML === fields[7].innerHTML &&
            fields[1].innerHTML !== ""
        ) {
            gameWon = true;
            winner = fields[1].innerHTML;
            winCondition = 5;
        } else if (
            fields[2].innerHTML === fields[5].innerHTML &&
            fields[5].innerHTML === fields[8].innerHTML &&
            fields[2].innerHTML !== ""
        ) {
            gameWon = true;
            winner = fields[2].innerHTML;
            winCondition = 6;
        } else if (
            fields[0].innerHTML === fields[4].innerHTML &&
            fields[4].innerHTML === fields[8].innerHTML &&
            fields[0].innerHTML !== ""
        ) {
            gameWon = true;
            winner = fields[0].innerHTML;
            winCondition = 7;
        } else if (
            fields[2].innerHTML === fields[4].innerHTML &&
            fields[4].innerHTML === fields[6].innerHTML &&
            fields[2].innerHTML !== ""
        ) {
            gameWon = true;
            winner = fields[2].innerHTML;
            winCondition = 8;
        } else {
            let tied = 0;
            for (let i = 0; i < fields.length; i++) {
                if (fields[i].innerHTML !== "") {
                    tied += 1;
                }
            }
            if (tied === 9) {
                gameWon = true;
            }
        }
        const results = {
            gameWon: gameWon,
            winner: winner,
            winCondition: winCondition,
        };
        return results;
    };
    return (
        <div className="app">
            <div className="current-player">
                {currentPlayer && <h3>Trenutni igrač : X</h3>}
                {!currentPlayer && <h3>Trenutni igrač : O</h3>}
            </div>
            <div className="container">
                <div className={animationClass}></div>
                <div className="row">
                    <div className="tic-tac" onClick={handleClick}></div>
                    <div className="tic-tac" onClick={handleClick}></div>
                    <div className="tic-tac" onClick={handleClick}></div>
                </div>
                <div className="row">
                    <div className="tic-tac" onClick={handleClick}></div>
                    <div className="tic-tac" onClick={handleClick}></div>
                    <div className="tic-tac" onClick={handleClick}></div>
                </div>
                <div className="row">
                    <div className="tic-tac" onClick={handleClick}></div>
                    <div className="tic-tac" onClick={handleClick}></div>
                    <div className="tic-tac" onClick={handleClick}></div>
                </div>
            </div>
            <div className="btn-reset-container">
                {resetGame && (
                    <button className="btn-reset" onClick={handleReset}>
                        Restart the game
                    </button>
                )}
            </div>
        </div>
    );
};

export default App;
