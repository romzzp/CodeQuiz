var quizEl = document.querySelector("#quizPage");
var resultEl = document.querySelector("#result");
var finalScoreEl = document.querySelector("#finalScore");
var gameOver = document.querySelector("#gameover");
var questionsEl = document.querySelector("#questions");
var quizTimeEl = document.querySelector("#timer");
var startBtn = document.querySelector("#start-btn");
var mainPage = document.querySelector("#mainpage");
var highScoreEl = document.querySelector("#highScore");
var highScorePageEl = document.querySelector("#highScorePage");
var highScoreInitials = document.querySelector("#initials");
var highScoreName = document.querySelector("#highScore-name");
var endGameBtn = document.querySelector("#endGame");
var submitScoreBtn = document.querySelector("#submitScore");
var highScoreScore = document.querySelector("#highScore-score");
var btnA = document.querySelector("#btn-a");
var btnB = document.querySelector("#btn-b");
var btnC = document.querySelector("#btn-c");
var btnD = document.querySelector("#btn-d");

var quizQuestions = [{
    q: "What is full name of HTML?", optionA: "Hyper Text Markup Language", optionB: "Hyper Type Makeup Language", optionC: "HyperLinks Text Markup Language", optionD: "Happy Text Messaging Language", correctAnswer: "A"
},
{
    q: "What is full name of CSS?", optionA: "Cascading Shaping Sheets", optionB: "Creating Style Sheets", optionC: "Cascading Style Sheets", optionD: "Creating Simple Style", correctAnswer: "C"
},
{
    q: "What HTML attribute references an external JavaScript file?", optionA: "href", optionB: "src", optionC: "class", optionD: "index", correctAnswer: "B"
},
{
    q: "What is full name of DOM?", optionA: "Document Object Model", optionB: "Display Object Management", optionC: "Digital Ordinance Model", optionD: "Desktop Objective Method", correctAnswer: "A"
},
{
    q: "What is full name of CDN?", optionA: "Content Delivery Network", optionB: "Cascading Delivery Network", optionC: "Creative Driving Network", optionD: "Content Discovery Network", correctAnswer: "D"
},
];

var score = 0;
var timeLeft = 60;
var correctAns;
var timerInterval;
var currentQuestionIndex = 0;
var finalQuestionIndex = quizQuestions.length;

function generateQuiz() {
    gameOver.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
        return userScore();
    }
    var currentQuestion = quizQuestions
    [currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.q + "<p>";
    btnA.innerHTML = currentQuestion.optionA;
    btnB.innerHTML = currentQuestion.optionB;
    btnC.innerHTML = currentQuestion.optionC;
    btnD.innerHTML = currentQuestion.optionD;
};

function startQuiz() {
    gameOver.style.display = "none";
    mainPage.style.display = "none";
    generateQuiz();
    timerInterval = setInterval(function () {
        timeLeft--;
        quizTimeEl.textContent = "Time Remaining: " + timeLeft;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            userScore();
        }
    }, 1000);
    quizEl.style.display = "block";
}

function userScore() {
    quizEl.style.display = "none";
    gameOver.style.display = "flex";
    clearInterval(timerInterval);
    highScoreInitials = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct ";
}

submitScoreBtn.addEventListener("click", function highScore() {

    var savedHighScores = JSON.parse(localStorage.getItem("savedHighScores")) || [];
    var currentUser = highScoreInitials;
    var currentUserScore = {
        name: currentUser,
        score: score,
    };

    gameOver.style.display = "none";
    highScoreEl.style.display = "flex";
    highScorePageEl.style.display = "block";
    endGameBtn.style.display = "flex";

    savedHighScores.push(currentUserScore);
    localStorage.setItem("savedHighScores", JSON.stringify(savedHighScores)) || [];
    generateHighScore();
}
);

function generateHighScore() {
    highScoreName.innerHTML = "";
    highScoreScore.innerHTML = "";

    var highScores = JSON.parse(localStorage.getItem("savedHighScores"));
    for (var i = 0; i < highScores.length; i++) {
        var newName = document.createElement("li");
        var newScore = document.createElement("li");
        newName.textContent = highScores[i].name;
        newScore.textContent = highScores[i].score;
        highScoreName.appendChild(newName);
        highScoreScore.appendChild(newScore);
    }
}

function showHighScore() {
    mainPage.style.display = "none";
    gameOver.style.display = "none";
    highScoreEl.style.display = "flex";
    highScorePageEl.style.display = "block";
    endGameBtn.style.display = "flex";

    generateHighScore();
}

function clearScore() {
    window.localStorage.clear();
    highScoreName.textContent = "";
    highScoreScore.textContent = "";
}

function replayQuiz() {
    highScoreEl.style.display = "none";
    gameOver.style.display = "none";
    mainPage.style.display = "flex";
    timeLeft = 60;
    score = 0;
    currentQuestionIndex = 0;
    generateQuiz();
}

function checkAnswer(answer) {
    correctAns = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correctAns && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        alert("Correct!");
        currentQuestionIndex++;
        generateQuiz();
    }
    else if (answer !== correctAns && currentQuestionIndex !== finalQuestionIndex) {
        alert("Wrong!");
        currentQuestionIndex++;
        generateQuiz();
    }
    else {
        userScore();
    }
}
startBtn.addEventListener("click", startQuiz);