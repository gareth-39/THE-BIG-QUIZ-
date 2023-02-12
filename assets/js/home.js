let music = "off";
const quizAudio = new Audio("assets/sounds/game-show.mp3.wav");


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


