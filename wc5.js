const questions = [
  {
    question: "What is the main role of a web server?",
    answers: [
      { text: "Creating frontend interfaces", correct: false },
      { text: "Storing and serving web content", correct: true },
      { text: "Designing databases", correct: false },
      { text: "Generating user data", correct: false }
    ]
  },
  {
    question: "Which protocol does the client-server model primarily use?",
    answers: [
      { text: "FTP", correct: false },
      { text: "HTTP", correct: true },
      { text: "SMTP", correct: false },
      { text: "SSL", correct: false }
    ]
  },
  {
    question: "Which web server is best for handling high traffic websites?",
    answers: [
      { text: "Apache", correct: false },
      { text: "Node.js", correct: false },
      { text: "Nginx", correct: true },
      { text: "Microsoft IIS", correct: false }
    ]
  },
  {
    question: "What does the 404 error indicate?",
    answers: [
      { text: "Server is overloaded", correct: false },
      { text: "Bad syntax in the request", correct: false },
      { text: "Resource not found", correct: true },
      { text: "Permission denied", correct: false }
    ]
  },
  {
    question: "What is the purpose of SSL/TLS in web servers?",
    answers: [
      { text: "To load pages faster", correct: false },
      { text: "To encrypt communication", correct: true },
      { text: "To store user preferences", correct: false },
      { text: "To debug server errors", correct: false }
    ]
  },
  {
    question: "Which database is best suited for unstructured data?",
    answers: [
      { text: "MySQL", correct: false },
      { text: "PostgreSQL", correct: false },
      { text: "MongoDB", correct: true },
      { text: "MariaDB", correct: false }
    ]
  },
  {
    question: "Which SQL command is used to retrieve data?",
    answers: [
      { text: "UPDATE", correct: false },
      { text: "SELECT", correct: true },
      { text: "DELETE", correct: false },
      { text: "CREATE", correct: false }
    ]
  },
  {
    question: "What is a major security threat to databases?",
    answers: [
      { text: "HTML injection", correct: false },
      { text: "Cross-origin scripting", correct: false },
      { text: "SQL injection", correct: true },
      { text: "Data duplication", correct: false }
    ]
  },
  {
    question: "In SQL, which command is used to add data to a table?",
    answers: [
      { text: "INSERT INTO", correct: true },
      { text: "SELECT", correct: false },
      { text: "DELETE", correct: false },
      { text: "DROP", correct: false }
    ]
  },
  {
    question: "What is the main benefit of regular database backups?",
    answers: [
      { text: "Faster performance", correct: false },
      { text: "Prevents SQL injection", correct: false },
      { text: "Data recovery and continuity", correct: true },
      { text: "Enhances UI design", correct: false }
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