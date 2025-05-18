const questions = [
    {
        question: "What is the primary purpose of the Canvas component in MIT App Inventor?",
        answers: [
            { text: "To display text input from users", correct: false },
            { text: "To create a touch-sensitive area for drawing and animation", correct: true },
            { text: "To store persistent data", correct: false },
            { text: "To play audio files", correct: false }
        ]
    },
    //
    {
        question: "Where is the (0,0) coordinate located on a Canvas?",
        answers: [
            { text: "Center of the Canvas", correct: false },
            { text: "Bottom-right corner", correct: false },
            { text: "Top-left corner", correct: true },
            { text: "Bottom-left corner", correct: false }
        ]
    },
    //
    {
        question: "What must an ImageSprite be placed on in order to function?",
        answers: [
            { text: "A Button component", correct: false },
            { text: "A Canvas component", correct: true },
            { text: "A ListPicker component", correct: false },
            { text: "Any visible component", correct: false }
        ]
    },
    //
    {
        question: "What event handler would you use to make a sprite move when flung by the user?",
        answers: [
            { text: "Sprite.Click", correct: false },
            { text: "Sprite.Flung", correct: true },
            { text: "Canvas.Touch", correct: false },
            { text: "Clock.Timer", correct: false }
        ]
    },
    //
    {
        question: "How does App Inventor detect collisions between sprites?",
        answers: [
            { text: "By checking for overlapping pixels", correct: false },
            { text: "By comparing sprite colors", correct: false },
            { text: "By checking for intersecting bounding rectangles", correct: true },
            { text: "By measuring distance between sprite centers", correct: false }
        ]
    },
    //
    {
        question: "What property would you change to make a sprite disappear after a collision?",
        answers: [
            { text: "Enabled", correct: false },
            { text: "Visible", correct: true },
            { text: "Opacity", correct: false },
            { text: "BackgroundColor", correct: false }
        ]
    },
    //
    {
        question: "In the Get The Gold app, how are the gold coins moved to random positions?",
        answers: [
            { text: "Using the Sprite.Drag event", correct: false },
            { text: "Using random numbers with Clock.Timer and MoveTo", correct: true },
            { text: "By tracking finger movements", correct: false },
            { text: "Through GPS sensor data", correct: false }
        ]
    },
    //
    {
        question: "What does the Heading property control for an ImageSprite?",
        answers: [
            { text: "Its movement speed", correct: false },
            { text: "Its rotation angle", correct: true },
            { text: "Its z-index layer", correct: false },
            { text: "Its collision detection mode", correct: false }
        ]
    },
    //
    {
        question: "What event occurs when a sprite reaches the edge of the Canvas?",
        answers: [
            { text: "Sprite.CollidedWith", correct: false },
            { text: "Sprite.EdgeReached", correct: true },
            { text: "Canvas.BorderTouch", correct: false },
            { text: "Screen.EdgeDetected", correct: false }
        ]
    },
    //
    {
        question: "In the painting app example, what happens when you drag your finger across the Canvas?",
        answers: [
            { text: "A random colored circle appears", correct: false },
            { text: "A black line is drawn", correct: true },
            { text: "The background color changes", correct: false },
            { text: "An ImageSprite follows your finger", correct: false }
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