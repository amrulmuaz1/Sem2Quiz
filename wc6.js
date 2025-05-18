const questions = [
  {
    question: "What does PHP stand for?",
    answers: [
      { text: "Personal Home Page", correct: false },
      { text: "Private HTML Processor", correct: false },
      { text: "PHP: Hypertext Preprocessor", correct: true },
      { text: "Programming Hosting Protocol", correct: false }
    ]
  },
  {
    question: "Which symbol is used to declare a variable in PHP?",
    answers: [
      { text: "#", correct: false },
      { text: "&", correct: false },
      { text: "$", correct: true },
      { text: "@", correct: false }
    ]
  },
  {
    question: "Which of the following is a valid PHP data type?",
    answers: [
      { text: "String", correct: true },
      { text: "Character", correct: false },
      { text: "Byte", correct: false },
      { text: "Tuple", correct: false }
    ]
  },
  {
    question: "Which operator is used for concatenating strings in PHP?",
    answers: [
      { text: "+", correct: false },
      { text: ".", correct: true },
      { text: "&", correct: false },
      { text: "*", correct: false }
    ]
  },
  {
    question: "Which of these is a comparison operator that checks both value and type?",
    answers: [
      { text: "==", correct: false },
      { text: "=", correct: false },
      { text: "===", correct: true },
      { text: "!=", correct: false }
    ]
  },
  {
    question: "What is the output of this PHP line: `$x = 5; $x++; echo $x;`?",
    answers: [
      { text: "4", correct: false },
      { text: "5", correct: false },
      { text: "6", correct: true },
      { text: "Error", correct: false }
    ]
  },
  {
    question: "Which PHP control structure is best used for looping through an array?",
    answers: [
      { text: "while", correct: false },
      { text: "for", correct: false },
      { text: "foreach", correct: true },
      { text: "switch", correct: false }
    ]
  },
  {
    question: "Which PHP scope retains its value between function calls?",
    answers: [
      { text: "Local", correct: false },
      { text: "Global", correct: false },
      { text: "Static", correct: true },
      { text: "Private", correct: false }
    ]
  },
  {
    question: "What is the output of `echo 3 ** 2;` in PHP?",
    answers: [
      { text: "6", correct: false },
      { text: "9", correct: true },
      { text: "8", correct: false },
      { text: "Error", correct: false }
    ]
  },
  {
    question: "Which of the following best describes a PHP function?",
    answers: [
      { text: "A loop inside a class", correct: false },
      { text: "A reusable block of code", correct: true },
      { text: "A type of variable", correct: false },
      { text: "An HTML element", correct: false }
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