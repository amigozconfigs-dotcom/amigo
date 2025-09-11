// Загрузка лидерборда
db.ref("players").on("value", snapshot => {
  let data = snapshot.val() || {};
  let arr = Object.values(data);
  arr.sort((a,b) => b.score - a.score); // сортируем по очкам

  leaderList.innerHTML = "";

  // показываем топ-10
  arr.slice(0, 10).forEach(p => {
    let li = document.createElement("li");
    li.textContent = `${p.name}: ${p.score}`;
    if (p.name === playerName) {
      li.style.color = "yellow"; // подсветка своего ника
      li.style.fontWeight = "bold";
    }
    leaderList.appendChild(li);
  });

  // если игрок не в топ-10, показываем его отдельно
  if (!arr.slice(0, 10).some(p => p.name === playerName)) {
    let me = arr.find(p => p.name === playerName);
    if (me) {
      let li = document.createElement("li");
      li.textContent = `${me.name}: ${me.score}`;
      li.style.color = "yellow";
      li.style.fontWeight = "bold";
      leaderList.appendChild(document.createElement("hr")); // разделитель
      leaderList.appendChild(li);
    }
  }
});