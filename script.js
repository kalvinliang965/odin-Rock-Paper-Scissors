


main();


function main() {
    const numRound = parseInt(window.prompt(
        "Welcome to my rock paper scissor game! " +
        "You will have three option: Rock, paper, Scissor, where " +
        "Rock > scissor, paper > rock, and scissor > paper. " +
        "You will Score one point if you win around, and no point if " +
        "lose or tie. Now enter number of round you want to play: ", 5
    ));

    document.querySelector("#again-button").addEventListener("click",
        () => {location.reload();}
    )

    if (numRound > 0) {
        console.log("valid input");
        playGame(numRound);
        return;
    }

    alert("Invalid inputer: must enter a number greater than 0");
    location.reload();
    return;
}


function getComputerChoice() {

    // let 0 be rock, 1 be papper, 2 be scissor

    let value = Math.floor(Math.random() * 3);

    switch (value) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissor";
        default:
            throw new Error("Error in using Math.random");
    }
}


function getHumanChoice() {

    return new Promise((resolve) => {
        const rockButton = document.querySelector(".option #rock");
        const paperButton = document.querySelector("#paper");
        const scissorButton = document.querySelector("#scissor");
        function rock_handler() {
            resolve("rock");
            cleanup();
        }
        function paper_handler() {
            resolve("paper");
            cleanup();
        }
        function scissor_handler() {
            resolve("scissor");
            cleanup();
        }
        function cleanup() {
            rockButton.removeEventListener("click", rock_handler);
            paperButton.removeEventListener("click", paper_handler);
            scissorButton.removeEventListener("click", scissor_handler);
        }
        rockButton.addEventListener("click", rock_handler);
        paperButton.addEventListener("click", paper_handler);
        scissorButton.addEventListener("click", scissor_handler);
    }
    )
}



function playRound(humanChoice, computerChoice) {
      
    let userImg = document.querySelector(".user-choice");
    let computerImg = document.querySelector(".computer-choice");

    userImg.setAttribute("src",`./images/${humanChoice}.png`);
    computerImg.setAttribute("src",`./images/${computerChoice}.png`);

    if (humanChoice === computerChoice) {
        console.log("Tied!");
        return -1;
    } 

    else if ((humanChoice === "rock" && computerChoice === "paper")
            || (humanChoice === "paper" && computerChoice === "scissor")
            || (humanChoice === "scissor" && computerChoice === "rock")) {

        console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
        return 0;
    }

    else {
        console.log(`You won! ${humanChoice} beats ${computerChoice}`);
        return 1;
    }
}


function record(history, humanChoice, computerChoice, status, numberOfRound) {
    const subheader = document.createElement("h4");
    subheader.textContent = `Round ${numberOfRound + 1}: ${status}`;

    const text = document.createElement("p");
    text.textContent = `You: ${humanChoice}, Computer: ${computerChoice}`; 
    
    history.appendChild(subheader);
    history.appendChild(text);
} 

async function playGame(numRound) { 

    const history = document.querySelector("div.history");
    const player_Score = document.querySelector("#player-score");
    const computer_Score = document.querySelector("#computer-score");

    let humanScore = 0;
    let computerScore = 0;
    let result;
    let i = 0;
    let humanChoice = "";
    let computerChoice = "";

    while (i < numRound) {
        try {
            computerChoice = getComputerChoice();
            humanChoice = await getHumanChoice();
            console.log(`user enter ${humanChoice}`);
            result = playRound(humanChoice, computerChoice, i);
            // computer won
            if (result === 0) {
                record(history, humanChoice, computerChoice, "LOSE", i);
                computerScore++;
                computer_Score.innerHTML = computerScore;
            } 
            // user won
            else if (result === 1) {
                record(history, humanChoice, computerChoice, "WON", i);
                humanScore++;
                player_Score.innerHTML = humanScore;
            }
            // tie
            else {
                record(history, humanChoice, computerChoice, "TIED", i);
            }
            i++;
        } catch (e) {
            alert(e.message);
        }
    }

    const subheader = document.createElement("h4")
    
    console.log(`You: ${humanScore}, computer: ${computerScore}`);
    if (humanScore === computerScore) {
        console.log("Tied!");
        subheader.textContent = "GAME OVER: TIED";
    } else if (humanScore > computerScore) {
        console.log("You won!");
        subheader.textContent = "GAME OVER: YOU WON!!!";
    } else {
        console.log("You lose!");
        subheader.textContent = "GAME OVER: YOU LOSE!!!";
    }

    const text = document.createElement("p");
    text.textContent = "Refresh the page to play again";

    history.appendChild(subheader);
    history.appendChild(text);
    


}