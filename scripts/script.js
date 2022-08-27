const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";

startGame(); 

function startGame(){
    initialLizeCards(game.createCardsFrontTechs());
}

function initialLizeCards(cards){
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = ' ';
    
    game.cards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);

    });
}

function createCardContent(card, cardElement){
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element){
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);

    if(face === FRONT){
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./imagens/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    }else{
        cardElementFace.innerHTML = "&lt/&gt";
    }
    element.appendChild(cardElementFace);
}



    let cont = 0;
    let contador = document.getElementById('accountant');
    contador.innerHTML = `<p>Jogadas: ${cont}<p/>`;
 

function flipCard(){
    if(game.setCard(this.id)){
        this.classList.add("flip");

        if(game.secondCard){
            contador.innerHTML = `<p>Jogadas: ${++cont}<p/>`;

            console.log('TESTE');

            if (game.checkMatch()){
                game.clearCards();
                if(game.checkGameOver()){
                    let gameOverLayer = document.getElementById("gameOver");
                    let textg = document.getElementById("textGameOver");
                    gameOverLayer.style.display ='flex';
                    textg.innerText = `Parabéns, você completou o jogo com ${cont} jogadas!`;
                };
            }else{
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);
                    
                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipCards();
                }, 1000);
            };
        }
    }

}



function restart(){
    // startGame();
    // let gameOverLayer = document.getElementById("gameOver");
    // gameOverLayer.style.display = 'none';

    location.reload();
}