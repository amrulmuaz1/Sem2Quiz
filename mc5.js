const questions = [
    {
        question: "What is the primary purpose of a TextBox component in MIT App Inventor?",
        answers: [
            { text: "To display images", correct: false },
            { text: "To accept keyboard input from users", correct: true },
            { text: "To play audio files", correct: false },
            { text: "To create animations", correct: false }
        ]
    },
    //
    {
        question: "Which property would you set to ensure a TextBox only accepts numeric input?",
        answers: [
            { text: "TextOnly", correct: false },
            { text: "InputType", correct: false },
            { text: "NumbersOnly", correct: true },
            { text: "NumericInput", correct: false }
        ]
    },
    //
    {
        question: "What does the 'random integer from [ ] to [100]' block do?",
        answers: [
            { text: "Generates a random decimal between 0 and 1", correct: false },
            { text: "Creates a list of random numbers", correct: false },
            { text: "Generates a random whole number within a specified range", correct: true },
            { text: "Sorts numbers in random order", correct: false }
        ]
    },
    //
    {
        question: "How are items typically separated in a ListPicker's ElementsFromString property?",
        answers: [
            { text: "With semicolons", correct: false },
            { text: "With commas", correct: true },
            { text: "With spaces", correct: false },
            { text: "With colons", correct: false }
        ]
    },
    //
    {
        question: "Which event handler would you use with a ListPicker to respond when a user selects an item?",
        answers: [
            { text: "BeforePicking", correct: false },
            { text: "Click", correct: false },
            { text: "AfterPicking", correct: true },
            { text: "SelectionChanged", correct: false }
        ]
    },
    //
    {
        question: "What is the purpose of the CheckBox component?",
        answers: [
            { text: "To display large blocks of text", correct: false },
            { text: "To allow users to select multiple options", correct: true },
            { text: "To create navigation menus", correct: false },
            { text: "To play sound effects", correct: false }
        ]
    },
    //
    {
        question: "Which property would you check to determine if a CheckBox is selected?",
        answers: [
            { text: "Selected", correct: false },
            { text: "Value", correct: false },
            { text: "Checked", correct: true },
            { text: "Active", correct: false }
        ]
    },
    //
    {
        question: "What does the 'random fraction' block return?",
        answers: [
            { text: "A whole number between 1 and 10", correct: false },
            { text: "A decimal number between 0 and 1", correct: true },
            { text: "A fraction in simplified form", correct: false },
            { text: "A random mathematical operation", correct: false }
        ]
    },
    //
    {
        question: "In the pizza toppings example, what happens when a CheckBox is unchecked?",
        answers: [
            { text: "The price is added to the total", correct: false },
            { text: "The price is subtracted from the total", correct: true },
            { text: "The app resets completely", correct: false },
            { text: "A warning message appears", correct: false }
        ]
    },
    //
    {
        question: "Which component would be most appropriate for creating a dropdown menu of country selections?",
        answers: [
            { text: "TextBox", correct: false },
            { text: "CheckBox", correct: false },
            { text: "ListPicker", correct: true },
            { text: "Slider", correct: false }
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