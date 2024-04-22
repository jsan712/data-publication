function InvalidString(input){
    return /\d+|\W|\p{P}/gu.test(input);
}
function CheckTriviaAnswer(){
    const correctAnswer = "Paris";
    const userInput = document.getElementById('user-input-trivia').value.trim();
    const responseElement = document.getElementById('trivia-response');
    
    responseElement.innerText = InvalidString(userInput) ? `Please make sure your answer does not have numbers, spaces, or punctuation and try again`
    : isNaN(userInput) && userInput.toLowerCase() === correctAnswer.toLowerCase() ? `Correct! The capital of France is ${userInput}`
    : `Incorrect. The captial of France is not ${userInput}`;
}

function CheckNumberInput(){
    const userInput = document.getElementById("user-input-number").value.trim();
    const num = parseInt(userInput);
    const responseElement = document.getElementById("number-response");

    if (!isNaN(num) && num >= 10000 && num <= 99999) {
        responseElement.innerText = num % 2 === 0 ? `${num} is even` : `${num} is odd`;
    }
    else{
        responseElement.innerText = "Please enter a valid 5 digit number";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const triviaInput = document.getElementById('user-input-trivia');
    triviaInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            CheckTriviaAnswer();
        }
    });

    const numberInput = document.getElementById('user-input-number');
    numberInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            CheckNumberInput();
        }
    });
})

document.getElementById("trivia-submit").addEventListener("click", CheckTriviaAnswer);
document.getElementById("number-submit").addEventListener("click", CheckNumberInput);