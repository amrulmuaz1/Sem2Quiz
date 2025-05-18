const questions = [
    {
        question: "Which of these is NOT a decision block in MIT App Inventor?",
        answers: [
            { text: "if-then", correct: false },
            { text: "if-then-else", correct: false },
            { text: "when-do", correct: true },
            { text: "if-then-else if", correct: false }
        ]
    },
    //
    {
        question: "In the Wages App example, how is overtime pay calculated?",
        answers: [
            { text: "Regular pay rate for all hours", correct: false },
            { text: "1.5 times regular rate for hours over 40", correct: true },
            { text: "Double pay for weekend hours", correct: false },
            { text: "Base pay plus 10% bonus", correct: false }
        ]
    },
    //
    {
        question: "What does the logical AND operator do?",
        answers: [
            { text: "Returns true if either expression is true", correct: false },
            { text: "Returns true only if both expressions are true", correct: true },
            { text: "Reverses the truth of an expression", correct: false },
            { text: "Connects mathematical operations", correct: false }
        ]
    },
    //
    {
        question: "In the Range Checker App, what message appears if a number is outside 1-100?",
        answers: [
            { text: "Try Again", correct: false },
            { text: "Pass!", correct: false },
            { text: "Fail!", correct: true },
            { text: "Invalid", correct: false }
        ]
    },
    //
    {
        question: "What is the purpose of nested decision blocks?",
        answers: [
            { text: "To test multiple conditions sequentially", correct: true },
            { text: "To create random numbers", correct: false },
            { text: "To simplify Boolean expressions", correct: false },
            { text: "To handle user interface events", correct: false }
        ]
    },
    //
    {
        question: "In the Count Down App, what happens when n reaches zero?",
        answers: [
            { text: "The background turns red and Sound2 plays", correct: true },
            { text: "The app resets automatically", correct: false },
            { text: "A new random number is generated", correct: false },
            { text: "The clock speed doubles", correct: false }
        ]
    },
    //
    {
        question: "How is age calculated in the Age Verification App when birthday hasn't occurred yet this year?",
        answers: [
            { text: "current year - birth year", correct: false },
            { text: "current year - birth year - 1", correct: true },
            { text: "birth year - current year", correct: false },
            { text: "(current month - birth month) * 12", correct: false }
        ]
    },
    //
    {
        question: "What is the purpose of the 'random set seed' function?",
        answers: [
            { text: "To generate unpredictable random sequences", correct: false },
            { text: "To create the same random sequence for testing", correct: true },
            { text: "To limit the range of random numbers", correct: false },
            { text: "To improve security encryption", correct: false }
        ]
    },
    //
    {
        question: "In the Quiz App, what happens when a user selects a correct answer?",
        answers: [
            { text: "Score updates and next question appears", correct: true },
            { text: "Timer resets", correct: false },
            { text: "All buttons disable", correct: false },
            { text: "Background color changes", correct: false }
        ]
    },
    //
    {
        question: "Which component would you use to verify a user's age from their birth date?",
        answers: [
            { text: "ListPicker", correct: false },
            { text: "TextBox", correct: false },
            { text: "DatePicker", correct: true },
            { text: "CheckBox", correct: false }
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