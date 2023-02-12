/* All the javaScript for the game page*/
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

    /*Questons and answers*/

let questions = [{
    question: "Who shot J.R ?",   
    choice1: 'Kristen Stewart',
    choice2: 'Brad Pitt',
    choice3: 'Donald Trump',
    choice4: 'Will Smith',
    answer:  1,
   
    },
    
    {
    
    question: "What is 5 squared ?",
    choice1: '65',
    choice2: '34',
    choice3: '25',
    choice4: '76',
    answer:    3,
    },
    
    
    {
    
    question: "Whers is the north pole ?",
    choice1: 'The Pacific Ocdean',
    choice2: 'The Black Sea',
    choice3: 'The Red Sea',
    choice4: 'The Arctic Ocean',
    answer:   4,
    },
    
   
    {
   
    question: "What is a group of jellyfish called ?",
   
    choice1: 'A Herd',
    choice2: 'A Swarm',
    choice3: 'A Smack',
    choice4: 'A School',
    answer:   3,
    },
    
    {
    
    question: "How many presidents has there been in the U.S.A ?",

    choice1: '1',
    choice2: '45',
    choice3: '8',
    choice4: '22',
    answer:   2,
    },
    
    {
   
    question: "What is the internet commonally known as ?",

    choice1: 'Wibbly wobbly wonder',
    choice2: 'Web world wide',
    choice3: 'Wide web world',
    choice4: 'World web wide',
    answer:   4,
    },
    
    {
    
    question: "What is the largest planet in our solar system ?",
   
    choice1: 'Saturn',
    choice2: 'Mars',
    choice3: 'Jupiter',
    choice4: 'Earth',
    answer:   3,
    },
   
    {
    
    question: "Who makes the big mac ?",
    
    choice1: 'K.F.C',
    choice2: 'Burger King',
    choice3: '5 Guys',
    choice4: 'McDonalds',
    answer:  4,
    },
    
    {
   
    question: "Who is Robin Williams?",
   
    choice1: 'An actor',
    choice2: 'A singer',
    choice3: 'A race car driver',
    choice4: 'A fitness instructor',
    answer:  1,
    },
    
    {
    
    question: "What is the largest country in the world ?",
   
    choice1: 'Russia',
    choice2: 'Norway',
    choice3: 'America',
    choice4: 'Ireland',
    answer:   1,
    }
];

/*Scoring marks*/

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

 let startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    };

    questionCounter++
   
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset.number
        choice.innerText = currentQuestion['choice' + number]
    });

    availableQuestions.splice(questionsIndex, 1 );

    acceptingAnswers = true;
};

/*Answer choice for correct and incorrect*/

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return ;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset.number;

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        const correctAnswer = choices[currentQuestion.answer - 1];
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }   else if (classToApply === 'incorrect') {
            correctAnswer.parentElement.classList.add('correct');
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            correctAnswer.parentElement.classList.remove('correct');
            getNewQuestion();
        }, 1000);
    });
});

 let incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

/* Media query for tablet change */
function handleTabletChange(e) {
 
  if (e.matches) {
     console.log('Media Query Matched!')
  };
};

/* Start the game */
startGame();

// Audio settings
let music = "off";
const quizAudio = new Audio('assets/sounds/mixkit-tick-tock-clock-timer-1045.wav');


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


// Countdown timer
class Timer {
    constructor(root) {
      root.innerHTML = Timer.getHTML();
  
      this.el = {
        minutes: root.querySelector(".timer__part--minutes"),
        seconds: root.querySelector(".timer__part--seconds"),
        control: root.querySelector(".timer__btn--control"),
        reset: root.querySelector(".timer__btn--reset")
      };
  
      this.interval = null;
      this.remainingSeconds = 0;
  
      this.el.control.addEventListener("click", () => {
        if (this.interval === null) {
          this.start();
        } else {
          this.stop();
        }
      });
  
      this.el.reset.addEventListener("click", () => {
        const inputMinutes = prompt("Enter number of minutes:");
  
        if (inputMinutes < 60) {
          this.stop();
          this.remainingSeconds = inputMinutes * 60;
          this.updateInterfaceTime();
        }
      });
    }
  
    updateInterfaceTime() {
      const minutes = Math.floor(this.remainingSeconds / 60);
      const seconds = this.remainingSeconds % 60;
  
      this.el.minutes.textContent = minutes.toString().padStart(2, "0");
      this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }
  
    updateInterfaceControls() {
      if (this.interval === null) {
        this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
        this.el.control.classList.add("timer__btn--start");
        this.el.control.classList.remove("timer__btn--stop");
      } else {
        this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
        this.el.control.classList.add("timer__btn--stop");
        this.el.control.classList.remove("timer__btn--start");
      }
    }
  
    start() {
      if (this.remainingSeconds === 0) return;
  
      this.interval = setInterval(() => {
        this.remainingSeconds--;
        this.updateInterfaceTime();
  
        if (this.remainingSeconds === 0) {
          this.stop();
        }
      }, 1000);
  
      this.updateInterfaceControls();
    }
  
    stop() {
      clearInterval(this.interval);
  
      this.interval = null;
  
      this.updateInterfaceControls();
    }
  
    static getHTML() {
      return `
              <span class="timer__part timer__part--minutes">00</span>
              <span class="timer__part">:</span>
              <span class="timer__part timer__part--seconds">00</span>
              <button type="button" class="timer__btn timer__btn--control timer__btn--start">
                  <span class="material-icons">play_arrow</span>
              </button>
              <button type="button" class="timer__btn timer__btn--reset">
                  <span class="material-icons">timer</span>
              </button>
          `;
    }
  }
  
  new Timer(
      document.querySelector(".timer")
  );


