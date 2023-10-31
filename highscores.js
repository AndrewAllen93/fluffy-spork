var highScoresList = document.querySelector(".highScoresList");

function displayHighScores() {
  var storedScores = JSON.parse(localStorage.getItem("userData")) || [];

  highScoresList.innerHTML = "";

  storedScores.forEach(function (user) {
    var listItem = document.createElement("li");
    listItem.textContent = user.initials + ": " + user.score;
    highScoresList.appendChild(listItem);
  });
}

window.addEventListener("load", displayHighScores);
