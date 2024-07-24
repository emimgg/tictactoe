const container = document.querySelector(".container");
const body = document.querySelector("body");

const game = GameController();
// const currentBoard = game.newBoard;
// game.markCell(1, 1);
// game.markCell(1, 2);

function makeGameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i][j] = "cell"; 
        }
    }

    return board;
}

//-----PLAYERS-----
function GameController() {
    const newBoard = makeGameboard();
    const players = [];

    function createPlayer(name = "Player", input) {
        const pushPlayer = () => {
            players.push({name, input});
            }
        pushPlayer();
        return {
            name,
            input,
            getPlayers : () => players
        }
    }

    //-----GAME-----
    const playerOne = createPlayer("Emi", "X");
    const playerTwo = createPlayer("Alhe", "O");



    let activePlayer = players[0];
    const getActivePlayer = () => activePlayer;
    const getActiveInput = () => getActivePlayer().input;

    function markCell(row, column){
        const playerInput = getActiveInput();
        if (newBoard[row][column] === "cell") {
            newBoard[row][column] = playerInput;
            console.log(newBoard)
            if (checkWin(newBoard, playerInput) === true) {
                endGame(`${activePlayer.name} has won!!!`)
            } else if (checkDraw(newBoard) === true) {
                endGame(`Its a draw!`)
                }
        } else {
            console.log("Select a valid cell")
        }
    }

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }


    function checkWin(board, playerInput) {
        const rows = board.length;
        const columns = board[0]. length;

        for (let i = 0; i < rows; i++) {
            
            if (board[i].every(cell => cell === playerInput)) {
                return true;
            }
        }
        for (let j = 0; j < columns; j++) {
            if (board.every(row => row[j] === playerInput)) {
                return true;
            }
        }

        if (board.every((row, index) => row[index] === playerInput)) {
            return true;
        }

        if (board.every((row, index) => row[columns - 1 - index] === playerInput)) {
            return true;
        }

        return false;
    }

    function checkDraw(board) {
        return board.every(row => row.every(cell => cell !== "cell"));
    }

    function renderCells(newBoard, container) {
        let squares = [];
        let i = 1;
        newBoard.forEach(row => {
            row.forEach(cell => {
                const square = document.createElement("button");
                square.classList.add("square");
                square.dataset.key = i;
                container.appendChild(square);
                squares.push(square);
                i++;
            });
        });
        return squares;
    };

    const cells = renderCells(newBoard, container);

    function updateDisplay(cells) {
        cells.forEach(cell => {
            cell.addEventListener("click", (e) =>{
                const playerInput = getActiveInput();
                const key = e.target.dataset.key;
                const row = Math.floor((key -1) /3);
                const column = (key - 1) % 3;
                markCell(row, column);
                if (cell.textContent === "") {
                    cell.textContent = playerInput;
                    switchPlayerTurn()
                } else {
                    const msgBox = document.createElement("p");
                    msgBox.textContent = "Select a valid square!";
                    body.appendChild(msgBox);
                }
            })
        });
    }
    
    updateDisplay(cells);

    function endGame(msgBox) {
        const modal = document.createElement("dialog");
        container.appendChild(modal);

        const resultMsg = document.createElement("h1");
        resultMsg.textContent = `${msgBox}`;
        modal.appendChild(resultMsg);

        const resetBtn = document.createElement("button");
        resetBtn.textContent = "Reset game"

        modal.appendChild(resetBtn);
        modal.showModal();
        resetBtn.addEventListener("click", () => {
            resetBoard();
        })

    }
    
    return {
        markCell,
        getActivePlayer,
        getActiveInput,
        getBoard : () => newBoard,
        renderCells,
        updateDisplay
    }
}

function resetBoard() {
    const newGame = GameController();
    const newBoard = makeGameboard();
    container.innerHTML= "";
    const newCells = newGame.renderCells(newBoard, container);
    newGame.updateDisplay(newCells);
}




// console.log(currentGame);


// console.log(playerOne.name);
// console.log(playerTwo.name);
// console.log(playerTwo.getPlayers());

// round.markCell(1, 1);
// round.markCell(0, 1);
// round.markCell(2, 1);
// round.markCell(0, 0);
// round.markCell(2, 2);
// round.markCell(1,2);
// round.markCell(1,0);
// round.markCell(2,0);