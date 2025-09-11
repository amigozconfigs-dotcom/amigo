let score = 0;
let multiplier = 1;
let completedTasks = [];
let gameFinished = false;

const scoreEl = document.getElementById("score");
const multEl = document.getElementById("mult");
const tapBtn = document.getElementById("tapBtn");
const leadersEl = document.getElementById("leaders");
const saveBtn = document.getElementById("saveBtn");
const newGameBtn = document.getElementById("newGameBtn");
const playerNameInput = document.getElementById("playerName");

let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

function updateUI() {
  scoreEl.textContent = score;
  multEl.textContent = "x" + multiplier;
}

function checkTasks() {
  if (score >= 100 && !completedTasks.includes(1)) {
    document.getElementById("task1").textContent = "Набери 100 очков ✅ (x2 бонус!)";
    multiplier *= 2;
    completedTasks.push(1);
  }
  if (score >= 300 && !completedTasks.includes(2)) {
    document.getElementById("task2").textContent = "Набери 300 очков ✅ (x2 бонус!)";
    multiplier *= 2;
    completedTasks.push(2);
  }
  if (score >= 600 && !completedTasks.includes(3)) {
    document.getElementById("task3").textContent = "Набери 600 очков ✅ (x2 бонус!)";
    multiplier *= 2;
    completedTasks.push(3);
  }
}

function updateLeaderboard() {
  leadersEl.innerHTML = "";
  leaderboard.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.name} — ${entry.score} очков`;
    leadersEl.appendChild(li);
  });
}

tapBtn.addEventListener("click", () => {
  if (gameFinished) return; // нельзя кликать после сохранения
  score += multiplier;
  checkTasks();
  updateUI();
});

saveBtn.addEventListener("click", () => {
  if (gameFinished) return; // защита от спама
  const name = playerNameInput.value.trim() || "Безымянный";
  leaderboard.push({ name, score });
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 5);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  updateLeaderboard();
  gameFinished = true;
  saveBtn.disabled = true; // блокируем кнопку
});

newGameBtn.addEventListener("click", () => {
  // сброс игры
  score = 0;
  multiplier = 1;
  completedTasks = [];
  gameFinished = false;
  saveBtn.disabled = false;

  document.getElementById("task1").textContent = "Набери 100 очков ❌";
  document.getElementById("task2").textContent = "Набери 300 очков ❌";
  document.getElementById("task3").textContent = "Наб
  
  leaderboard = leaderboard.slice(0, 5);