const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyperlinks and Text Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyper Transfer Markup Language", correct: false }
        ]
    },
    {
        question: "Which HTML element is used to embed an image in a webpage?",
        answers: [
            { text: "<picture>", correct: false },
            { text: "<img>", correct: true },
            { text: "<image>", correct: false },
            { text: "<src>", correct: false }
        ]
    },
    {
        question: "What is the purpose of the <figcaption> element?",
        answers: [
            { text: "To create a figure legend", correct: false },
            { text: "To provide a caption for a <figure> element", correct: true },
            { text: "To format text in a special way", correct: false },
            { text: "To define a footer section", correct: false }
        ]
    },
    {
        question: "Which HTML5 element should be used for the main content of a document?",
        answers: [
            { text: "<content>", correct: false },
            { text: "<main>", correct: true },
            { text: "<section>", correct: false },
            { text: "<body>", correct: false }
        ]
    },
    {
        question: "What is the correct way to create a hyperlink in HTML?",
        answers: [
            { text: '<a url="http://example.com">Example</a>', correct: false },
            { text: '<a href="http://example.com">Example</a>', correct: true },
            { text: '<a>http://example.com</a>', correct: false },
            { text: '<link src="http://example.com">Example</link>', correct: false }
        ]
    },
    {
        question: "Which HTML element is used to define a table row?",
        answers: [
            { text: "<td>", correct: false },
            { text: "<th>", correct: false },
            { text: "<tr>", correct: true },
            { text: "<table>", correct: false }
        ]
    },
    {
        question: "What is the purpose of the alt attribute in an <img> tag?",
        answers: [
            { text: "To specify alternative text when the image cannot be displayed", correct: true },
            { text: "To set the alignment of the image", correct: false },
            { text: "To define alternative image sources", correct: false },
            { text: "To create a tooltip for the image", correct: false }
        ]
    },
    {
        question: "Which HTML element is used to embed a video in a webpage?",
        answers: [
            { text: "<media>", correct: false },
            { text: "<movie>", correct: false },
            { text: "<video>", correct: true },
            { text: "<embed>", correct: false }
        ]
    },
    {
        question: "What is the correct HTML5 doctype declaration?",
        answers: [
            { text: "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 5.0//EN\">", correct: false },
            { text: "<!DOCTYPE html5>", correct: false },
            { text: "<!DOCTYPE HTML5>", correct: false },
            { text: "<!DOCTYPE html>", correct: true }
        ]
    },
    {
        question: "Which HTML element should be used for navigation links?",
        answers: [
            { text: "<div class=\"nav\">", correct: false },
            { text: "<navigation>", correct: false },
            { text: "<nav>", correct: true },
            { text: "<ul class=\"navigation\">", correct: false }
        ]
    }
];

// Rest of your existing JavaScript code remains the same...
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