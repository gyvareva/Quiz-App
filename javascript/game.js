const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch("data/questions.json")
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        console.log(loadedQuestions);
        questions = loadedQuestions;
        startGame();
    })
    .catch(err => {
        console.error(err);
    });


//CONSTANTS
const CORRECT_BONUS = 10; //if you get an answer correct, how much is it worth
const MAX_QUESTIONS = 3; //how many questions does an user get before the game ends

function validerReponse() {
    var stillOk = true;
    cleanValidationCSS();
    choices.forEach(choice => {
        var choiceCard = choice.parentElement;
        var isSelectedAnswer = choiceCard.classList.contains("selected-answer");
        var isCorrect = choiceCard.classList.contains("is-correct-answer");
        

        if ((isSelectedAnswer == true && isCorrect == false)
            || (isSelectedAnswer == false && isCorrect == true)) {
            stillOk = false;
        }

        /*
        if ((isSelectedAnswer  && !isCorrect )
        || (!isSelectedAnswer && isCorrect)) {
            stillOk = false;
        }*/
        /*
        if (isSelectedAnswer  !== isCorrect ) {
            stillOk = false;
        }
        */
       
       
       var classToApply;
       
       if (choiceCard.classList.contains("selected-answer") && choiceCard.classList.contains("is-correct-answer")) {
           classToApply = "correct";
           choiceCard.classList.remove("selected-answer");
           choiceCard.classList.add(classToApply);
        } else if(choiceCard.classList.contains("selected-answer") && !choiceCard.classList.contains("is-correct-answer")) {
            classToApply = "incorrect";
            choiceCard.classList.remove("selected-answer");
            choiceCard.classList.add(classToApply);
        } else if(!choiceCard.classList.contains("selected-answer") && choiceCard.classList.contains("is-correct-answer")) {
            classToApply = "missing-answer";
            choiceCard.classList.remove("selected-answer");
            choiceCard.classList.add(classToApply);
        }
        choice.parentElement.classList.remove("is-correct-answer");
    });
    
    if (stillOk) {
        incrementScore(CORRECT_BONUS);
     }

    console.log(stillOk? 'Bravo!':'Au moins 1 réponse est fausse...');

    document.getElementById("submit-button").disabled = true;
    document.getElementById("next-question-button").disabled = false;

    //document.getElementById("submit-button").style.visibility = "hidden";
    //document.getElementById("next-question-button").style.visibility = "visible";

}

function cleanChoicesCSS() {
    choices.forEach(choice => {
        choice.parentElement.classList.remove("selected-answer");
        choice.parentElement.classList.remove("correct");
        choice.parentElement.classList.remove("incorrect");
        choice.parentElement.classList.remove("missing-answer");
    });
};

function cleanValidationCSS() {
    choices.forEach(choice => {
        choice.parentElement.classList.remove("correct");
        choice.parentElement.classList.remove("incorrect");
        choice.parentElement.classList.remove("missing-answer");
    });
};


startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    cleanChoicesCSS();

    document.getElementById("submit-button").disabled = false;
    document.getElementById("next-question-button").disabled = true;


    if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        // Go to the end page if no more questions available or max number of questions reached
        return window.location.assign('./end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length); //sélectionne un index random pour la nouvelle question parmi toutes les questions restantes
    currentQuestion = availableQuestions[questionIndex]; //sélection de la nouvelle question
    question.innerText = currentQuestion.question; //affichage de la question sélectionnée

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
        const correctAnswers = currentQuestion.answer.split(",");
        if (correctAnswers.includes(number) == true) {
            choice.parentElement.classList.add("is-correct-answer");
        }
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};


choices.forEach(choice => {
    choice.addEventListener('click', e => {
        const selectedChoice = e.target;
        selectedChoice.parentElement.classList.toggle("selected-answer");

    });
});



incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

