
var startButton = document.querySelector("#start");
var intro = document.querySelector(".intro");
var quiz = document.querySelector(".quiz");
var questionEl = document.querySelector(".questionEl");
var answersListEl = document.querySelector(".answersListEl");
var timeLeft = document.querySelector("#timeLeft");
var end = document.querySelector(".end");
var scoreOutput = document.querySelector(".scoreOutput");
var initialsInput = document.querySelector(".initialsInput");
var saveBtn = document.querySelector(".saveBtn");
var scores = document.querySelector(".scores");
var scoresList = document.querySelector(".scoresList");


var quizData = [
  {
    question: "What does JS stand for?",
    answerSet: [
      "A. Just Sayin",
      "B. Java",
      "C. JavaScript",
      "D. Cascading Style Sheet",
    ],
    correct: "C. JavaScript",
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    answerSet: [
      "A. <script href='xxx.js'>",
      "B. <script name='xxx.js'>",
      "C. <script src='xxx.js'>",
      "D. <script file='xxx.js'>",
    ],
    correct: "C. <script src='xxx.js'>",
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    answerSet: [
      "A. alertBox('Hello World');",
      "B. msg('Hello World');",
      "C. alert('Hello World');",
      "D. msgBox('Hello World');",
    ],
    correct: "C. alert('Hello World');",
  },
  {
    question: "How do you create a function in JavaScript?",
    answerSet: [
      "A. function = myFunction()",
      "B. function myFunction()",
      "C. function:myFunction()",
      "D. function myFunction[]",
    ],
    correct: "B. function myFunction()",
  },
  {
    question: "How do you call a function named 'myFunction'?",
    answerSet: [
      "A. call function myFunction()",
      "B. call myFunction()",
      "C. myFunction()",
      "D. myFunction[]",
    ],
    correct: "C. myFunction()",
  },
  {
    question: "How do you write an IF statement in JavaScript?",
    answerSet: [
      "A. if i = 5",
      "B. if i == 5 then",
      "C. if (i == 5)",
      "D. if i = 5 then",
    ],
    correct: "C. if (i == 5)",
  },
  {
    question: "How does a FOR loop start?",
    answerSet: [
      "A. for (i = 0; i <= 5)",
      "B. for (i = 0; i <= 5; i++)",
      "C. for (i <= 5; i++)",
      "D. for i = 1 to 5",
    ],
    correct: "B. for (i = 0; i <= 5; i++)",
  },
];

var quizIndex = 0;
var score = 0;
var time = 60;

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  intro.style.display = "none";
  quiz.style.display = "block";

  var timer = setInterval(function () {
    if (time > 0) {
      timeLeft.textContent = time;
      time--;
    } else {
      clearInterval(timer);
      timeLeft.textContent = "";
      endGame();
    }
  }, 1000);

  displayQuestion();
}

function displayQuestion() {
  var currentQuestion = quizData[quizIndex];
  questionEl.textContent = currentQuestion.question;
  answersListEl.innerHTML = "";

  currentQuestion.answerSet.forEach(function (answerValue) {
    var button = document.createElement("button");
    button.textContent = answerValue;
    answersListEl.appendChild(button);

    button.addEventListener("click", function (event) {
      var choice = event.target.textContent;
      if (choice === currentQuestion.correct) {
        score += 20;
      } else {
        time -= 10;
      }

      if (quizIndex < quizData.length - 1) {
        quizIndex++;
        displayQuestion();
      } else {
        endGame();
      }
    });
  });
}

function displayScores() {
  var storedScores = JSON.parse(localStorage.getItem("userData")) || [];
  scoresList.innerHTML = "";

  storedScores.forEach(function (user) {
    var listItem = document.createElement("li");
    listItem.textContent = user.initials + ": " + user.score;
    scoresList.appendChild(listItem);
  });
}

window.addEventListener("load", displayScores);

function endGame() {

  var finalScore = score + time;

  quiz.style.display = "none";
  end.style.display = "block";
  scoreOutput.textContent = "You got a score of: " + finalScore;

  saveBtn.addEventListener("click", function () {
    var initialsValue = initialsInput.value.trim();
    if (initialsValue === "") {
      alert("Please enter your initials.");
      return;
    }

    // Create an object to store user data
    var userData = {
      score: finalScore,
      initials: initialsValue,
    };

    // Retrieve existing data from local storage or create an empty array
    var localStorageHistory = JSON.parse(localStorage.getItem("userData")) || [];

    // Add the new user data to the array
    localStorageHistory.push(userData);

    // Save the updated data back to local storage
    localStorage.setItem("userData", JSON.stringify(localStorageHistory));

    // Display scores after saving
    displayScores();
  });
}


