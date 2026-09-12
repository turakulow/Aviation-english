// ===== База фраз (загружается из файла) =====
let phrases = [];
let currentIndex = 0;
let knowCount = 0;
let repeatCount = 0;

// ===== Главное меню и экран тренажёра =====
const mainScreen = document.querySelector('main');
const trainerScreen = document.getElementById('trainer');
const backButton = document.getElementById('back-btn');
const flipCard = document.getElementById('flip-card');
const ruText = document.getElementById('ru-text');
const enText = document.getElementById('en-text');
const knowBtn = document.getElementById('know-btn');
const repeatBtn = document.getElementById('repeat-btn');
const progressText = document.getElementById('progress-text');
const resultBox = document.getElementById('result');

// ===== Кнопки разделов =====
document.querySelectorAll('.card button').forEach(function (button) {
  button.addEventListener('click', function () {
    const cardTitle = button.closest('.card').querySelector('h2').textContent;

    if (cardTitle === 'Phraseology') {
      openPhraseology();
    } else {
      alert('Раздел «' + cardTitle + '» скоро будет доступен 🚧');
    }
  });
});

// ===== Открыть тренажёр фраз =====
async function openPhraseology() {
  if (phrases.length === 0) {
    const response = await fetch('data/phraseology.json');
    phrases = await response.json();
    phrases.sort(() => Math.random() - 0.5); // перемешать
  }
  currentIndex = 0;
  knowCount = 0;
  repeatCount = 0;
  mainScreen.style.display = 'none';
  trainerScreen.style.display = 'block';
  showCard();
}

// ===== Показать текущую карточку =====
function showCard() {
  resultBox.style.display = 'none';
  flipCard.classList.remove('flipped');
  ruText.textContent = phrases[currentIndex].ru;
  enText.textContent = phrases[currentIndex].en;
  progressText.textContent = 'Карточка ' + (currentIndex + 1) + ' из ' + phrases.length;
}

// ===== Переворот карточки по тапу =====
flipCard.addEventListener('click', function () {
  flipCard.classList.toggle('flipped');
});

// ===== Кнопка «Знаю» =====
knowBtn.addEventListener('click', function () {
  knowCount++;
  nextCard();
});

// ===== Кнопка «Повторить» =====
repeatBtn.addEventListener('click', function () {
  repeatCount++;
  nextCard();
});

// ===== Переход к следующей карточке =====
function nextCard() {
  currentIndex++;
  if (currentIndex >= phrases.length) {
    showResult();
  } else {
    showCard();
  }
}

// ===== Итог тренировки =====
function showResult() {
  flipCard.style.display = 'none';
  knowBtn.style.display = 'none';
  repeatBtn.style.display = 'none';
  progressText.textContent = '';
  resultBox.style.display = 'block';
  resultBox.innerHTML =
    '<h3>Тренировка завершена! 🎉</h3>' +
    '<p>Знаю: ' + knowCount + '</p>' +
    '<p>Повторить: ' + repeatCount + '</p>' +
    '<button id="restart-btn">Пройти заново</button>';

  document.getElementById('restart-btn').addEventListener('click', function () {
    flipCard.style.display = 'block';
    knowBtn.style.display = 'inline-block';
    repeatBtn.style.display = 'inline-block';
    openPhraseology();
  });
}

// ===== Кнопка «Назад» =====
backButton.addEventListener('click', function () {
  trainerScreen.style.display = 'none';
  mainScreen.style.display = 'grid';
});
