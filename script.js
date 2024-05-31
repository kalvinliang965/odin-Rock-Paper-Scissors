console.log("Hello WOrld");


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

    const input = prompt("Enter your choice" + 
    "(e.g rock/paper/scissor)").toString().toLowerCase();
    
    if (input != "rock" && input != "paper" && input != "scissor") {
        throw new Error("Invalid input: You should enter either rock, paper, or scissor!");
    }

    return input;
}

function playGame() { 

    let humanScore = 0;
    let computerScore = 0;

    function playRound(humanChoice, computerChoice) {
        
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

    let result;
    let i = 0;
    while (i < 5) {
        try {

            result = playRound(getHumanChoice(), getComputerChoice());

            if (result === 0) {
                computerScore++;
            } else if (result === 1) {
                humanScore++;
            }

            i++;
        } catch (e) {
            console.log(e.message);
            // console.log(e.stack);
        }
    }

    console.log(`You: ${humanScore}, computer: ${computerScore}`);
    if (humanScore === computerScore) {
        console.log("Tied!");
    } else if (humanScore > computerScore) {
        console.log("You won!");
    } else {
        console.log("You lose!");
    }
}