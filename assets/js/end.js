/* Saving your username for ighscore list */
const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore =localStorage.getItem('mostRecentScore')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []
const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
    saveScoreBtn = username.value
})


/* Save button when finished quiz */
saveHighScore = e => {
    e.preventDefault()
        
    const score = {
            score: mostRecentScore,
            name: username.value
        };
        const errorE1 = document.getElementById("error");
        if(username.value.trim() == "" || username.value.length < 3){

            errorE1.innerText = "PLEASE ENTER MORE THAN 3 LETTERS";
        } else{
        errorE1.innerText = "";
        highScores.push(score);

        highScores.sort((a,b) => b.score - a.score);
        
        highScores.splice(5)
          
            localStorage.setItem ('highScores', JSON.stringify(highScores))
            window.location.assign('highscores.html')
        }
};

/* For audio on the end page */
let music = "off";
const quizAudio = new Audio("assets/sounds/end.mp3.wav");


quizAudio.loop = true;

// Play or pause audio to enhance experience on entering the quiz site
function whichMusic() {

    if (music === "on") {
        quizAudio.play();
    } else {
        (music = "off")
        quizAudio.pause();
    }
}

function checkAudioButtons() {
    if (music === "on") {
        document.getElementById("audio").innerHTML = `<i class="fas fa-volume-mute"></i><br>Audio off`; // Changes the text of the button once clicked
    } else {
        document.getElementById("audio").innerHTML = `<i class="fas fa-volume-up"></i><br>Audio on`; // Changes the text of the button once clicked
    }
}

// So that the user can toggle the music off or on
function toggleMusic() { 
    if (music === "off") {
        music = "on";
    } else {
        music = "off";
    }
    checkAudioButtons();
    whichMusic();
}