const questions = [
    {
        question: "What data structure associates one value, often called the key, with another value?",
        answers: [
            { text: "List", correct: false },
            { text: "Dictionary", correct: true },
            { text: "Array", correct: false },
            { text: "Stack", correct: false }
        ]
    },
    {
        question: "What block in MIT App Inventor is used to create an empty dictionary?",
        answers: [
            { text: "make a dictionary", correct: false },
            { text: "initialize dictionary", correct: false },
            { text: "create empty dictionary", correct: true },
            { text: "set value for key", correct: false }
        ]
    },
    {
        question: "Which block is used to add or update a value in a dictionary?",
        answers: [
            { text: "pair", correct: false },
            { text: "set value for key", correct: true },
            { text: "get value for key", correct: false },
            { text: "delete entry for key", correct: false }
        ]
    },
    {
        question: "How do you delete a key-value pair in a dictionary?",
        answers: [
            { text: "remove key", correct: false },
            { text: "delete entry for key", correct: true },
            { text: "clear dictionary", correct: false },
            { text: "pop key", correct: false }
        ]
    },
    {
        question: "Which block allows you to find the size of a dictionary?",
        answers: [
            { text: "get value for key", correct: false },
            { text: "size of dictionary", correct: true },
            { text: "length of dictionary", correct: false },
            { text: "count pairs", correct: false }
        ]
    },
    {
        question: "What will be returned if you try to get a value for a key that doesn't exist?",
        answers: [
            { text: "undefined", correct: false },
            { text: "null", correct: false },
            { text: "error", correct: false },
            { text: "not found", correct: true }
        ]
    },
    {
        question: "How can you convert all keys of a dictionary to a list in App Inventor?",
        answers: [
            { text: "list of pairs to dictionary", correct: false },
            { text: "get keys", correct: true },
            { text: "get values", correct: false },
            { text: "copy dictionary", correct: false }
        ]
    },
    {
        question: "Which block is used to merge two dictionaries together?",
        answers: [
            { text: "merge into dictionary", correct: true },
            { text: "append dictionary", correct: false },
            { text: "combine dictionary", correct: false },
            { text: "concat dictionary", correct: false }
        ]
    },
    {
        question: "What is a common way of displaying dictionaries in other languages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSV", correct: false },
            { text: "JSON", correct: true },
            { text: "XML", correct: false }
        ]
    },
    {
        question: "Which App Inventor component is often used to store dictionary data persistently?",
        answers: [
            { text: "Notifier", correct: false },
            { text: "Button", correct: false },
            { text: "TinyDB", correct: true },
            { text: "Canvas", correct: false }
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