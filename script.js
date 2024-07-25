const container = document.querySelector(".container");
const body = document.querySelector("body");
const logBox = document.querySelector(".log");




const game = GameController();

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

function getPlayers(players) {
    //maybe put defaults into objects?
    const newButton = document.querySelector(".new-btn");
    const formModal = document.querySelector("#player-form-modal");
    const playerForm = document.querySelector("form");
    const p1name = document.querySelector("#p1-name");
    const p2name = document.querySelector("#p2-name");
    const p1display = document.querySelector("#p1-display");
    const p2display = document.querySelector("#p2-display");
    const p1score = document.querySelector("#p1-score");
    const p2score = document.querySelector("#p2-score");


    newButton.addEventListener("click", () => {
        formModal.classList.add("result-modal")
        formModal.showModal();
    });
    
    playerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const playerOneName = p1name.value;
        const playerTwoName = p2name.value;

        p1display.textContent = playerOneName;
        p2display.textContent = playerTwoName;
        p1score.textContent = `${playerOneName}: `;
        p2score.textContent = `${playerTwoName}: `;
        players[0].name = playerOneName;
        players[1].name = playerTwoName;
        console.log(players);
        resetBoard(playerOneName, playerTwoName);

        formModal.classList.remove("result-modal");
        formModal.close();
    })

    return players;
}


//-----PLAYERS-----
function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
    const newBoard = makeGameboard();
    const players = [
        {name : playerOneName,
        playerInput : "X"
        },
        {name : playerTwoName,
        playerInput : "O"
        }
    ];

    getPlayers(players);

    let activePlayer = players[0];
    let activeInput = "X";

    const getActivePlayer = () => activePlayer;
    const getActiveInput = () => activeInput;
    console.log(activePlayer.name);

    function markCell(row, column){
        const playerInput = getActiveInput();
        const activePlayer = getActivePlayer();
        if (newBoard[row][column] === "cell") {
            newBoard[row][column] = playerInput;
            console.log(newBoard)
            if (checkWin(newBoard, playerInput) === true) {
                endGame(`${activePlayer.name} won!`)
            } else if (checkDraw(newBoard) === true) {
                endGame(`Its a draw!`)
                }
        } else {
            console.log("Select a valid cell")
        }
    }

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        console.log(activePlayer.name);
        activeInput = activeInput === "X" ? "O" : "X";
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
                    cell.classList.add(`${playerInput}`)
                    switchPlayerTurn()
                } 
            })
        });
    }
    
    updateDisplay(cells);

    function endGame(msgBox) {
        const modal = document.createElement("dialog");
        modal.classList.add("result-modal");
        container.appendChild(modal);

        const resultMsg = document.createElement("h1");
        resultMsg.textContent = `${msgBox}`;
        resultMsg.style.color = "white";
        resultMsg.style.fontSize = "clamp(1.7rem, 5vw, 5rem)"
        modal.appendChild(resultMsg);

        const resetBtn = document.createElement("button");
        resetBtn.classList.add("reset-btn");
        resetBtn.textContent = "New round"

        modal.appendChild(resetBtn);
        modal.showModal();
        resetBtn.addEventListener("click", () => {
            resetBoard(playerOneName, playerTwoName);
        })

    }
    
    return {
        markCell,
        getActivePlayer,
        getActiveInput,
        getBoard : () => newBoard,
        renderCells,
        updateDisplay,
        players
    }
}

function resetBoard(playerOneName, playerTwoName) {
    const newGame = GameController(playerOneName, playerTwoName);
    // players = newGame.players;
    const newBoard = makeGameboard();
    container.innerHTML= "";
    const newCells = newGame.renderCells(newBoard, container);
    newGame.updateDisplay(newCells);
}








