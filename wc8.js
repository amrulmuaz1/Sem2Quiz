const questions = [
    {
        question: "What is the primary purpose of input filtering in web security?",
        answers: [
            { text: "To make data look prettier", correct: false },
            { text: "To inspect potentially malicious data before use", correct: true },
            { text: "To encrypt all user input", correct: false },
            { text: "To automatically correct user mistakes", correct: false }
        ]
    },
    {
        question: "Which PHP function helps prevent SQL injection attacks?",
        answers: [
            { text: "mysql_real_escape_string()", correct: true },
            { text: "sql_safe()", correct: false },
            { text: "prevent_injection()", correct: false },
            { text: "clean_input()", correct: false }
        ]
    },
    {
        question: "What is the purpose of the htmlspecialchars() function in PHP?",
        answers: [
            { text: "To convert special characters to HTML entities", correct: true },
            { text: "To validate email addresses", correct: false },
            { text: "To encrypt passwords", correct: false },
            { text: "To format text as HTML", correct: false }
        ]
    },
    {
        question: "Which method is recommended for storing passwords securely in a database?",
        answers: [
            { text: "Using MD5 hashing", correct: false },
            { text: "Storing them in plain text", correct: false },
            { text: "Using password_hash() with bcrypt", correct: true },
            { text: "Encrypting with base64", correct: false }
        ]
    },
    {
        question: "What is session fixation in web security?",
        answers: [
            { text: "When a session lasts too long", correct: false },
            { text: "When an attacker sets a user's session ID", correct: true },
            { text: "When session data becomes corrupted", correct: false },
            { text: "When too many sessions are created", correct: false }
        ]
    },
    {
        question: "Which PHP function should be used to prevent session fixation attacks?",
        answers: [
            { text: "session_fix()", correct: false },
            { text: "session_regenerate_id()", correct: true },
            { text: "session_secure()", correct: false },
            { text: "session_validate()", correct: false }
        ]
    },
    {
        question: "Why is client-side form validation alone insufficient for security?",
        answers: [
            { text: "It's too slow", correct: false },
            { text: "Users can disable JavaScript in their browsers", correct: true },
            { text: "It doesn't work on mobile devices", correct: false },
            { text: "It requires special plugins", correct: false }
        ]
    },
    {
        question: "What is the best practice for storing PHP files on a server?",
        answers: [
            { text: "In the htdocs folder with all other files", correct: false },
            { text: "Outside the web root directory", correct: true },
            { text: "In a separate database", correct: false },
            { text: "On a different server entirely", correct: false }
        ]
    },
    {
        question: "How can you prevent directory listing in web folders?",
        answers: [
            { text: "By creating an index.php file", correct: false },
            { text: "By using Options -Indexes in .htaccess", correct: true },
            { text: "By setting folder permissions to read-only", correct: false },
            { text: "By deleting all files in the folder", correct: false }
        ]
    },
    {
        question: "What is the purpose of the httponly flag when setting cookies?",
        answers: [
            { text: "To make cookies expire faster", correct: false },
            { text: "To prevent cookies from being accessed via JavaScript", correct: true },
            { text: "To encrypt cookie data", correct: false },
            { text: "To make cookies work only on HTTP sites", correct: false }
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