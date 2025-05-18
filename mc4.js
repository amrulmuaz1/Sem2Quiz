const questions = [
    {
        question: "Which of the following is NOT a common input component in MIT App Inventor?",
        answers: [
            { text: "TextBox", correct: false },
            { text: "Label", correct: true },
            { text: "Slider", correct: false },
            { text: "ListPicker", correct: false }
        ]
    },
    //
    {
        question: "What type of block would you use to handle a button click event?",
        answers: [
            { text: "A variable block", correct: false },
            { text: "An event handler block", correct: true },
            { text: "A math operation block", correct: false },
            { text: "A list operation block", correct: false }
        ]
    },
    //
    {
        question: "What is the main purpose of variables in App Inventor?",
        answers: [
            { text: "To design the user interface", correct: false },
            { text: "To store and manage data in an app", correct: true },
            { text: "To connect to external devices", correct: false },
            { text: "To format text display", correct: false }
        ]
    },
    //
    {
        question: "Which block would you use to round a number to 2 decimal places?",
        answers: [
            { text: "format as decimal", correct: true },
            { text: "round to nearest", correct: false },
            { text: "number to text", correct: false },
            { text: "math operation", correct: false }
        ]
    },
    //
    {
        question: "What is the key difference between global and local variables?",
        answers: [
            { text: "Global variables can only store numbers", correct: false },
            { text: "Local variables are accessible throughout the app", correct: false },
            { text: "Global variables are accessible everywhere in the app", correct: true },
            { text: "Local variables must start with a capital letter", correct: false }
        ]
    },
    //
    {
        question: "Which component would you use to display calculated results to the user?",
        answers: [
            { text: "TextBox", correct: true },
            { text: "Button", correct: false },
            { text: "Slider", correct: false },
            { text: "ListPicker", correct: false }
        ]
    },
    //
    {
        question: "What is the correct way to initialize a global variable named 'score' to 0?",
        answers: [
            { text: "set global score to 0", correct: false },
            { text: "initialize global score to 0", correct: true },
            { text: "create variable score = 0", correct: false },
            { text: "new global score with 0", correct: false }
        ]
    },
    //
    {
        question: "Which property would you set to ensure a TextBox only accepts numbers?",
        answers: [
            { text: "NumbersOnly", correct: true },
            { text: "InputType", correct: false },
            { text: "NumericInput", correct: false },
            { text: "RestrictToNumbers", correct: false }
        ]
    },
    //
    {
        question: "What happens when you use the 'set variable to' block?",
        answers: [
            { text: "Creates a new variable", correct: false },
            { text: "Displays the variable's value", correct: false },
            { text: "Updates the variable's stored value", correct: true },
            { text: "Deletes the variable", correct: false }
        ]
    },
    //
    {
        question: "In the MPG calculator example, what operation was used to calculate miles per gallon?",
        answers: [
            { text: "Addition", correct: false },
            { text: "Subtraction", correct: false },
            { text: "Multiplication", correct: false },
            { text: "Division", correct: true }
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