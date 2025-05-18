const questions = [
    {
        question: "What is computational action?",
        answers: [
            { text: "A programming language for mobile apps", correct: false },
            { text: "The process of designing and creating solutions to real-world problems", correct: true },
            { text: "A method for optimizing computer algorithms", correct: false },
            { text: "A type of computer hardware architecture", correct: false }
        ]
    },
    {
        question: "Which of these is NOT part of the computational action process?",
        answers: [
            { text: "Problem finding", correct: false },
            { text: "User research", correct: false },
            { text: "Ethical design & prototyping", correct: false },
            { text: "Data mining", correct: true }
        ]
    },
    {
        question: "What is the first stage in the design thinking process?",
        answers: [
            { text: "Prototype", correct: false },
            { text: "Empathize", correct: true },
            { text: "Define", correct: false },
            { text: "Ideate", correct: false }
        ]
    },
    {
        question: "What is the purpose of user research in computational action?",
        answers: [
            { text: "To understand what users need by studying their problems", correct: true },
            { text: "To ask users exactly what features they want in the app", correct: false },
            { text: "To collect as much personal data as possible", correct: false },
            { text: "To test the final product before launch", correct: false }
        ]
    },
    {
        question: "Which tool is recommended for virtual post-it brainstorming?",
        answers: [
            { text: "Microsoft Word", correct: false },
            { text: "Google Jamboard", correct: true },
            { text: "Adobe Photoshop", correct: false },
            { text: "AutoCAD", correct: false }
        ]
    },
    {
        question: "What is an ethical matrix used for in computational action?",
        answers: [
            { text: "To evaluate how different stakeholders are affected by design values", correct: true },
            { text: "To create complex mathematical models", correct: false },
            { text: "To organize code in a programming project", correct: false },
            { text: "To measure app performance metrics", correct: false }
        ]
    },
    {
        question: "Which of these is a recommended tool for wireframing?",
        answers: [
            { text: "Balsamiq", correct: false },
            { text: "Marvel App", correct: false },
            { text: "App Inventor", correct: false },
            { text: "All of the above", correct: true }
        ]
    },
    {
        question: "What does KPI stand for?",
        answers: [
            { text: "Key Product Indicator", correct: false },
            { text: "Key Performance Indicator", correct: true },
            { text: "Key Process Integration", correct: false },
            { text: "Key Programming Interface", correct: false }
        ]
    },
    {
        question: "Which task management tool is recommended for team projects?",
        answers: [
            { text: "Trello", correct: true },
            { text: "Microsoft Paint", correct: false },
            { text: "Adobe Illustrator", correct: false },
            { text: "Windows Calculator", correct: false }
        ]
    },
    {
        question: "What is the 'North Star' in product development?",
        answers: [
            { text: "The most important success metric that aligns with your vision", correct: true },
            { text: "A navigation feature in mobile apps", correct: false },
            { text: "The name of a popular app development framework", correct: false },
            { text: "A type of user interface design", correct: false }
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