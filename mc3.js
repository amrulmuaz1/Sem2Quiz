const questions = [
    {
        question: "What are the three main tools that work together in MIT App Inventor?",
        answers: [
            { text: "Designer, Coder, and Debugger", correct: false },
            { text: "Component Designer, Blocks Editor, and Android phone/emulator", correct: true },
            { text: "UI Builder, Logic Editor, and Simulator", correct: false },
            { text: "Layout Designer, Function Editor, and Testing Device", correct: false }
        ]
    },
    //
    {
        question: "What is the default name given to the first screen in an App Inventor project?",
        answers: [
            { text: "MainScreen", correct: false },
            { text: "HomeScreen", correct: false },
            { text: "Screen1", correct: true },
            { text: "DefaultScreen", correct: false }
        ]
    },
    //
    {
        question: "Which property determines how components are horizontally aligned on a screen?",
        answers: [
            { text: "HorizontalAlignment", correct: false },
            { text: "LayoutHorizontal", correct: false },
            { text: "AlignHorizontal", correct: true },
            { text: "ScreenAlignment", correct: false }
        ]
    },
    //
    {
        question: "What type of programming does MIT App Inventor primarily use?",
        answers: [
            { text: "Text-based programming", correct: false },
            { text: "Block-based visual programming", correct: true },
            { text: "Machine code programming", correct: false },
            { text: "Object-oriented programming", correct: false }
        ]
    },
    //
    {
        question: "Which component would you use to display text that cannot be edited by the user?",
        answers: [
            { text: "TextBox", correct: false },
            { text: "Label", correct: true },
            { text: "TextView", correct: false },
            { text: "TextDisplay", correct: false }
        ]
    },
    //
    {
        question: "What happens when you drag a component from the Palette to the Viewer?",
        answers: [
            { text: "It automatically appears in your running app", correct: false },
            { text: "It gets added to your project with a default name", correct: true },
            { text: "It immediately asks you to write code for it", correct: false },
            { text: "It creates a new screen in your project", correct: false }
        ]
    },
    //
    {
        question: "Which of these is NOT a valid setting for a component's Width property?",
        answers: [
            { text: "Fill Parent", correct: false },
            { text: "Automatic", correct: false },
            { text: "Specific pixel value", correct: false },
            { text: "Expand to Fit", correct: true }
        ]
    },
    //
    {
        question: "What is the purpose of the Blocks Editor in MIT App Inventor?",
        answers: [
            { text: "To design the visual layout of the app", correct: false },
            { text: "To define the behavior and logic of components", correct: true },
            { text: "To manage project files and assets", correct: false },
            { text: "To test the app on different devices", correct: false }
        ]
    },
    //
    {
        question: "Which of these is a rule for naming components in App Inventor?",
        answers: [
            { text: "Names must start with a number", correct: false },
            { text: "Names can contain spaces", correct: false },
            { text: "Names can contain only letters, numbers and underscores", correct: true },
            { text: "Names must be at least 5 characters long", correct: false }
        ]
    },
    //
    {
        question: "What type of block would you use to respond to a button click?",
        answers: [
            { text: "A procedure block", correct: false },
            { text: "A variable block", correct: false },
            { text: "An event handler block", correct: true },
            { text: "A math operation block", correct: false }
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