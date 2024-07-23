const container = document.querySelector(".container");

const game = GameController();
const currentBoard = game.currentGame;
game.markCell(1, 1);
game.markCell(1, 2);

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

    return {
        getBoard: () => board
    }
}

//-----PLAYERS-----
function GameController() {
    const board = makeGameboard();
    const currentGame = board.getBoard();
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
    const playerOne = createPlayer("Emi", "x");
    const playerTwo = createPlayer("Alhe", "o");



    let activePlayer = players[0];
    const getActivePlayer = () => activePlayer;
    const getActiveInput = () => getActivePlayer().input;

    function markCell(row, column){
        const playerInput = getActiveInput();
        if (currentGame[row][column] === "cell") {
            currentGame[row][column] = playerInput;
            console.log(currentGame)
            if (checkWin(currentGame, playerInput) === true) {
                console.log(`winner ${activePlayer.name}`);
            } else if (checkDraw(currentGame) === true) {
                    console.log(`Its a draw!`)
                }
            switchPlayerTurn()
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

    function renderCells(board, container) {
        let i = 1;
        board.forEach(row => {
            row.forEach(cell => {
                const square = document.createElement("button");
                square.classList.add("square");
                square.dataset.key = i;
                container.appendChild(square);
                updateDisplay(square);
                i++;
            });
        });
    };

    const cells = renderCells(currentGame, container);

    function updateDisplay(cell) {
        cell.addEventListener("click", (e) =>{
            const key = e.target.dataset.key;
            const row = Math.floor((key -1) /3);
            const column = (key - 1) % 3;
            game.markCell(row, column)
        })
    }
    
    return {
        markCell,
        currentGame,
        getActivePlayer,
        getActiveInput
    }
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