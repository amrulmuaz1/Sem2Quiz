const questions = [
    {
        question: "What is the primary purpose of CSS?",
        answers: [
            { text: "To add interactivity to web pages", correct: false },
            { text: "To define the structure of web pages", correct: false },
            { text: "To style and present HTML documents", correct: true },
            { text: "To store data for web applications", correct: false }
        ]
    },
    {
        question: "Which CSS property is used to change the background color of an element?",
        answers: [
            { text: "color", correct: false },
            { text: "background-color", correct: true },
            { text: "bgcolor", correct: false },
            { text: "background-image", correct: false }
        ]
    },
    {
        question: "What is the correct way to link an external CSS file to an HTML document?",
        answers: [
            { text: '<style src="styles.css">', correct: false },
            { text: '<link rel="stylesheet" href="styles.css">', correct: true },
            { text: '<css>styles.css</css>', correct: false },
            { text: '<import css="styles.css">', correct: false }
        ]
    },
    {
        question: "Which CSS selector targets all paragraph elements with class='intro'?",
        answers: [
            { text: "p.intro", correct: true },
            { text: ".p.intro", correct: false },
            { text: "#intro p", correct: false },
            { text: "p > .intro", correct: false }
        ]
    },
    {
        question: "What CSS property would you use to create rounded corners on an element?",
        answers: [
            { text: "border-style", correct: false },
            { text: "corner-radius", correct: false },
            { text: "border-radius", correct: true },
            { text: "round-corner", correct: false }
        ]
    },
    {
        question: "Which of these is NOT a valid method for including CSS in an HTML document?",
        answers: [
            { text: "Inline styles using the style attribute", correct: false },
            { text: "Embedded styles in the <head> section", correct: false },
            { text: "External CSS files linked with <link>", correct: false },
            { text: "CSS rules in the <body> section", correct: true }
        ]
    },
    {
        question: "What is the purpose of the :hover pseudo-class in CSS?",
        answers: [
            { text: "To style visited links", correct: false },
            { text: "To style elements when the mouse is over them", correct: true },
            { text: "To style form elements that have focus", correct: false },
            { text: "To style elements that are active", correct: false }
        ]
    },
    {
        question: "Which CSS property controls the space between the content of an element and its border?",
        answers: [
            { text: "margin", correct: false },
            { text: "spacing", correct: false },
            { text: "padding", correct: true },
            { text: "border-spacing", correct: false }
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Computer Style Sheets", correct: false },
            { text: "Creative Style Sheets", correct: false },
            { text: "Cascading Style Sheets", correct: true },
            { text: "Colorful Style Sheets", correct: false }
        ]
    },
    {
        question: "Which CSS property would you use to change the font of an element?",
        answers: [
            { text: "font-family", correct: true },
            { text: "text-font", correct: false },
            { text: "font-style", correct: false },
            { text: "font-type", correct: false }
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