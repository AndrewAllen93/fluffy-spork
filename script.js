const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const messageElement = document.getElementById("message");
const nextBtn = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

const questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<Javascript>", "<script>", "<scripting>", "<js>"],
        correctAnswer: "<script>"
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        options: ["Above the </body> section", "Inside the <head>", "Underneath the CSS Stylesheet", "Inside its own <div>"],
        correctAnswer: "Above the </body> section"
    },
    {
        question: "How can you add a comment in JavaScript?",
        options: ["// This is a comment", "<!-- This is a comment -->", "'This is a comment'", "/* This is a comment */"],
        correctAnswer: "// This is a comment"
    }
];

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        endQuiz();
    }
});

function startQuiz() {
    startBtn.style.display = "none";
    quizContainer.style.display = "block";
    showQuestion(currentQuestionIndex);
}

function showQuestion(index) {
    const question = questions[index];
    questionElement.innerText = question.question;
    optionsElement.innerHTML = "";
    question.options.forEach((option) => {
        const optionBtn = document.createElement("button");
        optionBtn.innerText = option;
        optionBtn.addEventListener("click", () => checkAnswer(option, question.correctAnswer));
        optionsElement.appendChild(optionBtn);
    });
}

function checkAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        messageElement.innerText = "Correct!";
        score++;
    } else {
        messageElement.innerText = "Incorrect!";
    }
    scoreElement.innerText = score;
    nextBtn.style.display = "block";
    optionsElement.querySelectorAll("button").forEach((btn) => {
        btn.disabled = true;
    });
}

function endQuiz() {
    quizContainer.style.display = "none";
    messageElement.innerText = `Quiz Over! Your Score: ${score}`;
    nextBtn.style.display = "none";
}
