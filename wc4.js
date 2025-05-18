const questions = [
  {
    question: "What is the main purpose of selection control structures?",
    answers: [
      { text: "To execute instructions repeatedly", correct: false },
      { text: "To allow a program to choose different paths", correct: true },
      { text: "To store multiple values", correct: false },
      { text: "To define variables", correct: false }
    ]
  },
  {
    question: "Which keyword is used for a single-selection structure in C++?",
    answers: [
      { text: "else", correct: false },
      { text: "switch", correct: false },
      { text: "if", correct: true },
      { text: "case", correct: false }
    ]
  },
  {
    question: "What is the correct syntax for an `if...else` structure?",
    answers: [
      { text: "if (condition) { } else { }", correct: true },
      { text: "if else (condition) { }", correct: false },
      { text: "if (condition) else { }", correct: false },
      { text: "else if (condition) { }", correct: false }
    ]
  },
  {
    question: "In a multi-way selection, which statement is typically used?",
    answers: [
      { text: "while", correct: false },
      { text: "switch", correct: true },
      { text: "for", correct: false },
      { text: "do-while", correct: false }
    ]
  },
  {
    question: "Which of the following is true about the `switch` statement?",
    answers: [
      { text: "It can evaluate any data type", correct: false },
      { text: "It must always have a `default` case", correct: false },
      { text: "It uses `case` labels to match constant values", correct: true },
      { text: "It works only with boolean expressions", correct: false }
    ]
  },
  {
    question: "What happens if no `break` is used in a `switch` case?",
    answers: [
      { text: "It exits the switch block", correct: false },
      { text: "It returns an error", correct: false },
      { text: "It jumps to the default case", correct: false },
      { text: "It continues to the next case (fall-through)", correct: true }
    ]
  },
  {
    question: "What is a nested `if` statement?",
    answers: [
      { text: "An `if` statement that follows an `else`", correct: false },
      { text: "An `if` statement placed inside another `if`", correct: true },
      { text: "Two `if` statements on the same line", correct: false },
      { text: "An `if` with multiple `else if`", correct: false }
    ]
  },
  {
    question: "Which of these is a relational operator?",
    answers: [
      { text: "=", correct: false },
      { text: "+", correct: false },
      { text: "==", correct: true },
      { text: "&", correct: false }
    ]
  },
  {
    question: "What will `if (x == 5)` do if x equals 5?",
    answers: [
      { text: "It compares x with 5 and runs the block", correct: true },
      { text: "It assigns 5 to x", correct: false },
      { text: "It returns true and exits", correct: false },
      { text: "It throws an error", correct: false }
    ]
  },
  {
    question: "What is the function of the `default` label in a `switch` statement?",
    answers: [
      { text: "It must always be placed at the top", correct: false },
      { text: "It handles cases with break statements", correct: false },
      { text: "It executes when no other `case` matches", correct: true },
      { text: "It ends the `switch` statement", correct: false }
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