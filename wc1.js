const questions = [
    {
        question: "What is the Internet?",
        answers: [
            { text: "A single global computer network", correct: false },
            { text: "A global network of interconnected computer networks", correct: true },
            { text: "A collection of web pages", correct: false },
            { text: "A type of web browser", correct: false }
        ]
    },
    {
        question: "What does HTTP stand for?",
        answers: [
            { text: "HyperText Transfer Protocol", correct: true },
            { text: "High Transfer Text Protocol", correct: false },
            { text: "Hyper Transfer Text Protocol", correct: false },
            { text: "Hyperlink Transfer Protocol", correct: false }
        ]
    },
    {
        question: "What is the primary function of FTP?",
        answers: [
            { text: "Sending emails", correct: false },
            { text: "Transferring files between machines", correct: true },
            { text: "Displaying web pages", correct: false },
            { text: "Encrypting data", correct: false }
        ]
    },
    {
        question: "Which of the following is an example of a server-side scripting language?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: false },
            { text: "PHP", correct: true },
            { text: "JavaScript", correct: false }
        ]
    },
    {
        question: "What is the difference between the Internet and the World Wide Web?",
        answers: [
            { text: "The Internet is an information space, while the Web is a network of networks", correct: false },
            { text: "The Internet is a network of networks, while the Web is an information space", correct: true },
            { text: "They are the same thing", correct: false },
            { text: "The Internet is for emails, while the Web is for browsing", correct: false }
        ]
    },
    {
        question: "Which organization develops open standards for the Web?",
        answers: [
            { text: "ISO", correct: false },
            { text: "IEEE", correct: false },
            { text: "W3C", correct: true },
            { text: "IETF", correct: false }
        ]
    },
    {
        question: "What is the role of a client in client-server architecture?",
        answers: [
            { text: "To host websites", correct: false },
            { text: "To request services from a server", correct: true },
            { text: "To store databases", correct: false },
            { text: "To manage network protocols", correct: false }
        ]
    },
    {
        question: "Which of the following is NOT a cloud computing application?",
        answers: [
            { text: "Gmail", correct: false },
            { text: "Netflix", correct: false },
            { text: "Adobe Creative Cloud", correct: false },
            { text: "Microsoft Word (offline version)", correct: true }
        ]
    },
    {
        question: "What is the purpose of a markup validation tool?",
        answers: [
            { text: "To check for spelling errors", correct: false },
            { text: "To validate the structure of HTML code", correct: true },
            { text: "To test server performance", correct: false },
            { text: "To encrypt data", correct: false }
        ]
    },
    {
        question: "What does 'netiquette' refer to?",
        answers: [
            { text: "A type of computer virus", correct: false },
            { text: "The rules of good behavior on the Internet", correct: true },
            { text: "A network protocol", correct: false },
            { text: "A web development framework", correct: false }
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