import ancientsData from './data/ancients';
import difficultiesData from './data/difficulties';
import {brownCards, blueCards, greenCards} from './data/mythicCards/index';

function getRandomNum(min, max) {
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
}

const shuffleSection = document.querySelector('.shuffle-section');
const deckSection = document.querySelector('.deck-section');

function hideShuffleSection() {
  shuffleSection.classList.add('hidden');
}
function hideDeckSection() {
  deckSection.classList.add('hidden');
}
function showShuffleSection() {
  shuffleSection.classList.remove('hidden');
}
function showDeckSection() {
  deckSection.classList.remove('hidden');
}


(function createAncients() {
  const ancientSection = document.querySelector('.ancient-section');
  let ancientSectionContent = '';
  ancientsData.forEach(el => {
    ancientSectionContent += `
      <div class="ancient" style="background-image: url('${el.cardFace}');"></div>
    `
  })
  ancientSection.innerHTML = ancientSectionContent;
})();


const difficultiesSection = document.querySelector('.difficulties-section');

(function createDifficulties() {
  let difficultiesSectionContent = '';
  difficultiesData.forEach(el => {
    difficultiesSectionContent += `
      <div class="difficulties">${el.name}</div>
    `
  })
  difficultiesSection.innerHTML = difficultiesSectionContent;
})();


const ancients = document.querySelectorAll('.ancient');
const difficulties = document.querySelectorAll('.difficulties');

function showPlayFieldAfterChoosingAncient(el) {
  if (el.target.classList.contains('active')) {return};
  ancients.forEach(el => el.classList.remove('active'));
  el.target.classList.add('active');
  difficultiesSection.classList.remove('hidden');
  difficulties.forEach(el => el.classList.remove('active'));
  hideShuffleSection();
  hideDeckSection();
}

function showPlayFieldAfterChoosingDifficulty(el) {
  if (el.target.classList.contains('active')) {return};
  difficulties.forEach(el => el.classList.remove('active'));
  el.target.classList.add('active');
  showShuffleSection();
  hideDeckSection();
}

ancients.forEach(el => el.addEventListener('click', showPlayFieldAfterChoosingAncient));
difficulties.forEach(el => el.addEventListener('click', showPlayFieldAfterChoosingDifficulty));


let stagesInfo = [];

function getStagesInfo(el) {
  ancients.forEach((el, i) => {
    if ( el.classList.contains('active')) {  
      stagesInfo = [ancientsData[i].firstStage, ancientsData[i].secondStage, ancientsData[i].thirdStage];
    }
  })
}
ancients.forEach(el => el.addEventListener('click', getStagesInfo));

function getCardsAmount() {
  let cardsAmount = stagesInfo.reduce((acc, stage) => {
    return [(acc[0] += stage.greenCards), (acc[1] += stage.brownCards), (acc[2] += stage.blueCards)]
  }, [0, 0, 0]);
  return cardsAmount;
}


let difficulty = [];

function getDifficulty() {
  difficulties.forEach((el, i) => {
    if ( el.classList.contains('active')) {
      difficulty = difficultiesData[i].cardsDifficulty;
    }
  })
}
difficulties.forEach(el => el.addEventListener('click', getDifficulty));


function getCards(amount, colorCardsArr) {
  let resultArr = []
  let arr = [];
  for (let i = 0; i < difficulty.length; i++) {
    let filtredcolorCardsArr = colorCardsArr.filter(el => el.difficulty  == difficulty[i]);
    arr.push(...filtredcolorCardsArr);
  }
  if (difficulty.length == 1) {
    let cardsWithNormalDificulty = colorCardsArr.filter(el => el.difficulty  == 'normal');
    while (arr.length < amount) {
      let randomNum = getRandomNum(0, (cardsWithNormalDificulty.length - 1));
      let randomCard = cardsWithNormalDificulty[randomNum];
      if (!arr.includes(randomCard)) {
        arr.push(randomCard);
      }
    }
  }
  while (resultArr.length < amount) {
    let randomNum = getRandomNum(0, (arr.length - 1));
    let randomCard = arr[randomNum].cardFace;
    if (!resultArr.includes(randomCard)) {
      resultArr.push(randomCard);
    }
  }
  return resultArr;
}


function getCurrCards() {
  const totalCards = getCardsAmount();
  const greenCardFaces = getCards(totalCards[0], greenCards);
  const yellowCardFaces = getCards(totalCards[1], brownCards);
  const blueCardFaces = getCards(totalCards[2], blueCards);
  const cards = {'greenCards': greenCardFaces, 'brownCards': yellowCardFaces, 'blueCards': blueCardFaces};
  return cards;
}


let deck;

function getDeck() {
  let cards = getCurrCards();
  let stages = [];

  function getCardsForStage(colorCards, index) {
    let cardsForStage = [];
    while (cardsForStage.length < stagesInfo[index][colorCards]) {
      let card = cards[colorCards].pop();
      cardsForStage.push(card);
    }
    return cardsForStage;
  }

  for (let i = 0; i < 3; i++) {
    stages.push({
      'greenCards': getCardsForStage('greenCards', i),
      'brownCards': getCardsForStage('brownCards', i),
      'blueCards': getCardsForStage('blueCards', i)
    });
  }
  deck = stages;
}


function createStateTrack() {
  const currentState = document.querySelector('.current-state');
  const stages = ['Этап I', 'Этап II', 'Этап III'];
  let stateContent = '';
  for (let i = 0; i < 3; i++) {
    stateContent += `
      <div class="stage">
        <div class="stage-heading-wrapper">
          <h4 class="stage-heading">${stages[i]}</h4>
        </div>
        <div class="deck-count">
          <div class="count green">${deck[i].greenCards.length}</div>
          <div class="count yellow">${deck[i].brownCards.length}</div>
          <div class="count blue">${deck[i].blueCards.length}</div>
        </div>
      </div>
    `
  }
  currentState.innerHTML = stateContent;
}


const shuffleBtn = document.querySelector('.shuffle-btn');
const lastCardOfDeck = document.querySelector('.deck');
const lastCard = document.querySelector('.last-card');

function openDeckSection() {
  lastCardOfDeck.classList.remove('invisible');
  lastCard.style.backgroundImage = '';
  hideShuffleSection();
  showDeckSection();
}

function showCard() {
  let colors = ['greenCards', 'brownCards', 'blueCards'];
  for (let i = 0; i < deck.length; i++) {
    let j = getRandomNum(0, 2);
    if (deck[i][colors[j]].length > 0 ) {
      lastCard.style.backgroundImage = `url('${deck[i][colors[j]].pop()}')`;
      createStateTrack();
      return;
    }
    for (let j = 0; j < 3; j++) {
      if (deck[i][colors[j]].length > 0 ) {
        lastCard.style.backgroundImage = `url('${deck[i][colors[j]].pop()}')`;
        createStateTrack();
        return;
      }
    } 
    if (i === 2) {
      lastCardOfDeck.classList.add('invisible');
    }
  }
}

shuffleBtn.addEventListener('click', openDeckSection);
shuffleBtn.addEventListener('click', getDeck);
shuffleBtn.addEventListener('click', createStateTrack);
shuffleBtn.addEventListener('click', getCurrCards);
lastCardOfDeck.addEventListener('click', showCard);