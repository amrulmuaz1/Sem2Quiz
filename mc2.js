const questions = [
    {
        question: "What is the main advantage of no-code platforms for mobile app development?",
        answers: [
            { text: "They require advanced programming skills", correct: false },
            { text: "They are only suitable for large corporations", correct: false },
            { text: "They allow non-technical users to create apps quickly", correct: true },
            { text: "They produce more efficient code than traditional programming", correct: false }
        ]
    },
    //
    {
        question: "What type of programming does MIT App Inventor use?",
        answers: [
            { text: "Text-based programming like Java", correct: false },
            { text: "Block-based visual programming", correct: true },
            { text: "Machine language programming", correct: false },
            { text: "Assembly language programming", correct: false }
        ]
    },
    //
    {
        question: "Who can benefit from using no-code platforms according to the lecture?",
        answers: [
            { text: "Only computer science graduates", correct: false },
            { text: "Only professional software developers", correct: false },
            { text: "Marketing managers, HR staff, and other non-technical employees", correct: true },
            { text: "Only IT department staff", correct: false }
        ]
    },
    //
    {
        question: "What was the original name of MIT App Inventor?",
        answers: [
            { text: "MIT Mobile Creator", correct: false },
            { text: "Google App Inventor", correct: true },
            { text: "Android App Builder", correct: false },
            { text: "Block Programming Studio", correct: false }
        ]
    },
    //
    {
        question: "What is a key benefit of MIT App Inventor's block-based programming?",
        answers: [
            { text: "It eliminates syntax errors", correct: true },
            { text: "It produces faster-running apps", correct: false },
            { text: "It allows more complex algorithms", correct: false },
            { text: "It requires less testing", correct: false }
        ]
    },
    //
    {
        question: "What can you do with apps created in MIT App Inventor?",
        answers: [
            { text: "Only test them on emulators", correct: false },
            { text: "Share them on the MIT App Inventor Gallery", correct: true },
            { text: "Use them only for educational purposes", correct: false },
            { text: "Run them only on iOS devices", correct: false }
        ]
    },
    //
    {
        question: "What is NOT a typical feature of MIT App Inventor mentioned in the lecture?",
        answers: [
            { text: "Drag-and-drop interface", correct: false },
            { text: "Web-based GUI builder", correct: false },
            { text: "Automatic code optimization", correct: true },
            { text: "Live testing on mobile devices", correct: false }
        ]
    },
    //
    {
        question: "What was the example app shown at CES 2018 that used MIT App Inventor?",
        answers: [
            { text: "A weather forecasting app", correct: false },
            { text: "An eBike control system", correct: true },
            { text: "A social media platform", correct: false },
            { text: "A virtual reality game", correct: false }
        ]
    },
    //
    {
        question: "What is the recommended way to test apps while building them in MIT App Inventor?",
        answers: [
            { text: "Using the AI2 Companion App via WiFi", correct: true },
            { text: "Writing unit tests in Java", correct: false },
            { text: "Exporting the app after every change", correct: false },
            { text: "Using only the emulator", correct: false }
        ]
    },
    //
    {
        question: "What does the lecture suggest you will learn beyond coding by using MIT App Inventor?",
        answers: [
            { text: "Only how to make simple apps", correct: false },
            { text: "Design-thinking and problem-solving skills", correct: true },
            { text: "Advanced mathematics concepts", correct: false },
            { text: "Hardware repair skills", correct: false }
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