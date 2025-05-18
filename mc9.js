const questions = [
    {
        question: "What is the primary purpose of TinyDB in MIT App Inventor?",
        answers: [
            { text: "To create complex relational databases", correct: false },
            { text: "To store data persistently between app sessions", correct: true },
            { text: "To improve app performance", correct: false },
            { text: "To share data between different apps", correct: false }
        ]
    },
    //
    {
        question: "What happens to regular variable values when an app is closed?",
        answers: [
            { text: "They are automatically saved to TinyDB", correct: false },
            { text: "They are erased from memory", correct: true },
            { text: "They are backed up to the cloud", correct: false },
            { text: "They become read-only", correct: false }
        ]
    },
    //
    {
        question: "Which component palette contains the TinyDB component?",
        answers: [
            { text: "User Interface", correct: false },
            { text: "Storage", correct: true },
            { text: "Sensors", correct: false },
            { text: "Media", correct: false }
        ]
    },
    //
    {
        question: "What is a 'tag' in TinyDB terminology?",
        answers: [
            { text: "A visual marker in the UI", correct: false },
            { text: "A unique identifier for stored data", correct: true },
            { text: "A type of database error", correct: false },
            { text: "A formatting style for text", correct: false }
        ]
    },
    //
    {
        question: "Which event handler is typically used to retrieve TinyDB data when an app starts?",
        answers: [
            { text: "Button.Click", correct: false },
            { text: "Screen.Initialize", correct: true },
            { text: "Clock.Timer", correct: false },
            { text: "ListPicker.AfterPicking", correct: false }
        ]
    },
    //
    {
        question: "What happens if you store data using a tag that already exists in TinyDB?",
        answers: [
            { text: "The new value is appended to the existing value", correct: false },
            { text: "The existing value is overwritten", correct: true },
            { text: "An error occurs", correct: false },
            { text: "Both values are stored in a list", correct: false }
        ]
    },
    //
    {
        question: "Which of these data types CANNOT be stored directly in TinyDB?",
        answers: [
            { text: "Numbers", correct: false },
            { text: "Text strings", correct: false },
            { text: "Lists", correct: false },
            { text: "Image components", correct: true }
        ]
    },
    //
    {
        question: "What is the purpose of the 'valueIfTagNotThere' parameter in GetValue?",
        answers: [
            { text: "To specify a default value if the tag doesn't exist", correct: true },
            { text: "To validate the data type of the stored value", correct: false },
            { text: "To encrypt the retrieved data", correct: false },
            { text: "To limit the size of returned data", correct: false }
        ]
    },
    //
    {
        question: "In the camera app example, how are multiple photos stored in TinyDB?",
        answers: [
            { text: "Each photo is stored with a unique tag", correct: true },
            { text: "All photos are combined into one image", correct: false },
            { text: "Photos are stored in a single list", correct: false },
            { text: "Only the most recent photo is stored", correct: false }
        ]
    },
    //
    {
        question: "What is a recommended best practice when using TinyDB?",
        answers: [
            { text: "Use simple, descriptive tags", correct: true },
            { text: "Store all data under a single tag", correct: false },
            { text: "Only store numeric values", correct: false },
            { text: "Clear the database after every use", correct: false }
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