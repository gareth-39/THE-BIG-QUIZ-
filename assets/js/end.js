/* All the js for the end game page */

const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore =localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    e.preventDefault();

        const score = {
            score: mostRecentScore,
            name: username.value
        };
        const errorEl = document.getElementById("error");
        if(username.value.trim() == "" || username.value.length < 3){
          
             errorEl.innerText = "PLEASE ENTER MORE THAN 3 LETTERS";
        }else{
            errorEl.innerText = "";
            highScores.push(score);

            highScores.sort((a,b) =>  b.score - a.score);
                  
    
            highScores.splice(5);
    
            localStorage.setItem ('highScores', JSON.stringify(highScores));
            window.location.assign('/');
        }
    };
