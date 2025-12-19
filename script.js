// ====== Model: Quiz Data ======
const quizData = [
    { question: "What is the capital of India?", options: ["Mumbai", "Delhi", "Bangalore", "Chennai"], answer: "Delhi" },
    { question: "Which language runs in a web browser?", options: ["Python", "JavaScript", "C++", "Java"], answer: "JavaScript" },
    { question: "HTML stands for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlink and Text", "None"], answer: "Hyper Text Markup Language" }
];

// ====== Controller ======
let currentQuestion = 0;
let score = 0;
let timer;
const TIME_PER_QUESTION = 15; // seconds

// Elements
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const resultEl = document.getElementById('result');
const scoreEl = document.getElementById('score');
const highscoreEl = document.getElementById('highscore');
const progressEl = document.getElementById('progress');
const timerEl = document.getElementById('timer');

// Load first question
loadQuestion();

function loadQuestion() {
    clearInterval(timer);
    const q = quizData[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = '';
    q.options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.onclick = () => checkAnswer(option);
        optionsEl.appendChild(btn);
    });
    // Progress
    progressEl.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    // Start timer
    startTimer();
}

function checkAnswer(selected) {
    clearInterval(timer);
    if(selected === quizData[currentQuestion].answer) score++;
    currentQuestion++;
    if(currentQuestion < quizData.length) loadQuestion();
    else showResult();
}

function startTimer() {
    let timeLeft = TIME_PER_QUESTION;
    timerEl.textContent = `Time Left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time Left: ${timeLeft}s`;
        if(timeLeft <= 0) {
            clearInterval(timer);
            currentQuestion++;
            if(currentQuestion < quizData.length) loadQuestion();
            else showResult();
        }
    }, 1000);
}

function showResult() {
    document.getElementById('quiz').style.display = 'none';
    resultEl.style.display = 'block';
    scoreEl.textContent = score + " / " + quizData.length;

    // Highscore using localStorage
    let highscore = localStorage.getItem('quizHighscore') || 0;
    if(score > highscore) {
        localStorage.setItem('quizHighscore', score);
        highscore = score;
    }
    highscoreEl.textContent = highscore + " / " + quizData.length;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    resultEl.style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    loadQuestion();
}
