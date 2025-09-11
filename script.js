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

// === Блокируем скролл, свайпы и масштабирование ===
document.addEventListener('touchstart', function(e) {
  e.preventDefault();
}, { passive: false });

document.addEventListener('touchmove', function(e) {
  e.preventDefault();
}, { passive: false });

document.addEventListener('touchend', function(e) {
  e.preventDefault();
}, { passive: false });

// Для мыши (если кто-то тестит на ПК)
document.addEventListener('mousedown', function(e) {
  e.preventDefault();
}, { passive: false });

document.addEventListener('mousemove', function(e) {
  e.preventDefault();
}, { passive: false });

// === Метатег для отключения масштабирования ===
if (!document.querySelector('meta[name="viewport"]')) {
  const meta = document.createElement('meta');
  meta.name = "viewport";
  meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
  document.head.appendChild(meta);
}

// === CSS через JS, чтобы убедиться что прокрутки нет ===
document.documentElement.style.overflow = 'hidden';
document.body.style.overflow = 'hidden';
document.documentElement.style.touchAction = 'none';
document.body.style.touchAction = 'none';
document.body.style.userSelect = 'none';
document.body.style.webkitUserSelect = 'none';