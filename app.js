const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startButton = document.getElementsByClassName('btn__reset'); 
const buttonSelected = document.getElementsByTagName('button');
const livesleft = document.querySelectorAll('li.tries img');
const overlay = document.querySelector('#overlay');
let missed = 0;
const phrases = [
'dark side of the moon',
'momentary lapse of reason',
'wish you were here',
'too easy',
'the endless river'
 ];

//listen for the start game button press

startButton[0].addEventListener('click', () => {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
});

//return a random phrase from an array

 const getRandomPhraseAsArray = (arr) => {
    let numberOfPhrases = phrases.length
    const randomNum = Math.floor(Math.random() * numberOfPhrases);
    phraseAsArray = arr[randomNum].split('');
    return phraseAsArray;
}

//adds the letter of a string to the display

const addPhraseToDisplay = (arr) => {
    let ul = document.querySelector('ul');
    for (let i = 0; i < arr.length; i++) {
        let li = document.createElement('li');
        li.textContent = arr[i];
        if (li.textContent === ' ') {
            li.className = 'space';
        } else {
            li.className = 'letter';
        }
        ul.appendChild(li);
    }
}  

const phraseData = addPhraseToDisplay(getRandomPhraseAsArray(phrases));

//check if a letter is in the phrase

const checkLetter = (btn) => {
    const letters = document.querySelectorAll('.letter');
    let match = null;
    for (let i = 0; i < letters.length; i++){
        if (letters[i].textContent == btn) {
            letters[i].className = 'show letter';
            match = letters[i].textContent  ;
        } 
    }
    if (match == null) {
        let missedAttempts = livesleft[missed];
        missedAttempts.src = 'images/lostHeart.png';
        missed++
    }
    checkWin();
    return match;
}

//check if the game is won or lost

const checkWin = () => {
    const liLetter = document.querySelectorAll('li.letter');
    const liShow = document.querySelectorAll('li.show');
    if (liLetter.length === liShow.length){
        overlay.className = 'win';
        overlay.style.display = 'flex';
        overlay.querySelector('.title').textContent = 'Congratulations! You rock!';
        reset();
    } else if (missed > 4) {
        overlay.className = 'lose';
        overlay.style.display = 'flex';
        overlay.querySelector('.title').textContent = 'You dont know enough Pink Floyd!';
        reset();
    }
    
}

//listen for the onscreen keyboard to be clicked

qwerty.addEventListener('click', (event) => {
    if (event.target.tagName !=='BUTTON' || event.target.className == 'chosen'){
        alert('Please click the onscreen keyboard or a key that has not been selected')
    }
    else if(event.target.tagName == 'BUTTON'){
        const keyPressed = event.target.textContent;
        event.target.className = 'chosen';
        checkLetter(keyPressed);
    }
   
});

//Reset function
const reset = () => {
    startButton[0].textContent = 'Play again';
    startButton[0].addEventListener('click', () => {
    document.location.reload();
    });
  }
  