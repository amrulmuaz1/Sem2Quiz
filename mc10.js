const questions = [
    {
        question: "What is the primary purpose of a procedure in MIT App Inventor?",
        answers: [
            { text: "To create new components", correct: false },
            { text: "To group and reuse sequences of blocks", correct: true },
            { text: "To store persistent data", correct: false },
            { text: "To design user interfaces", correct: false }
        ]
    },
    //
    {
        question: "What is another name for a procedure in computer science?",
        answers: [
            { text: "Variable", correct: false },
            { text: "Component", correct: false },
            { text: "Function or method", correct: true },
            { text: "Database", correct: false }
        ]
    },
    //
    {
        question: "How do you add arguments to a procedure in MIT App Inventor?",
        answers: [
            { text: "By using the mutator button (blue plus sign)", correct: true },
            { text: "By creating global variables", correct: false },
            { text: "By nesting if-then blocks", correct: false },
            { text: "By using the Properties panel", correct: false }
        ]
    },
    //
    {
        question: "What is the key difference between 'procedure do' and 'procedure result'?",
        answers: [
            { text: "'procedure do' returns a value while 'procedure result' doesn't", correct: false },
            { text: "'procedure result' returns a value while 'procedure do' doesn't", correct: true },
            { text: "'procedure do' can only be called once", correct: false },
            { text: "There is no difference between them", correct: false }
        ]
    },
    //
    {
        question: "What happens when you create a new procedure in App Inventor?",
        answers: [
            { text: "A call block is automatically generated in the Procedures drawer", correct: true },
            { text: "All variables are reset to zero", correct: false },
            { text: "A new screen is created", correct: false },
            { text: "The procedure is immediately executed", correct: false }
        ]
    },
    //
    {
        question: "In the banana bread recipe analogy, what represents an argument?",
        answers: [
            { text: "The type of flour used", correct: false },
            { text: "The baking temperature", correct: false },
            { text: "The number of loaves being made", correct: true },
            { text: "The mixing bowl", correct: false }
        ]
    },
    //
    {
        question: "Why are procedures particularly useful in programming?",
        answers: [
            { text: "They allow code to be reused and make programs more organized", correct: true },
            { text: "They automatically fix bugs in the code", correct: false },
            { text: "They make the app run faster", correct: false },
            { text: "They create visual components", correct: false }
        ]
    },
    //
    {
        question: "What must be true about procedure names in an App Inventor project?",
        answers: [
            { text: "They must contain numbers", correct: false },
            { text: "They must be the same as component names", correct: false },
            { text: "They must be unique within the same screen", correct: true },
            { text: "They must be at least 10 characters long", correct: false }
        ]
    },
    //
    {
        question: "What happens when you call a 'procedure result' block?",
        answers: [
            { text: "It immediately displays the result on screen", correct: false },
            { text: "It returns a value that can be used by other blocks", correct: true },
            { text: "It creates a new variable", correct: false },
            { text: "It pauses the program execution", correct: false }
        ]
    },
    //
    {
        question: "Which of these is NOT a benefit of using procedures?",
        answers: [
            { text: "Reducing code duplication", correct: false },
            { text: "Making programs easier to debug", correct: false },
            { text: "Improving code organization", correct: false },
            { text: "Automatically increasing app performance", correct: true }
        ]
    }
];

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultsElement = document.getElementById('results');
const scoreElement = document.getElementById('score');
const resultMessageElement = document.getElementById('result-message');

let shuffledQuestions, currentQuestionIndex, score;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    questionContainerElement.classList.remove('hide');
    resultsElement.classList.add('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    } else {
        endGame();
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    
    if (correct) {
        score++;
    }
    
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
    });
    
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        endGame();
    }
    
    // Disable all buttons after selection
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
    });
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function endGame() {
    questionContainerElement.classList.add('hide');
    resultsElement.classList.remove('hide');
    scoreElement.textContent = `${score} out of ${questions.length}`;
    
    const percentage = (score / questions.length) * 100;
    let message;
    if (percentage >= 80) {
        message = "Excellent! You did great!";
    } else if (percentage >= 60) {
        message = "Good job! You passed!";
    } else if (percentage >= 40) {
        message = "Not bad, but you can do better!";
    } else {
        message = "You might want to study more and try again!";
    }
    
    resultMessageElement.textContent = message;
    startButton.innerText = 'Restart Quiz';
    startButton.classList.remove('hide');
}