

document.querySelector('#hit').addEventListener('click', bjhit);
document.querySelector('#deal').addEventListener('click', deal);
document.querySelector('#stand').addEventListener('click', stand);
let scorecard = {
    'wins': 0,
    'losses': 0,
    'draws': 0
}
let bjgame = {
    'you': { 'scoretag': '#pscore', 'div': '#you', 'score': 0 },
    'dealer': { 'scoretag': '#bscore', 'div': '#dealer', 'score': 0 }
}

let cards = {
    0: '1.png',
    1: '2.png',
    2: '3.png',
    3: '4.png',
    4: '5.png',
    5: '6.png',
    6: '7.png',
    7: '8.png',
    8: '9.png',
    9: '10.png',
    10: '101.png',
    11: '102.png',
    12: '103.png'
}

const hitsound = new Audio("sounds/swish.m4a");
const awwsound = new Audio("sounds/aww.mp3");
const cashsound = new Audio("sounds/cash.mp3");

function randCard() {
    let r = Math.floor(Math.random() * 12);
    return r;
}

function showCard(num, player) {
    if (bjgame[player]['score'] <= 21) {
        let cardimg = document.createElement('img');
        cardimg.src = "images/" + cards[num];
        document.querySelector(bjgame[player]['div']).appendChild(cardimg);
        hitsound.play();
    }
}

function showScore(player) {
    if (bjgame[player]['score'] > 21) {
        document.querySelector(bjgame[player]['scoretag']).textContent = "BUST!";
        if (player === 'dealer') {
            scorecard['wins'] += 1;
            document.querySelector('#wins').textContent = scorecard['wins'];
            cashsound.play();
        }
        else {
            scorecard['losses'] += 1;
            document.querySelector('#losses').textContent = scorecard['losses'];
            awwsound.play();

        }

    }
    else if (bjgame[player]['score'] === 21) {
        document.querySelector(bjgame[player]['scoretag']).textContent = "BLACKJACK!";
        if (player === 'you') {
            scorecard['wins'] += 1;
            document.querySelector('#wins').textContent = scorecard['wins'];
            cashsound.play();
        }
        else {
            scorecard['losses'] += 1;
            document.querySelector('#losses').textContent = scorecard['losses'];
            awwsound.play();
        }

    }
    else {
        document.querySelector(bjgame[player]['scoretag']).textContent = bjgame[player]['score'];
    }
}

function addscore(num, player) {
    if (bjgame[player]['score'] <= 21) {
        if (num === 0) {
            if ((bjgame[player]['score'] + 11) <= 21) {
                bjgame[player]['score'] += 11;
                showScore(player);
            }
            else {
                bjgame[player]['score'] += 1;
                showScore(player);
            }
        }
        else if (num <= 9) {
            bjgame[player]['score'] += (num + 1);
            showScore(player);
        }

        else {
            bjgame[player]['score'] += 10;
            showScore(player);
        }
    }
}

function bjhit() {
    let rand = randCard();
    let currentcount = document.querySelector('#you').querySelectorAll('img');
    if (currentcount.length === 0) {
        bothit();
        let rand = randCard();
        showCard(rand, 'you');
        addscore(rand, 'you');
    }
    showCard(rand, 'you');
    addscore(rand, 'you');

}

function bothit() {
    let rand = randCard();
    showCard(rand, 'dealer');
    addscore(rand, 'dealer');
}

function deal() {
    let imgs = document.querySelectorAll('img');
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].remove();
    }
    document.querySelector('#pscore').textContent = 0;
    document.querySelector('#bscore').textContent = 0;
    bjgame['you']['score'] = 0;
    bjgame['dealer']['score'] = 0;
}

function stand() {
    while (bjgame['dealer']['score'] <= 17) {
        bothit();
    }

    if (bjgame['dealer']['score'] > 21) {
        document.querySelector(bjgame['dealer']['scoretag']).textContent = "BUST!";
        scorecard['wins'] += 1;
        document.querySelector('#wins').textContent = scorecard['wins'];
        cashsound.play();
    }

    else if (bjgame['you']['score'] === bjgame['dealer']['score']) {
        scorecard['draws'] += 1;
        document.querySelector('#draws').textContent = scorecard['draws'];
        document.querySelector('#pscore').textContent = "DRAW!";
        document.querySelector('#bscore').textContent = "DRAW!";
    }
    else if (bjgame['you']['score'] < bjgame['dealer']['score']) {
        scorecard['losses'] += 1;
        awwsound.play();
        document.querySelector('#losses').textContent = scorecard['losses'];
        document.querySelector('#pscore').textContent = "LOSS";
        document.querySelector('#bscore').textContent = "WIN";
    }
    else {
        cashsound.play();
        scorecard['wins'] += 1;
        document.querySelector('#wins').textContent = scorecard['wins'];
        document.querySelector('#pscore').textContent = "WIN";
        document.querySelector('#bscore').textContent = "LOSS";
    }
}