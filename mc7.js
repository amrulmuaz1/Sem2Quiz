const questions = [
    {
        question: "What does App Inventor use to represent a collection of data?",
        answers: [
            { text: "Text block", correct: false },
            { text: "List variable", correct: true },
            { text: "Number variable", correct: false },
            { text: "Color block", correct: false }
        ]
    },
    {
        question: "Which block allows you to select a specific item from a list in App Inventor?",
        answers: [
            { text: "select list item", correct: true },
            { text: "get element", correct: false },
            { text: "choose item", correct: false },
            { text: "fetch item", correct: false }
        ]
    },
    {
        question: "What index number represents the first item in a list?",
        answers: [
            { text: "0", correct: false },
            { text: "1", correct: true },
            { text: "2", correct: false },
            { text: "3", correct: false }
        ]
    },
    {
        question: "How do you add an item to a list in App Inventor?",
        answers: [
            { text: "insert item", correct: false },
            { text: "append item", correct: false },
            { text: "add items to list", correct: true },
            { text: "push item", correct: false }
        ]
    },
    {
        question: "Which UI component allows users to select and remove items from a list?",
        answers: [
            { text: "Button", correct: false },
            { text: "ListPicker", correct: true },
            { text: "TextInput", correct: false },
            { text: "Label", correct: false }
        ]
    },
    {
        question: "What variable is commonly used to track the current position in a list?",
        answers: [
            { text: "counter", correct: false },
            { text: "position", correct: false },
            { text: "index", correct: true },
            { text: "tracker", correct: false }
        ]
    },
    {
        question: "What is the purpose of the blue mutator icon when creating a list?",
        answers: [
            { text: "To delete the list", correct: false },
            { text: "To change the list type", correct: false },
            { text: "To add more slots to the list", correct: true },
            { text: "To reset the list", correct: false }
        ]
    },
    {
        question: "What happens if you increment the index variable beyond the list size?",
        answers: [
            { text: "It throws an error", correct: false },
            { text: "It loops back to the first item", correct: true },
            { text: "It stops at the last item", correct: false },
            { text: "It removes the last item", correct: false }
        ]
    },
    {
        question: "How can you display all the items of a list in App Inventor?",
        answers: [
            { text: "Using a Label with the Text property", correct: true },
            { text: "Using a Button", correct: false },
            { text: "Using an Alert", correct: false },
            { text: "Using a Switch", correct: false }
        ]
    },
    {
        question: "What type of list allows items to be added or removed during app runtime?",
        answers: [
            { text: "Static List", correct: false },
            { text: "Immutable List", correct: false },
            { text: "Dynamic List", correct: true },
            { text: "Fixed List", correct: false }
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