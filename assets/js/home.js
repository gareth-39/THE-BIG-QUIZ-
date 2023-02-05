let play =document.getElementById("play");
function playMusic() {
    let audio = new Audio("assets/sounds/audio.mp3.wav");
    audio.play()
}
play.addEventListener("click", playMusic);
