const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [

// horizontal:
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

// vertical:
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

// diagonal:
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["","","","","","","","",""];
let currentPlayer = "X";
let running = false;
let condition ;

initializedGame();

function initializedGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `tour des ${currentPlayer}`;
    running = true;
}

function cellClicked(){
    
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    
    checkWinner();
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `tour des ${currentPlayer}`;


}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            //console.log(condition)
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} gagnent !`;
        //console.log(condition)
        //const cell1 = condition[1]
        //cellPos1 = document.querySelectorAll(cellIndex = cell1);
        //"li[data-active='1']"
       // console.log(cellPos1)
        //var rect = .getBoundingClientRect();
        //console.log(rect.top, rect.right, rect.bottom, rect.left);
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `égalité !`;
        running = false;
    }
    else{
        changePlayer();
    }
}




function restartGame(){
    currentPlayer = 'X';
    options = ["","","","","","","","",""];
    statusText.textContent = `tour des ${currentPlayer}`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}

