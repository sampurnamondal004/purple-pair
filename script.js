const symbols = ["🍎", "🍌", "🍒", "🍇", "🍉", "🍋", "🥝", "🍓"];

const gameEl = document.getElementById("game");
const statusEl = document.getElementById("status");

let firstCard = null;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0;
let points = 0;

const deck = shuffle([...symbols, ...symbols]);

deck.forEach((symbol) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.symbol = symbol;

  card.innerHTML = `
    <div class="inner">
      <div class="front"></div>
      <div class="back">${symbol}</div>
    </div>
  `;

  card.addEventListener("click", handleFlip);
  gameEl.appendChild(card);
});

function handleFlip(e) {
  if (lockBoard) return;
  const card = e.currentTarget;
  if (card === firstCard || card.classList.contains("matched")) return;

  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  moves++;
  updateStatus();

  const secondCard = card;

  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    firstCard = null;
    matchedPairs++;
    points += 10;
    updateStatus();
    if (matchedPairs === symbols.length) {
      statusEl.textContent = `You won in ${moves} moves! Total Points: ${points} 🎉`;
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard = null;
      lockBoard = false;
    }, 800);
  }
}

function updateStatus() {
  statusEl.textContent = `Moves: ${moves} | Points: ${points}`;
}
document.body.addEventListener('click', function () {
  const music = document.getElementById('bg-music');
  if (music.paused) {
    music.play();
  }
}, { once: true });

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
} 
