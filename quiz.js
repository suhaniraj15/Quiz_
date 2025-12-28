const quizData = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlinks Text Markup"],
    answer: 0
  },
  {
    question: "Which language is used for styling?",
    options: ["HTML", "CSS", "JavaScript"],
    answer: 1
  },
  {
    question: "Which language adds logic to a website?",
    options: ["CSS", "HTML", "JavaScript"],
    answer: 2
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timer;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const resultEl = document.getElementById("result");
const finalScoreEl = document.getElementById("finalScore");

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 10;
  startTimer();

  const current = quizData[currentQuestion];
  questionEl.innerText = current.question;
  optionsEl.innerHTML = "";

  current.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => checkAnswer(index);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (selected === quizData[currentQuestion].answer) {
    score++;
    scoreEl.innerText = "Score: " + score;
  }
  nextQuestion();
}

function startTimer() {
  timerEl.innerText = "Time: " + timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerText = "Time: " + timeLeft;

    if (timeLeft === 0) {
      nextQuestion();
    }
  }, 1000);
}

function nextQuestion() {
  clearInterval(timer);
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

function showResult() {
  document.querySelector(".quiz-container").style.display = "none";
  resultEl.style.display = "block";
  finalScoreEl.innerText = `Your Score: ${score} / ${quizData.length}`;

  // Save High Score
  localStorage.setItem("highScore", score);
}

document.getElementById("nextBtn").onclick = nextQuestion;
document.getElementById("prevBtn").onclick = prevQuestion;

// Start quiz
loadQuestion();
