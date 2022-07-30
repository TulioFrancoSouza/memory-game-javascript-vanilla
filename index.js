const FRONT = 'card_front';
const BACK = 'card_back';

let gameOverLayer = document.getElementById('gameOverScreen');

startGame();

function startGame(){
  initializeCards(game.createCardFromTechs());
  gameOverLayer.style.display = 'none';
}

function initializeCards(cards){
  let gameBoard = document.getElementById('gameBoard');
  
  game.cards.forEach(card=> {
    let cardElement = document.createElement('div');
    cardElement.id = card.id;
    cardElement.classList.add('card');
    cardElement.dataset.icon = card.icon;
    createCardContent(card, cardElement);
    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
  })
}

function createCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement)
  createCardFace(BACK, card, cardElement)
}

function createCardFace(face, card, element) {
  let cardElementFace = document.createElement('div');
  cardElementFace.classList.add(face)

  if(face === FRONT){
    let iconElement = document.createElement('img');
    iconElement.classList.add('icon');
    iconElement.src = './Images/' + card.icon + '.png';
    cardElementFace.appendChild(iconElement)
  }else{
    cardElementFace.innerHTML = '&lt/&gt';
  }
  element.appendChild(cardElementFace);
}

function flipCard(){
  if(game.setCard(this.id)){
    this.classList.add('flip')
      if(game.secondCard){
        if(game.checkMatch()){ 
          game.clearCards();
            if(game.checkGameOver){
              gameOverLayer.style.display = 'flex';
            };
        }else{ 
          setTimeout(function(){
            let firstCardView = document.getElementById(game.firstCard.id);
            let secondCardView = document.getElementById(game.secondCard.id);
            firstCardView.classList.remove('flip');
            secondCardView.classList.remove('flip');
            game.unflipeCard();
        }, 1000)
      }
    }  
  }
}

function restartGame(){
  startGame();
  gameOverLayer.display = 'none';
}