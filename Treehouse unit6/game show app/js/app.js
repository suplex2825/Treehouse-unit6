
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const startButton = overlay.lastElementChild;
const phrases = [
  "Always believe in God",
  "Never give up",
  "Keep going",
  "Be Strong",
  "Never say Never",
  "Finally, Always work hard"
];
const list = phrase.getElementsByTagName('ul')[0];
let missed = 0;
let letterFound;

function getRandomPhraseAsArray(arr) {
  function randomNumber() {
    return Math.floor(Math.random() * arr.length);
  }
  const random = randomNumber();
  const newGameArray = Array.from(arr[random]);
  return(newGameArray);
}

function addPhraseToDisplay(arr) {
  for (let i=0; i<arr.length; i++) {
    let li = document.createElement('li');
    li.textContent = arr[i];
    if ( li.textContent === ' ' ) {
      li.className = 'space';
    } else {
      li.className = 'letter';
    }
    list.appendChild(li);
  }
}

function checkLetter(buttonPressed) {
  letterFound = false;
  const letters = document.querySelectorAll('.letter');
  for (let i=0; i<letters.length; i++) {
    const listItem = letters[i];
    if ( listItem.textContent.toLowerCase() === buttonPressed ) {
      listItem.className = 'letter show';
      letterFound = listItem;
    }
  }
  return letterFound;
}

function checkWin() {
  const shownLetters = document.querySelectorAll('.show');
  const hiddenLetters = document.querySelectorAll('.letter');
  let h3 = document.createElement('h3');

  if ( shownLetters.length === hiddenLetters.length ) {
    overlay.className = 'win';
    overlay.style.display = 'block';
    h3.innerHTML = 'You are a <bold>Winner</bold>, you make me proud!!!';
    overlay.appendChild(h3);
  } else if (missed === 5) {
    overlay.className = 'lose';
    overlay.style.display = 'block';
    h3.innerHTML = 'GAME OVER';
    overlay.appendChild(h3);
  }
}

startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

qwerty.addEventListener('click', (e) => {
  if ( e.target.tagName == 'BUTTON' ) {
    const button = e.target;
    button.className = "chosen";
    button.disabled = true;
    checkLetter(button.textContent);
    if ( letterFound === false ) {
      let hearts = document.querySelectorAll('ol .tries img');
      hearts[missed].src = "images/lostHeart.png";
      missed += 1;
    }
  }
  checkWin();
});
