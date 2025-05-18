const questions = [
    {
        question: "What is the correct PHP function to open a file?",
        answers: [
            { text: "file_open()", correct: false },
            { text: "open_file()", correct: false },
            { text: "fopen()", correct: true },
            { text: "readfile()", correct: false }
        ]
    },
    {
        question: "Which PHP function is used to read from an open file?",
        answers: [
            { text: "fread()", correct: true },
            { text: "file_get()", correct: false },
            { text: "readfile()", correct: false },
            { text: "get_contents()", correct: false }
        ]
    },
    {
        question: "What is the purpose of the fclose() function in PHP?",
        answers: [
            { text: "To delete a file", correct: false },
            { text: "To safely close an open file and free resources", correct: true },
            { text: "To clear the contents of a file", correct: false },
            { text: "To check if a file exists", correct: false }
        ]
    },
    {
        question: "Which PHP function checks if the end of a file has been reached?",
        answers: [
            { text: "file_end()", correct: false },
            { text: "end_file()", correct: false },
            { text: "feof()", correct: true },
            { text: "check_eof()", correct: false }
        ]
    },
    {
        question: "What does the 'w' mode indicate when opening a file with fopen()?",
        answers: [
            { text: "Open for reading only", correct: false },
            { text: "Open for writing only (erases existing content)", correct: true },
            { text: "Open for reading and writing", correct: false },
            { text: "Open for appending only", correct: false }
        ]
    },
    {
        question: "Which PHP function is used to write to an open file?",
        answers: [
            { text: "file_put()", correct: false },
            { text: "fwrite()", correct: true },
            { text: "write_file()", correct: false },
            { text: "put_contents()", correct: false }
        ]
    },
    {
        question: "What is the purpose of PHP's set_error_handler() function?",
        answers: [
            { text: "To define a custom function for handling errors", correct: true },
            { text: "To turn off all error reporting", correct: false },
            { text: "To log errors to a database", correct: false },
            { text: "To convert errors to exceptions", correct: false }
        ]
    },
    {
        question: "Which PHP function is used to log error messages to a file or email?",
        answers: [
            { text: "log_error()", correct: false },
            { text: "error_log()", correct: true },
            { text: "send_error()", correct: false },
            { text: "record_error()", correct: false }
        ]
    },
    {
        question: "What is the purpose of the try-catch block in PHP?",
        answers: [
            { text: "To handle exceptions and continue script execution", correct: true },
            { text: "To prevent all errors from occurring", correct: false },
            { text: "To automatically log all errors", correct: false },
            { text: "To terminate script execution on any error", correct: false }
        ]
    },
    {
        question: "Which of these is NOT a valid PHP error level?",
        answers: [
            { text: "E_NOTICE", correct: false },
            { text: "E_WARNING", correct: false },
            { text: "E_ERROR", correct: false },
            { text: "E_CRITICAL", correct: true }
        ]
    }
];

// Rest of your existing JavaScript code remains the same...
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